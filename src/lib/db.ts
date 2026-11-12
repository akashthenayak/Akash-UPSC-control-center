import path from "node:path";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { OFFICIAL_UPSC_SYLLABUS } from "@/data/syllabus";
import { VERIFIED_STARTER_PYQS } from "@/data/pyqs";

let dbInstance: DatabaseSync | null = null;

function getDbPath(): string {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "upsc_prep.sqlite");
}

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dbPath = getDbPath();
  const db = new DatabaseSync(dbPath);

  // Initialize PRAGMAs
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS syllabus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      paper TEXT NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT NOT NULL,
      subtopics TEXT NOT NULL,
      stage TEXT NOT NULL,
      priority_tag TEXT NOT NULL,
      recommended_source TEXT NOT NULL,
      mastery_pct REAL DEFAULT 0,
      target_mcqs INTEGER DEFAULT 200,
      completed_mcqs INTEGER DEFAULT 0,
      last_studied_at TEXT
    );

    CREATE TABLE IF NOT EXISTS pyq_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      paper TEXT NOT NULL,
      question_number INTEGER,
      subject TEXT NOT NULL,
      syllabus_code TEXT NOT NULL,
      question_style TEXT NOT NULL,
      stem TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      official_answer TEXT NOT NULL,
      key_status TEXT NOT NULL,
      explanation TEXT NOT NULL,
      fact_breakdown_json TEXT NOT NULL,
      trap_type TEXT NOT NULL,
      trap_analysis TEXT NOT NULL,
      citations_json TEXT NOT NULL,
      user_trick_note TEXT DEFAULT '',
      is_verified INTEGER DEFAULT 1,
      FOREIGN KEY(syllabus_code) REFERENCES syllabus(code)
    );

    CREATE TABLE IF NOT EXISTS pyq_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pyq_id INTEGER NOT NULL,
      selected_option TEXT NOT NULL,
      confidence TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      personal_note TEXT DEFAULT '',
      attempted_at TEXT NOT NULL,
      FOREIGN KEY(pyq_id) REFERENCES pyq_questions(id)
    );

    CREATE TABLE IF NOT EXISTS error_registry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pyq_id INTEGER,
      syllabus_code TEXT NOT NULL,
      subject TEXT NOT NULL,
      trigger_cue TEXT NOT NULL,
      exact_fact TEXT NOT NULL,
      personal_trap_note TEXT NOT NULL,
      error_type TEXT NOT NULL,
      source_citation TEXT NOT NULL,
      sr_stage INTEGER DEFAULT 1,
      next_review_date TEXT NOT NULL,
      review_count INTEGER DEFAULT 0,
      mastered INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      last_reviewed_at TEXT,
      FOREIGN KEY(pyq_id) REFERENCES pyq_questions(id),
      FOREIGN KEY(syllabus_code) REFERENCES syllabus(code)
    );

    CREATE TABLE IF NOT EXISTS daily_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      log_date TEXT UNIQUE NOT NULL,
      day_type TEXT NOT NULL,
      completed_slots_json TEXT NOT NULL,
      mcqs_solved INTEGER DEFAULT 0,
      mcqs_correct INTEGER DEFAULT 0,
      pyqs_dissected INTEGER DEFAULT 0,
      errors_reviewed INTEGER DEFAULT 0,
      focused_syllabus_code TEXT,
      office_spillover_note TEXT DEFAULT '',
      updated_at TEXT NOT NULL
    );
  `);

  // Seed syllabus if empty
  const countRow = db.prepare("SELECT COUNT(*) as count FROM syllabus").get() as { count: number };
  if (countRow.count === 0) {
    const insertSyllabus = db.prepare(`
      INSERT INTO syllabus (code, paper, subject, topic, subtopics, stage, priority_tag, recommended_source, target_mcqs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const node of OFFICIAL_UPSC_SYLLABUS) {
      insertSyllabus.run(
        node.code,
        node.paper,
        node.subject,
        node.topic,
        node.subtopics,
        node.stage,
        node.priority_tag,
        node.recommended_source,
        node.target_mcqs
      );
    }
  }

  // Seed or synchronize starter PYQs (2013-2026)
  const existingStems = new Set(
    (db.prepare("SELECT stem FROM pyq_questions").all() as { stem: string }[]).map((r) => r.stem)
  );

  const insertPyq = db.prepare(`
    INSERT INTO pyq_questions (
      year, paper, question_number, subject, syllabus_code, question_style,
      stem, option_a, option_b, option_c, option_d, official_answer,
      key_status, explanation, fact_breakdown_json, trap_type, trap_analysis,
      citations_json, user_trick_note, is_verified
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const q of VERIFIED_STARTER_PYQS) {
    if (!existingStems.has(q.stem)) {
      insertPyq.run(
        q.year,
        q.paper,
        q.question_number,
        q.subject,
        q.syllabus_code,
        q.question_style,
        q.stem,
        q.options.A,
        q.options.B,
        q.options.C,
        q.options.D,
        q.official_answer,
        q.key_status,
        q.explanation,
        JSON.stringify(q.fact_breakdown),
        q.trap_type,
        q.trap_analysis,
        JSON.stringify(q.citations),
        "",
        q.is_verified ? 1 : 0
      );
    }
  }

  // Seed initial starter Error Register cards if empty
  const errorCountRow = db.prepare("SELECT COUNT(*) as count FROM error_registry").get() as { count: number };
  if (errorCountRow.count === 0) {
    const today = new Date().toISOString().slice(0, 10);
    const insertError = db.prepare(`
      INSERT INTO error_registry (
        pyq_id, syllabus_code, subject, trigger_cue, exact_fact,
        personal_trap_note, error_type, source_citation, sr_stage,
        next_review_date, review_count, mastered, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertError.run(
      1,
      "PRE-GS1-POL-CON",
      "Polity & Governance",
      "1st vs 42nd Constitutional Amendment Purpose",
      "1st Amendment 1951 was enacted to overcome initial SC judgments on Fundamental Rights (Champakam Dorairajan & Romesh Thappar). Inserted 15(4), 31A, 31B and 9th Schedule.",
      "Jumped to 42nd Amendment thinking of Emergency/Judicial curbing. Kept 1st Amendment in mind for foundational land/reservation cases.",
      "Veteran Illusion",
      "Constitution (1st CAA) 1951 Statement of Objects & Reasons",
      1,
      today,
      0,
      0,
      today
    );

    insertError.run(
      2,
      "PRE-GS1-POL-CON",
      "Polity & Governance",
      "Constitutional status: NCBC vs NHRC vs Law Commission",
      "Only NCBC is Constitutional (Article 338B via 102nd CAA). NHRC is Statutory (PHRA 1993). Law Commission is an Executive body.",
      "In pair-counting, cannot eliminate. Must strictly memorize Constitutional vs Statutory status of every national commission.",
      "Factual Blindspot",
      "Constitution of India Art 338B & PHRA 1993",
      1,
      today,
      0,
      0,
      today
    );
  }

  dbInstance = db;
  return dbInstance;
}
