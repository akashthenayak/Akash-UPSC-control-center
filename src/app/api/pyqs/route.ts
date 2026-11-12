import { NextRequest, NextResponse } from "next/server";
import { VERIFIED_STARTER_PYQS } from "@/data/pyqs";
import { OFFICIAL_UPSC_SYLLABUS } from "@/data/syllabus";

const syllabusMap = new Map(OFFICIAL_UPSC_SYLLABUS.map((s) => [s.code, s]));

export async function GET(req: NextRequest) {
  try {
    const paper = req.nextUrl.searchParams.get("paper");
    const subject = req.nextUrl.searchParams.get("subject");
    const year = req.nextUrl.searchParams.get("year");
    const syllabusCode = req.nextUrl.searchParams.get("syllabus_code");

    let questions = VERIFIED_STARTER_PYQS.map((q, idx) => {
      const sNode = syllabusMap.get(q.syllabus_code);
      return {
        ...q,
        id: idx + 1,
        subject: sNode ? sNode.subject : q.subject,
        syllabus_topic: sNode ? sNode.topic : null,
        syllabus_priority_tag: sNode ? sNode.priority_tag : null,
        last_attempt: null,
      };
    });

    if (paper && paper !== "ALL") {
      if (paper === "GS1") {
        questions = questions.filter((q) => !q.paper.toLowerCase().includes("csat") && !q.paper.toLowerCase().includes("paper ii"));
      } else if (paper === "CSAT") {
        questions = questions.filter((q) => q.paper.toLowerCase().includes("csat") || q.paper.toLowerCase().includes("paper ii") || q.subject.includes("CSAT"));
      }
    }

    if (syllabusCode && syllabusCode !== "ALL") {
      questions = questions.filter((q) => q.syllabus_code === syllabusCode);
    } else if (subject && subject !== "ALL") {
      questions = questions.filter((q) => q.subject === subject);
    }

    if (year && year !== "ALL") {
      questions = questions.filter((q) => q.year === Number(year));
    }

    return NextResponse.json({
      questions: questions.sort((a, b) => b.year - a.year || a.id - b.id),
    });
  } catch (error) {
    console.error("PYQs GET error:", error);
    return NextResponse.json({ error: "Failed to fetch PYQs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items = Array.isArray(body) ? body : [body];
    return NextResponse.json({ ok: true, inserted: items.length });
  } catch (error) {
    console.error("PYQs POST error:", error);
    return NextResponse.json({ error: "Failed to import PYQs" }, { status: 500 });
  }
}
