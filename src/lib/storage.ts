import {
  DailyLogEntry,
  DailyTargetSuggestion,
  ErrorEntry,
  ErrorTaxonomy,
  PyqAttempt,
  PyqQuestion,
  SyllabusNode,
} from "@/types";
import { OFFICIAL_UPSC_SYLLABUS } from "@/data/syllabus";
import { VERIFIED_STARTER_PYQS } from "@/data/pyqs";
import {
  buildDailySuggestion,
  EXAM_MILESTONES,
  SCORECARD_BENCHMARK,
  STUDY_PHASES,
} from "@/lib/study-plan";

// Storage Keys
export const LOCAL_STORAGE_ERROR_KEY = "upsc_prep_error_registry";
export const LOCAL_STORAGE_LOGGED_PYQS_KEY = "upsc_prep_logged_pyqs";
export const LOCAL_STORAGE_DAILY_LOGS_KEY = "upsc_prep_daily_logs";
export const LOCAL_STORAGE_SYLLABUS_MASTERY_KEY = "upsc_prep_syllabus_mastery";
export const LOCAL_STORAGE_PYQ_ATTEMPTS_KEY = "upsc_prep_pyq_attempts";
export const LOCAL_STORAGE_TRICK_NOTES_KEY = "upsc_prep_trick_notes";
export const LOCAL_STORAGE_CUSTOM_PYQS_KEY = "upsc_prep_custom_pyqs";

export interface LocalErrorPayload {
  id?: number;
  pyq_id: number | null;
  syllabus_code: string;
  subject: string;
  trigger_cue: string;
  exact_fact: string;
  personal_trap_note: string;
  error_type: ErrorTaxonomy;
  source_citation: string;
  sr_stage?: number;
  next_review_date?: string;
  review_count?: number;
  mastered?: boolean;
  created_at?: string;
  last_reviewed_at?: string | null;
}

export interface PyqWithAttempt extends PyqQuestion {
  last_attempt?: {
    selected_option: "A" | "B" | "C" | "D";
    confidence: string;
    is_correct: boolean;
    attempted_at: string;
  } | null;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// ==================== ERROR REGISTRY ====================

const STARTER_ERRORS: ErrorEntry[] = [
  {
    id: 1,
    pyq_id: 4,
    syllabus_code: "PRE-GS1-POL-CON",
    subject: "Polity & Governance",
    trigger_cue: "Article 300A — Is Right to Property a Fundamental Right or Constitutional Right?",
    exact_fact:
      "Right to Property was deleted from Part III by 44th Constitutional Amendment Act 1978 and inserted as a Constitutional / Legal Right under Article 300A in Part XII.",
    personal_trap_note:
      "Often mistaken for a regular statutory right; it remains an enforceable Constitutional Right without being a Part III Fundamental Right.",
    error_type: "Factual Blindspot",
    source_citation: "Constitution of India, Article 300A & 44th Amendment Act 1978",
    sr_stage: 1,
    next_review_date: new Date().toISOString().slice(0, 10),
    review_count: 0,
    mastered: false,
    created_at: new Date().toISOString().slice(0, 10),
    last_reviewed_at: null,
  },
  {
    id: 2,
    pyq_id: 6,
    syllabus_code: "PRE-GS1-ECO-MAC",
    subject: "Economy",
    trigger_cue:
      "Withdrawing cash from demand deposit — Effect on aggregate money supply (M3)?",
    exact_fact:
      "Withdrawing cash from your bank account leaves aggregate money supply M3 unchanged. Currency with the public increases by the exact same amount that demand deposits with the banking system decrease.",
    personal_trap_note:
      "Confusing the currency in pocket component with total broad money M3.",
    error_type: "Veteran Illusion",
    source_citation: "NCERT Class XII Macroeconomics — Money and Banking",
    sr_stage: 1,
    next_review_date: new Date().toISOString().slice(0, 10),
    review_count: 0,
    mastered: false,
    created_at: new Date().toISOString().slice(0, 10),
    last_reviewed_at: null,
  },
];

export function getLocalErrors(): ErrorEntry[] {
  if (typeof window === "undefined") return STARTER_ERRORS;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_ERROR_KEY);
    if (!raw) {
      window.localStorage.setItem(LOCAL_STORAGE_ERROR_KEY, JSON.stringify(STARTER_ERRORS));
      return STARTER_ERRORS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read errors from localStorage:", err);
    return STARTER_ERRORS;
  }
}

