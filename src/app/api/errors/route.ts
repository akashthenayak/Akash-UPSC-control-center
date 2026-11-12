import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

const NEXT_STAGE: Record<number, { stage: number; days: number; mastered: boolean }> = {
  1: { stage: 3, days: 3, mastered: false },
  3: { stage: 7, days: 7, mastered: false },
  7: { stage: 21, days: 21, mastered: false },
  21: { stage: 99, days: 0, mastered: true },
};

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    const dueOnly = req.nextUrl.searchParams.get("due") === "1";
    const today = new Date().toISOString().slice(0, 10);

    const rows = dueOnly
      ? db
          .prepare(
            "SELECT * FROM error_registry WHERE mastered = 0 AND next_review_date <= ? ORDER BY next_review_date ASC, id DESC"
          )
          .all(today)
      : db.prepare("SELECT * FROM error_registry ORDER BY mastered ASC, next_review_date ASC, id DESC").all();

    const formatted = rows.map((r) => ({
      ...r,
      mastered: Number(r.mastered) === 1,
    }));

    return NextResponse.json({ errors: formatted, today });
  } catch (error) {
    console.error("Errors GET error:", error);
    return NextResponse.json({ error: "Failed to fetch Error Registry" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const today = new Date().toISOString().slice(0, 10);

    const pyqId = body.pyq_id ? Number(body.pyq_id) : null;
    const syllabusCode = String(body.syllabus_code || "PRE-GS1-POL-CON");
    const subject = String(body.subject || "Polity & Governance");
    const triggerCue = String(body.trigger_cue || "").trim();
    const exactFact = String(body.exact_fact || "").trim();
    const personalTrapNote = String(body.personal_trap_note || "").trim();
    const errorType = String(body.error_type || "Factual Blindspot");
    const sourceCitation = String(body.source_citation || "").trim();

    if (!triggerCue || !exactFact) {
      return NextResponse.json({ error: "Trigger cue and exact fact are required" }, { status: 400 });
    }

    // Day 1 review is scheduled for today (same night Block 4 review)
    const nextReviewDate = body.next_review_date ? String(body.next_review_date) : today;

    const res = db
      .prepare(`
        INSERT INTO error_registry (
          pyq_id, syllabus_code, subject, trigger_cue, exact_fact,
          personal_trap_note, error_type, source_citation, sr_stage,
          next_review_date, review_count, mastered, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 0, 0, ?)
      `)
      .run(
        pyqId,
        syllabusCode,
        subject,
        triggerCue,
        exactFact,
        personalTrapNote,
        errorType,
        sourceCitation,
        nextReviewDate,
        today
      );

    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) });
  } catch (error) {
    console.error("Errors POST error:", error);
    return NextResponse.json({ error: "Failed to add Error Registry card" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const id = Number(body.id);
    const outcome = String(body.outcome || "recalled"); // "recalled" | "forgot"
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toISOString();

    const row = db.prepare("SELECT * FROM error_registry WHERE id = ?").get(id) as
      | Record<string, unknown>
      | undefined;

    if (!row) {
      return NextResponse.json({ error: "Error entry not found" }, { status: 404 });
    }

    const currentStage = Number(row.sr_stage || 1);
    let nextStage = 1;
    let nextReviewDate = addDays(today, 1);
    let mastered = 0;

    if (outcome === "recalled") {
      const transition = NEXT_STAGE[currentStage] || { stage: 99, days: 0, mastered: true };
      nextStage = transition.stage;
      mastered = transition.mastered ? 1 : 0;
      nextReviewDate = transition.mastered ? today : addDays(today, transition.days);
    }

    db.prepare(`
      UPDATE error_registry
      SET sr_stage = ?, next_review_date = ?, review_count = review_count + 1, mastered = ?, last_reviewed_at = ?
      WHERE id = ?
    `).run(nextStage, nextReviewDate, mastered, now, id);

    // Increment today's daily log errors_reviewed
    db.prepare(`
      UPDATE daily_logs SET errors_reviewed = errors_reviewed + 1, updated_at = ? WHERE log_date = ?
    `).run(now, today);

    return NextResponse.json({ ok: true, sr_stage: nextStage, next_review_date: nextReviewDate, mastered: mastered === 1 });
  } catch (error) {
    console.error("Errors PATCH error:", error);
    return NextResponse.json({ error: "Failed to update spaced repetition card" }, { status: 500 });
  }
}
