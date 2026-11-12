import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = getDatabase();
    const rows = db.prepare("SELECT * FROM syllabus ORDER BY id ASC").all();
    return NextResponse.json({ syllabus: rows });
  } catch (error) {
    console.error("Syllabus GET error:", error);
    return NextResponse.json({ error: "Failed to fetch syllabus" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const code = String(body.code || "");
    const mastery = Math.max(0, Math.min(100, Number(body.mastery_pct ?? 0)));
    const completedMcqs = body.completed_mcqs !== undefined ? Number(body.completed_mcqs) : undefined;
    const now = new Date().toISOString();

    if (!code) {
      return NextResponse.json({ error: "Syllabus code required" }, { status: 400 });
    }

    if (completedMcqs !== undefined) {
      db.prepare(`
        UPDATE syllabus SET mastery_pct = ?, completed_mcqs = ?, last_studied_at = ? WHERE code = ?
      `).run(mastery, completedMcqs, now, code);
    } else {
      db.prepare(`
        UPDATE syllabus SET mastery_pct = ?, last_studied_at = ? WHERE code = ?
      `).run(mastery, now, code);
    }

    const updated = db.prepare("SELECT * FROM syllabus WHERE code = ?").get(code);
    return NextResponse.json({ syllabusNode: updated });
  } catch (error) {
    console.error("Syllabus PATCH error:", error);
    return NextResponse.json({ error: "Failed to update syllabus" }, { status: 500 });
  }
}
