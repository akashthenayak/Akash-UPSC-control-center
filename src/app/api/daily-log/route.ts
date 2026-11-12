import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { buildDailySuggestion } from "@/lib/study-plan";

export async function POST(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const logDate = String(body.log_date || new Date().toISOString().slice(0, 10));
    const suggestion = buildDailySuggestion(logDate);
    const now = new Date().toISOString();

    const existing = db.prepare("SELECT * FROM daily_logs WHERE log_date = ?").get(logDate) as
      | Record<string, unknown>
      | undefined;

    const completedSlots = Array.isArray(body.completed_slots)
      ? body.completed_slots
      : existing
      ? JSON.parse(String(existing.completed_slots_json || "[]"))
      : [];

    const mcqsSolved =
      typeof body.mcqs_solved === "number" ? body.mcqs_solved : Number(existing?.mcqs_solved || 0);
    const mcqsCorrect =
      typeof body.mcqs_correct === "number" ? body.mcqs_correct : Number(existing?.mcqs_correct || 0);
    const pyqsDissected =
      typeof body.pyqs_dissected === "number" ? body.pyqs_dissected : Number(existing?.pyqs_dissected || 0);
    const errorsReviewed =
      typeof body.errors_reviewed === "number" ? body.errors_reviewed : Number(existing?.errors_reviewed || 0);
    const focusedCode =
      body.focused_syllabus_code !== undefined
        ? body.focused_syllabus_code
        : existing?.focused_syllabus_code ?? suggestion.suggested_syllabus_codes[0];
    const spilloverNote =
      typeof body.office_spillover_note === "string"
        ? body.office_spillover_note
        : String(existing?.office_spillover_note || "");

    if (existing) {
      db.prepare(`
        UPDATE daily_logs
        SET completed_slots_json = ?, mcqs_solved = ?, mcqs_correct = ?, pyqs_dissected = ?, errors_reviewed = ?,
            focused_syllabus_code = ?, office_spillover_note = ?, updated_at = ?
        WHERE log_date = ?
      `).run(
        JSON.stringify(completedSlots),
        mcqsSolved,
        mcqsCorrect,
        pyqsDissected,
        errorsReviewed,
        focusedCode,
        spilloverNote,
        now,
        logDate
      );
    } else {
      db.prepare(`
        INSERT INTO daily_logs (log_date, day_type, completed_slots_json, mcqs_solved, mcqs_correct, pyqs_dissected, errors_reviewed, focused_syllabus_code, office_spillover_note, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        logDate,
        suggestion.day_type,
        JSON.stringify(completedSlots),
        mcqsSolved,
        mcqsCorrect,
        pyqsDissected,
        errorsReviewed,
        focusedCode,
        spilloverNote,
        now
      );
    }

    return NextResponse.json({ ok: true, log_date: logDate, completed_slots: completedSlots });
  } catch (error) {
    console.error("DailyLog POST error:", error);
    return NextResponse.json({ error: "Failed to save daily log" }, { status: 500 });
  }
}