export function saveLocalError(payload: LocalErrorPayload): ErrorEntry {
  const today = new Date().toISOString().slice(0, 10);
  const existing = getLocalErrors();

  const matchIndex = existing.findIndex(
    (e) => (payload.id && e.id === payload.id) || (payload.pyq_id && e.pyq_id === payload.pyq_id)
  );

  const entry: ErrorEntry = {
    id: payload.id ?? (matchIndex >= 0 ? existing[matchIndex].id : Date.now()),
    pyq_id: payload.pyq_id,
    syllabus_code: payload.syllabus_code,
    subject: payload.subject,
    trigger_cue: payload.trigger_cue,
    exact_fact: payload.exact_fact,
    personal_trap_note: payload.personal_trap_note,
    error_type: payload.error_type,
    source_citation: payload.source_citation,
    sr_stage: payload.sr_stage ?? (matchIndex >= 0 ? existing[matchIndex].sr_stage : 1),
    next_review_date:
      payload.next_review_date ??
      (matchIndex >= 0 ? existing[matchIndex].next_review_date : today),
    review_count:
      payload.review_count ?? (matchIndex >= 0 ? existing[matchIndex].review_count : 0),
    mastered: payload.mastered ?? (matchIndex >= 0 ? existing[matchIndex].mastered : false),
    created_at: payload.created_at ?? (matchIndex >= 0 ? existing[matchIndex].created_at : today),
    last_reviewed_at:
      payload.last_reviewed_at !== undefined
        ? payload.last_reviewed_at
        : matchIndex >= 0
        ? existing[matchIndex].last_reviewed_at
        : null,
  };

  if (matchIndex >= 0) {
    existing[matchIndex] = entry;
  } else {
    existing.unshift(entry);
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_ERROR_KEY, JSON.stringify(existing));
      if (payload.pyq_id) {
        markPyqAsLogged(payload.pyq_id);
      }
    } catch (err) {
      console.error("Failed to write error to localStorage:", err);
    }
  }

  return entry;
}

