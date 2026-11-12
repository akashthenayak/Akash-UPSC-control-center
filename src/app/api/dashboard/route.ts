import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { buildDailySuggestion, EXAM_MILESTONES, SCORECARD_BENCHMARK, STUDY_PHASES } from "@/lib/study-plan";

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    const dateParam = req.nextUrl.searchParams.get("date");
    const today = dateParam || new Date().toISOString().slice(0, 10);

    const suggestion = buildDailySuggestion(today);

    // Fetch or create today's daily log
    let logRow = db.prepare("SELECT * FROM daily_logs WHERE log_date = ?").get(today) as
      | Record<string, unknown>
      | undefined;

    if (!logRow) {
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO daily_logs (log_date, day_type, completed_slots_json, mcqs_solved, mcqs_correct, pyqs_dissected, errors_reviewed, focused_syllabus_code, office_spillover_note, updated_at)
        VALUES (?, ?, '[]', 0, 0, 0, 0, ?, '', ?)
      `).run(today, suggestion.day_type, suggestion.suggested_syllabus_codes[0] || null, now);

      logRow = db.prepare("SELECT * FROM daily_logs WHERE log_date = ?").get(today) as Record<string, unknown>;
    }

    const dailyLog = {
      id: Number(logRow.id),
      log_date: String(logRow.log_date),
      day_type: String(logRow.day_type),
      completed_slots: JSON.parse(String(logRow.completed_slots_json || "[]")),
      mcqs_solved: Number(logRow.mcqs_solved || 0),
      mcqs_correct: Number(logRow.mcqs_correct || 0),
      pyqs_dissected: Number(logRow.pyqs_dissected || 0),
      errors_reviewed: Number(logRow.errors_reviewed || 0),
      focused_syllabus_code: logRow.focused_syllabus_code ? String(logRow.focused_syllabus_code) : null,
      office_spillover_note: String(logRow.office_spillover_note || ""),
      updated_at: String(logRow.updated_at),
    };

    // 14-day rolling logs
    const rollingLogsRaw = db
      .prepare("SELECT * FROM daily_logs ORDER BY log_date DESC LIMIT 14")
      .all() as Record<string, unknown>[];

    const rollingLogs = rollingLogsRaw.map((r) => ({
      id: Number(r.id),
      log_date: String(r.log_date),
      day_type: String(r.day_type),
      completed_slots: JSON.parse(String(r.completed_slots_json || "[]")),
      mcqs_solved: Number(r.mcqs_solved || 0),
      mcqs_correct: Number(r.mcqs_correct || 0),
      pyqs_dissected: Number(r.pyqs_dissected || 0),
      errors_reviewed: Number(r.errors_reviewed || 0),
      focused_syllabus_code: r.focused_syllabus_code ? String(r.focused_syllabus_code) : null,
      office_spillover_note: String(r.office_spillover_note || ""),
      updated_at: String(r.updated_at),
    }));

    const syllabus = db.prepare("SELECT * FROM syllabus ORDER BY id ASC").all();

    const dueErrorsRow = db
      .prepare("SELECT COUNT(*) as count FROM error_registry WHERE mastered = 0 AND next_review_date <= ?")
      .get(today) as { count: number };

    const totalErrorsRow = db
      .prepare("SELECT COUNT(*) as count FROM error_registry")
      .get() as { count: number };

    const attemptsSummary = db
      .prepare("SELECT COUNT(*) as total, SUM(is_correct) as correct FROM pyq_attempts")
      .get() as { total: number; correct: number | null };

    const pyqCountRow = db.prepare("SELECT COUNT(*) as count FROM pyq_questions").get() as { count: number };

    const subjectAccuracy = db
      .prepare(`
        SELECT q.subject, COUNT(a.id) as attempts, SUM(a.is_correct) as correct
        FROM pyq_attempts a
        JOIN pyq_questions q ON q.id = a.pyq_id
        GROUP BY q.subject
      `)
      .all();

    const errorTaxonomyStats = db
      .prepare(`
        SELECT error_type, COUNT(*) as count
        FROM error_registry
        GROUP BY error_type
        ORDER BY count DESC
      `)
      .all();

    return NextResponse.json({
      today,
      suggestion,
      dailyLog,
      rollingLogs,
      syllabus,
      phases: STUDY_PHASES,
      milestones: EXAM_MILESTONES,
      scorecard: SCORECARD_BENCHMARK,
      stats: {
        dueErrors: dueErrorsRow.count,
        totalErrors: totalErrorsRow.count,
        totalPyqs: pyqCountRow.count,
        pyqAttempts: attemptsSummary.total || 0,
        pyqCorrect: attemptsSummary.correct || 0,
        subjectAccuracy,
        errorTaxonomyStats,
      },
    });
  } catch (error) {
    console.error("Dashboard GET error:", error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
