export type StageType = "PRELIMS" | "MAINS" | "BOTH";

export type PriorityTag =
  | "non_psir_bleeder"
  | "veteran_trap"
  | "psir_bridge"
  | "high_roi_mains"
  | "csat_insurance";

export interface SyllabusNode {
  id: number;
  code: string;
  paper: string;
  subject: string;
  topic: string;
  subtopics: string;
  stage: StageType;
  priority_tag: PriorityTag;
  recommended_source: string;
  mastery_pct: number;
  target_mcqs: number;
  completed_mcqs: number;
  last_studied_at: string | null;
}

export interface RoutineSlot {
  id: string;
  time_window: string;
  title: string;
  category: "static" | "mcq_test" | "office_pocket" | "fitness" | "weak_pillar" | "spouse" | "error_review" | "mock";
  duration_min: number;
  description: string;
  scientific_reason: string;
  is_protected?: boolean;
}

export interface DailyTargetSuggestion {
  date: string;
  day_type: "weekday" | "saturday" | "sunday";
  phase_name: string;
  phase_split: string;
  focus_pillars: string[];
  suggested_syllabus_codes: string[];
  daily_mcq_target: number;
  daily_pyq_target: number;
  slots: RoutineSlot[];
}

export interface DailyLogEntry {
  id: number;
  log_date: string;
  day_type: "weekday" | "saturday" | "sunday";
  completed_slots: string[];
  mcqs_solved: number;
  mcqs_correct: number;
  pyqs_dissected: number;
  errors_reviewed: number;
  focused_syllabus_code: string | null;
  office_spillover_note: string;
  updated_at: string;
}

export interface CitationItem {
  title: string;
  reference: string;
  url?: string;
}

export interface FactBreakdownItem {
  label: string;
  status: "true" | "false" | "nuance";
  detail: string;
}

export interface PyqQuestion {
  id: number;
  year: number;
  paper: string;
  question_number: number | null;
  subject: string;
  syllabus_code: string;
  question_style: "standard" | "pair_counting" | "statement_reason" | "chronology";
  stem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  official_answer: "A" | "B" | "C" | "D";
  key_status: string;
  explanation: string;
  fact_breakdown: FactBreakdownItem[];
  trap_type: string;
  trap_analysis: string;
  citations: CitationItem[];
  user_trick_note: string;
  is_verified: boolean;
}

export interface PyqAttempt {
  id: number;
  pyq_id: number;
  selected_option: "A" | "B" | "C" | "D";
  confidence: "sure_shot" | "fifty_fifty" | "wild_guess";
  is_correct: boolean;
  personal_note: string;
  attempted_at: string;
}

export type ErrorTaxonomy =
  | "Factual Blindspot"
  | "Misread Correct/Incorrect"
  | "Over-stretched Logic"
  | "50:50 Trap"
  | "Veteran Illusion";

export interface ErrorEntry {
  id: number;
  pyq_id: number | null;
  syllabus_code: string;
  subject: string;
  trigger_cue: string;
  exact_fact: string;
  personal_trap_note: string;
  error_type: ErrorTaxonomy;
  source_citation: string;
  sr_stage: number; // 1 -> 3 -> 7 -> 21 -> 99 (mastered)
  next_review_date: string;
  review_count: number;
  mastered: boolean;
  created_at: string;
  last_reviewed_at: string | null;
}

export interface StudyPhaseInfo {
  id: string;
  name: string;
  window: string;
  split: string;
  objective: string;
  key_rule: string;
}