export function deleteLocalError(id: number): void {
  if (typeof window === "undefined") return;
  const existing = getLocalErrors().filter((e) => e.id !== id);
  try {
    window.localStorage.setItem(LOCAL_STORAGE_ERROR_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to delete error from localStorage:", err);
  }
}

export function updateLocalErrorReview(id: number, outcome: "recalled" | "forgot"): void {
  if (typeof window === "undefined") return;
  const existing = getLocalErrors();
  const index = existing.findIndex((e) => e.id === id);
  if (index < 0) return;

  const card = existing[index];
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toISOString();

  const transitions: Record<number, { stage: number; days: number; mastered: boolean }> = {
    1: { stage: 3, days: 3, mastered: false },
    3: { stage: 7, days: 7, mastered: false },
    7: { stage: 21, days: 21, mastered: false },
    21: { stage: 99, days: 0, mastered: true },
  };

  if (outcome === "recalled") {
    const next = transitions[card.sr_stage] || { stage: 99, days: 0, mastered: true };
    card.sr_stage = next.stage;
    card.mastered = next.mastered;
    card.next_review_date = next.mastered ? today : addDays(today, next.days);
  } else {
    card.sr_stage = 1;
    card.mastered = false;
    card.next_review_date = addDays(today, 1);
  }

  card.review_count = (card.review_count || 0) + 1;
  card.last_reviewed_at = now;
  existing[index] = card;

  try {
    window.localStorage.setItem(LOCAL_STORAGE_ERROR_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to update reviewed error in localStorage:", err);
  }
}

export function getLoggedPyqIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_LOGGED_PYQS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markPyqAsLogged(pyqId: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLoggedPyqIds();
    if (!current.includes(pyqId)) {
      current.push(pyqId);
      window.localStorage.setItem(LOCAL_STORAGE_LOGGED_PYQS_KEY, JSON.stringify(current));
    }
  } catch (err) {
    console.error("Failed to mark PYQ as logged in localStorage:", err);
  }
}

export function syncWithLocalStorage(serverErrors: ErrorEntry[]): ErrorEntry[] {
  if (typeof window === "undefined") return serverErrors;
  const localList = getLocalErrors();
  const map = new Map<number, ErrorEntry>();

  for (const item of serverErrors) {
    map.set(item.id, item);
  }
  for (const item of localList) {
    map.set(item.id, item);
  }

  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  try {
    window.localStorage.setItem(LOCAL_STORAGE_ERROR_KEY, JSON.stringify(merged));
  } catch (err) {
    console.error("Failed to sync error registry with localStorage:", err);
  }

  return merged;
}

// ==================== DAILY LOGS ====================

function createEmptyDailyLog(logDate: string): DailyLogEntry {
  const suggestion = buildDailySuggestion(logDate);
  return {
    id: Date.now(),
    log_date: logDate,
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
}

export function getLocalDailyLogs(): DailyLogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_DAILY_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAllDailyLogs(logs: DailyLogEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_DAILY_LOGS_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error("Failed to save daily logs to localStorage:", err);
  }
}

export function getLocalDailyLog(logDate: string): DailyLogEntry {
  const all = getLocalDailyLogs();
  const found = all.find((l) => l.log_date === logDate);
  if (found) return found;

  const newLog = createEmptyDailyLog(logDate);
  all.unshift(newLog);
  saveAllDailyLogs(all);
  return newLog;
}

export function saveLocalDailyLog(patch: Partial<DailyLogEntry> & { log_date: string }): DailyLogEntry {
  const all = getLocalDailyLogs();
  const index = all.findIndex((l) => l.log_date === patch.log_date);
  let updated: DailyLogEntry;

  if (index >= 0) {
    updated = {
      ...all[index],
      ...patch,
      updated_at: new Date().toISOString(),
    };
    all[index] = updated;
  } else {
    const empty = createEmptyDailyLog(patch.log_date);
    updated = {
      ...empty,
      ...patch,
      updated_at: new Date().toISOString(),
    };
    all.unshift(updated);
  }

  saveAllDailyLogs(all);
  return updated;
}

export function getRollingDailyLogs(limit = 14): DailyLogEntry[] {
  const all = getLocalDailyLogs();
  return all
    .sort((a, b) => b.log_date.localeCompare(a.log_date))
    .slice(0, limit);
}

// ==================== SYLLABUS MASTERY ====================

interface SyllabusMasteryRecord {
  mastery_pct: number;
  completed_mcqs: number;
  last_studied_at: string | null;
}

export function getLocalSyllabusMastery(): Record<string, SyllabusMasteryRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_SYLLABUS_MASTERY_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveLocalSyllabusMastery(data: Record<string, SyllabusMasteryRecord>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_SYLLABUS_MASTERY_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save syllabus mastery to localStorage:", err);
  }
}

export function getLocalSyllabus(): SyllabusNode[] {
  const masteryMap = getLocalSyllabusMastery();
  return OFFICIAL_UPSC_SYLLABUS.map((node, index) => {
    const custom = masteryMap[node.code];
    return {
      id: index + 1,
      code: node.code,
      paper: node.paper,
      subject: node.subject,
      topic: node.topic,
      subtopics: node.subtopics,
      stage: node.stage,
      priority_tag: node.priority_tag,
      recommended_source: node.recommended_source,
      mastery_pct: custom ? custom.mastery_pct : 0,
      target_mcqs: node.target_mcqs,
      completed_mcqs: custom ? custom.completed_mcqs : 0,
      last_studied_at: custom ? custom.last_studied_at : null,
    };
  });
}

export function updateLocalSyllabusMastery(
  code: string,
  masteryPct: number,
  completedMcqsDelta?: number
): SyllabusNode[] {
  const masteryMap = getLocalSyllabusMastery();
  const current = masteryMap[code] || { mastery_pct: 0, completed_mcqs: 0, last_studied_at: null };
  masteryMap[code] = {
    mastery_pct: Math.max(0, Math.min(100, masteryPct)),
    completed_mcqs:
      completedMcqsDelta !== undefined
        ? Math.max(0, current.completed_mcqs + completedMcqsDelta)
        : current.completed_mcqs,
    last_studied_at: new Date().toISOString(),
  };
  saveLocalSyllabusMastery(masteryMap);
  return getLocalSyllabus();
}

