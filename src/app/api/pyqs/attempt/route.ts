import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const pyqId = Number(body.pyq_id);
    const selectedOption = String(body.selected_option || "").toUpperCase();
    const confidence = String(body.confidence || "sure_shot");
    const personalNote = typeof body.personal_note === "string" ? body.personal_note : "";

    const question = db.prepare("SELECT * FROM pyq_questions WHERE id = ?").get(pyqId) as
      | Record<string, unknown>
      | undefined;

    if (!question) {
      return NextResponse.json({ error: "PYQ not found" }, { status: 404 });
    }

    const isCorrect = selectedOption === String(question.official_answer);
    const now = new Date().toISOString();
    const today = now.slice(0, 10);

    db.prepare(`
      INSERT INTO pyq_attempts (pyq_id, selected_option, confidence, is_correct, personal_note, attempted_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(pyqId, selectedOption, confidence, isCorrect ? 1 : 0, personalNote, now);

    if (personalNote.trim()) {
      db.prepare("UPDATE pyq_questions SET user_trick_note = ? WHERE id = ?").run(personalNote.trim(), pyqId);
    }

    // Increment syllabus completed_mcqs
    db.prepare(`
      UPDATE syllabus
      SET completed_mcqs = completed_mcqs + 1, last_studied_at = ?
      WHERE code = ?
    `).run(now, String(question.syllabus_code));

    // Update today's daily log counters
    const existingLog = db.prepare("SELECT * FROM daily_logs WHERE log_date = ?").get(today) as
      | Record<string, unknown>
      | undefined;

    if (existingLog) {
      db.prepare(`
        UPDATE daily_logs
        SET mcqs_solved = mcqs_solved + 1,
            mcqs_correct = mcqs_correct + ?,
            pyqs_dissected = pyqs_dissected + 1,
            updated_at = ?
        WHERE log_date = ?
      `).run(isCorrect ? 1 : 0, now, today);
    }

    return NextResponse.json({
      ok: true,
      is_correct: isCorrect,
      official_answer: String(question.official_answer),
    });
  } catch (error) {
    console.error("PYQ attempt POST error:", error);
    return NextResponse.json({ error: "Failed to record PYQ attempt" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const pyqId = Number(body.pyq_id);
    const userTrickNote = String(body.user_trick_note ?? "");

    db.prepare("UPDATE pyq_questions SET user_trick_note = ? WHERE id = ?").run(userTrickNote, pyqId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PYQ note PATCH error:", error);
    return NextResponse.json({ error: "Failed to save personal trick note" }, { status: 500 });
  }
}
