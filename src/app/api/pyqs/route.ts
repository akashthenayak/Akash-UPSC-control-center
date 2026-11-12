import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

function mapRowToPyq(row: Record<string, unknown>) {
  return {
    id: Number(row.id),
    year: Number(row.year),
    paper: String(row.paper),
    question_number: row.question_number !== null ? Number(row.question_number) : null,
    subject: String(row.syllabus_subject || row.subject),
    syllabus_code: String(row.syllabus_code),
    syllabus_topic: row.syllabus_topic ? String(row.syllabus_topic) : null,
    syllabus_priority_tag: row.syllabus_priority_tag ? String(row.syllabus_priority_tag) : null,
    question_style: String(row.question_style),
    stem: String(row.stem),
    options: {
      A: String(row.option_a),
      B: String(row.option_b),
      C: String(row.option_c),
      D: String(row.option_d),
    },
    official_answer: String(row.official_answer) as "A" | "B" | "C" | "D",
    key_status: String(row.key_status),
    explanation: String(row.explanation),
    fact_breakdown: JSON.parse(String(row.fact_breakdown_json || "[]")),
    trap_type: String(row.trap_type),
    trap_analysis: String(row.trap_analysis),
    citations: JSON.parse(String(row.citations_json || "[]")),
    user_trick_note: String(row.user_trick_note || ""),
    is_verified: Number(row.is_verified) === 1,
  };
}

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    const subject = req.nextUrl.searchParams.get("subject");
    const year = req.nextUrl.searchParams.get("year");
    const syllabusCode = req.nextUrl.searchParams.get("syllabus_code");

    const clauses: string[] = [];
    const params: unknown[] = [];

    // Prioritize syllabus_code if specified and not ALL, ensuring all matching questions are queried
    if (syllabusCode && syllabusCode !== "ALL") {
      clauses.push("q.syllabus_code = ?");
      params.push(syllabusCode);
    } else if (subject && subject !== "ALL") {
      clauses.push("(q.subject = ? OR s.subject = ?)");
      params.push(subject, subject);
    }

    if (year && year !== "ALL") {
      clauses.push("q.year = ?");
      params.push(Number(year));
    }

    const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
    const rows = db
      .prepare(`
        SELECT q.*, s.topic as syllabus_topic, s.priority_tag as syllabus_priority_tag, s.subject as syllabus_subject
        FROM pyq_questions q
        LEFT JOIN syllabus s ON q.syllabus_code = s.code
        ${whereSql}
        ORDER BY q.year DESC, q.id ASC
      `)
      .all(...params) as Record<string, unknown>[];

    const attempts = db
      .prepare(`
        SELECT a.* FROM pyq_attempts a
        INNER JOIN (
          SELECT pyq_id, MAX(id) as max_id FROM pyq_attempts GROUP BY pyq_id
        ) latest ON latest.max_id = a.id
      `)
      .all() as Record<string, unknown>[];

    const attemptMap: Record<number, Record<string, unknown>> = {};
    for (const a of attempts) {
      attemptMap[Number(a.pyq_id)] = {
        ...a,
        is_correct: Number(a.is_correct) === 1,
      };
    }

    const questions = rows.map((row) => ({
      ...mapRowToPyq(row),
      last_attempt: attemptMap[Number(row.id)] || null,
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("PYQs GET error:", error);
    return NextResponse.json({ error: "Failed to fetch PYQs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const items = Array.isArray(body) ? body : [body];

    const insertStmt = db.prepare(`
      INSERT INTO pyq_questions (
        year, paper, question_number, subject, syllabus_code, question_style,
        stem, option_a, option_b, option_c, option_d, official_answer,
        key_status, explanation, fact_breakdown_json, trap_type, trap_analysis,
        citations_json, user_trick_note, is_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let inserted = 0;
    for (const q of items) {
      if (!q.stem || !q.options?.A || !q.options?.B || !q.options?.C || !q.options?.D || !q.official_answer) {
        continue;
      }
      insertStmt.run(
        Number(q.year || 2024),
        String(q.paper || "GS Paper I"),
        q.question_number ? Number(q.question_number) : null,
        String(q.subject || "Polity & Governance"),
        String(q.syllabus_code || "PRE-GS1-POL-CON"),
        String(q.question_style || "standard"),
        String(q.stem),
        String(q.options.A),
        String(q.options.B),
        String(q.options.C),
        String(q.options.D),
        String(q.official_answer).toUpperCase(),
        String(q.key_status || "Official UPSC Answer Key"),
        String(q.explanation || ""),
        JSON.stringify(Array.isArray(q.fact_breakdown) ? q.fact_breakdown : []),
        String(q.trap_type || "User Imported"),
        String(q.trap_analysis || ""),
        JSON.stringify(Array.isArray(q.citations) ? q.citations : []),
        String(q.user_trick_note || ""),
        q.is_verified === false ? 0 : 1
      );
      inserted += 1;
    }

    return NextResponse.json({ ok: true, inserted });
  } catch (error) {
    console.error("PYQs POST error:", error);
    return NextResponse.json({ error: "Failed to import PYQs" }, { status: 500 });
  }
}