// ==================== PYQ ATTEMPTS & TRICK NOTES ====================

export function getLocalPyqAttempts(): Record<number, PyqAttempt> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_PYQ_ATTEMPTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function recordLocalPyqAttempt(attempt: {
  pyq_id: number;
  selected_option: "A" | "B" | "C" | "D";
  confidence: "sure_shot" | "fifty_fifty" | "wild_guess";
  personal_note?: string;
}): { attempt: PyqAttempt; is_correct: boolean } {
  const allPyqs = getAllPyqs();
  const q = allPyqs.find((p) => p.id === attempt.pyq_id);
  const isCorrect = q ? attempt.selected_option === q.official_answer : false;
  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  const attemptObj: PyqAttempt = {
    id: Date.now(),
    pyq_id: attempt.pyq_id,
    selected_option: attempt.selected_option,
    confidence: attempt.confidence,
    is_correct: isCorrect,
    personal_note: attempt.personal_note || "",
    attempted_at: now,
  };

  if (typeof window !== "undefined") {
    const attempts = getLocalPyqAttempts();
    attempts[attempt.pyq_id] = attemptObj;
    try {
      window.localStorage.setItem(LOCAL_STORAGE_PYQ_ATTEMPTS_KEY, JSON.stringify(attempts));
    } catch (err) {
      console.error("Failed to save attempt to localStorage:", err);
    }

    if (attempt.personal_note?.trim()) {
      saveLocalTrickNote(attempt.pyq_id, attempt.personal_note.trim());
    }

    // Update syllabus node completed_mcqs counter
    if (q) {
      updateLocalSyllabusMastery(q.syllabus_code, 0, 1);
    }

    // Update today's daily log counters
    const currentLog = getLocalDailyLog(today);
    saveLocalDailyLog({
      log_date: today,
      mcqs_solved: currentLog.mcqs_solved + 1,
      mcqs_correct: isCorrect ? currentLog.mcqs_correct + 1 : currentLog.mcqs_correct,
      pyqs_dissected: currentLog.pyqs_dissected + 1,
    });
  }

  return { attempt: attemptObj, is_correct: isCorrect };
}

export function getLocalTrickNotes(): Record<number, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_TRICK_NOTES_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveLocalTrickNote(pyqId: number, note: string): void {
  if (typeof window === "undefined") return;
  const notes = getLocalTrickNotes();
  notes[pyqId] = note;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_TRICK_NOTES_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error("Failed to save trick note to localStorage:", err);
  }
}

// ==================== PYQ QUESTIONS (STARTER + CUSTOM) ====================

export function getLocalCustomPyqs(): PyqQuestion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_CUSTOM_PYQS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

export function saveLocalCustomPyqs(newQuestions: PyqQuestion[]): void {
  if (typeof window === "undefined") return;
  const current = getLocalCustomPyqs();
  const existingStems = new Set(current.map((q) => q.stem));
  for (const n of newQuestions) {
    if (!existingStems.has(n.stem)) {
      current.push(n);
    }
  }
  try {
    window.localStorage.setItem(LOCAL_STORAGE_CUSTOM_PYQS_KEY, JSON.stringify(current));
  } catch (err) {
    console.error("Failed to save custom PYQs to localStorage:", err);
  }
}

