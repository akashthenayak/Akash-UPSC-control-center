import type { ErrorEntry, ErrorTaxonomy } from "@/types";

export const LOCAL_STORAGE_ERROR_KEY = "upsc_prep_error_registry";
export const LOCAL_STORAGE_LOGGED_PYQS_KEY = "upsc_prep_logged_pyqs";

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

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Retrieve all error entries saved in browser localStorage.
 */
export function getLocalErrors(): ErrorEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_ERROR_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read errors from localStorage:", err);
    return [];
  }
}

/**
 * Save or append an error entry directly into browser localStorage.
 */
export function saveLocalError(payload: LocalErrorPayload): ErrorEntry {
  if (typeof window === "undefined") {
    return {
      id: payload.id ?? Date.now(),
      pyq_id: payload.pyq_id,
      syllabus_code: payload.syllabus_code,
      subject: payload.subject,
      trigger_cue: payload.trigger_cue,
      exact_fact: payload.exact_fact,
      personal_trap_note: payload.personal_trap_note,
      error_type: payload.error_type,
      source_citation: payload.source_citation,
      sr_stage: payload.sr_stage ?? 1,
      next_review_date: payload.next_review_date ?? new Date().toISOString().slice(0, 10),
      review_count: payload.review_count ?? 0,
      mastered: payload.mastered ?? false,
      created_at: payload.created_at ?? new Date().toISOString().slice(0, 10),
      last_reviewed_at: payload.last_reviewed_at ?? null,
    };
  }

  const existing = getLocalErrors();
  const today = new Date().toISOString().slice(0, 10);

  // If entry with same pyq_id or id already exists in localStorage, update it
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
      (matchIndex >= 0 ? existing[matchIndex].next_review_date : addDays(today, 1)),
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

  try {
    window.localStorage.setItem(LOCAL_STORAGE_ERROR_KEY, JSON.stringify(existing));
    if (payload.pyq_id) {
      markPyqAsLogged(payload.pyq_id);
    }
  } catch (err) {
    console.error("Failed to write error to localStorage:", err);
  }

  return entry;
}

/**
 * Retrieve array of PYQ IDs that have been logged to the Error Registry.
 */
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

/**
 * Record a PYQ ID as logged in localStorage.
 */
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

/**
 * Update an error card in localStorage when user recalls or forgets it.
 */
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

/**
 * Bidirectional merge between server SQLite errors and localStorage errors.
 */
export function syncWithLocalStorage(serverErrors: ErrorEntry[]): ErrorEntry[] {
  if (typeof window === "undefined") return serverErrors;
  const localList = getLocalErrors();

  const map = new Map<number, ErrorEntry>();

  // 1. Seed from server
  for (const item of serverErrors) {
    map.set(item.id, item);
  }

  // 2. Overlay any local entries that might be newer or pending sync
  for (const item of localList) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
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
