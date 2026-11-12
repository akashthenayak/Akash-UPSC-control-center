import { NextRequest, NextResponse } from "next/server";
import { OFFICIAL_UPSC_SYLLABUS } from "@/data/syllabus";

export async function GET() {
  const rows = OFFICIAL_UPSC_SYLLABUS.map((node, index) => ({
    id: index + 1,
    ...node,
    mastery_pct: 0,
    completed_mcqs: 0,
    last_studied_at: null,
  }));
  return NextResponse.json({ syllabus: rows });
}

export async function PATCH(req: NextRequest) {
  try {
    await req.json();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