export function getAllPyqs(filters?: {
  paper?: string;
  subject?: string;
  syllabus_code?: string;
  year?: string;
}): PyqWithAttempt[] {
  const attempts = getLocalPyqAttempts();
  const notes = getLocalTrickNotes();

  const syllabusMap = new Map(OFFICIAL_UPSC_SYLLABUS.map((s) => [s.code, s]));

  const starterList: PyqWithAttempt[] = VERIFIED_STARTER_PYQS.map((q, idx) => {
    const sNode = syllabusMap.get(q.syllabus_code);
    const id = idx + 1;
    const lastAttempt = attempts[id]
      ? {
          selected_option: attempts[id].selected_option,
          confidence: attempts[id].confidence,
          is_correct: attempts[id].is_correct,
          attempted_at: attempts[id].attempted_at,
        }
      : null;

    return {
      ...q,
      id,
      subject: sNode ? sNode.subject : q.subject,
      syllabus_topic: sNode ? sNode.topic : null,
      syllabus_priority_tag: sNode ? sNode.priority_tag : null,
      user_trick_note: notes[id] || q.user_trick_note || "",
      last_attempt: lastAttempt,
    };
  });

  const customList: PyqWithAttempt[] = getLocalCustomPyqs().map((q, idx) => {
    const id = starterList.length + idx + 1;
    const sNode = syllabusMap.get(q.syllabus_code);
    const lastAttempt = attempts[id]
      ? {
          selected_option: attempts[id].selected_option,
          confidence: attempts[id].confidence,
          is_correct: attempts[id].is_correct,
          attempted_at: attempts[id].attempted_at,
        }
      : null;

    return {
      ...q,
      id,
      subject: sNode ? sNode.subject : q.subject,
      syllabus_topic: sNode ? sNode.topic : null,
      syllabus_priority_tag: sNode ? sNode.priority_tag : null,
      user_trick_note: notes[id] || q.user_trick_note || "",
      last_attempt: lastAttempt,
    };
  });

  let combined = [...starterList, ...customList];

  // Apply filters
  if (filters?.paper && filters.paper !== "ALL") {
    if (filters.paper === "GS1") {
      combined = combined.filter((q) => !q.paper.toLowerCase().includes("csat") && !q.paper.toLowerCase().includes("paper ii"));
    } else if (filters.paper === "CSAT") {
      combined = combined.filter((q) => q.paper.toLowerCase().includes("csat") || q.paper.toLowerCase().includes("paper ii") || q.subject.includes("CSAT"));
    }
  }

  if (filters?.syllabus_code && filters.syllabus_code !== "ALL") {
    combined = combined.filter((q) => q.syllabus_code === filters.syllabus_code);
  } else if (filters?.subject && filters.subject !== "ALL") {
    combined = combined.filter((q) => q.subject === filters.subject);
  }

  if (filters?.year && filters.year !== "ALL") {
    const yearNum = Number(filters.year);
    combined = combined.filter((q) => q.year === yearNum);
  }

  return combined.sort((a, b) => b.year - a.year || a.id - b.id);
}

// ==================== DASHBOARD AGGREGATE ====================

export function getLocalDashboard(dateStr: string) {
  const suggestion = buildDailySuggestion(dateStr);
  const dailyLog = getLocalDailyLog(dateStr);
  const rollingLogs = getRollingDailyLogs(14);
  const syllabus = getLocalSyllabus();
  const allPyqs = getAllPyqs();
  const attempts = getLocalPyqAttempts();
  const errors = getLocalErrors();

  const dueErrors = errors.filter((e) => !e.mastered && e.next_review_date <= dateStr).length;
  const attemptsList = Object.values(attempts);
  const pyqAttempts = attemptsList.length;
  const pyqCorrect = attemptsList.filter((a) => a.is_correct).length;

  // Grouped accuracy by subject
  const subjectMap: Record<string, { attempts: number; correct: number }> = {};
  for (const att of attemptsList) {
    const q = allPyqs.find((p) => p.id === att.pyq_id);
    const sub = q ? q.subject : "General";
    if (!subjectMap[sub]) subjectMap[sub] = { attempts: 0, correct: 0 };
    subjectMap[sub].attempts += 1;
    if (att.is_correct) subjectMap[sub].correct += 1;
  }
  const subjectAccuracy = Object.entries(subjectMap).map(([subject, data]) => ({
    subject,
    attempts: data.attempts,
    correct: data.correct,
  }));

  // Taxonomy stats
  const taxMap: Record<string, number> = {};
  for (const err of errors) {
    taxMap[err.error_type] = (taxMap[err.error_type] || 0) + 1;
  }
  const errorTaxonomyStats = Object.entries(taxMap)
    .map(([error_type, count]) => ({ error_type, count }))
    .sort((a, b) => b.count - a.count);

  return {
    today: dateStr,
    suggestion,
    dailyLog,
    rollingLogs,
    syllabus,
    phases: STUDY_PHASES,
    milestones: EXAM_MILESTONES,
    scorecard: SCORECARD_BENCHMARK,
    stats: {
      dueErrors,
      totalErrors: errors.length,
      totalPyqs: allPyqs.length,
      pyqAttempts,
      pyqCorrect,
      subjectAccuracy,
      errorTaxonomyStats,
    },
  };
}
