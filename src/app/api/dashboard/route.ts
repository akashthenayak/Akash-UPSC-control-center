import { NextRequest, NextResponse } from "next/server";
import {
  buildDailySuggestion,
  EXAM_MILESTONES,
  SCORECARD_BENCHMARK,
  STUDY_PHASES,
} from "@/lib/study-plan";
import { OFFICIAL_UPSC_SYLLABUS } from "@/data/syllabus";
import { VERIFIED_STARTER_PYQS } from "@/data/pyqs";

export async function GET(req: NextRequest) {
  try {
    const dateParam = req.nextUrl.searchParams.get("date");
    const today = dateParam || new Date().toISOString().slice(0, 10);
    const suggestion = buildDailySuggestion(today);

    const dailyLog = {
      id: 1,
      log_date: today,
      day_type: suggestion.day_type,
      completed_slots: [],
      mcqs_solved: 0,
      mcqs_correct: 0,
      pyqs_dissected: 0,
      errors_reviewed: 0,
      focused_syllabus_code: suggestion.suggested_syllabus_codes[0] || "PRE-GS1-POL-CON",
      office_spillover_note: "",
      updated_at: new Date().toISOString(),
    };

    const syllabus = OFFICIAL_UPSC_SYLLABUS.map((node, index) => ({
      id: index + 1,
      ...node,
      mastery_pct: 0,
      completed_mcqs: 0,
      last_studied_at: null,
    }));

    return NextResponse.json({
      today,
      suggestion,
      dailyLog,
      rollingLogs: [dailyLog],
      syllabus,
      phases: STUDY_PHASES,
      milestones: EXAM_MILESTONES,
      scorecard: SCORECARD_BENCHMARK,
      stats: {
        dueErrors: 2,
        totalErrors: 2,
        totalPyqs: VERIFIED_STARTER_PYQS.length,
        pyqAttempts: 0,
        pyqCorrect: 0,
        subjectAccuracy: [],
        errorTaxonomyStats: [],
      },
    });
  } catch (error) {
    console.error("Dashboard GET error:", error);
    return NextResponse.json({ error: "Failed to generate dashboard" }, { status: 500 });
  }
}
