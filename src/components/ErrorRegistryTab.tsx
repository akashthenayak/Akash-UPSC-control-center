"use client";

import React, { useEffect, useState } from "react";
import {
  BrainCircuit,
  Check,
  RotateCcw,
  Plus,
  Eye,
  BookMarked,
  Layers,
  CalendarCheck,
  Filter,
  Sparkles,
} from "lucide-react";
import { ErrorEntry, ErrorTaxonomy, SyllabusNode } from "@/types";
import {
  getLocalErrors,
  saveLocalError,
  syncWithLocalStorage,
  updateLocalErrorReview,
} from "@/lib/storage";

interface ErrorRegistryTabProps {
  syllabus: SyllabusNode[];
  onRegistryUpdated: () => void;
  initialDueOnly?: boolean;
  onFilterChange?: (dueOnly: boolean) => void;
}

const STAGE_LABEL: Record<number, string> = {
  1: "Day 1 (Tonight)",
  3: "Day 3 Review",
  7: "Day 7 Review",
  21: "Day 21 Review",
  99: "Mastered",
};

export default function ErrorRegistryTab({
  syllabus,
  onRegistryUpdated,
  initialDueOnly = true,
  onFilterChange,
}: ErrorRegistryTabProps) {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [today, setToday] = useState("");
  const [mode, setMode] = useState<"review" | "table">("review");
  const [dueOnlyFilter, setDueOnlyFilter] = useState<boolean>(initialDueOnly);
  const [revealedId, setRevealedId] = useState<number | null>(null);
  const [taxonomyFilter, setTaxonomyFilter] = useState("ALL");

  // Manual entry form
  const [showAdd, setShowAdd] = useState(false);
  const [triggerCue, setTriggerCue] = useState("");
  const [exactFact, setExactFact] = useState("");
  const [personalTrapNote, setPersonalTrapNote] = useState("");
  const [errorType, setErrorType] = useState<ErrorTaxonomy>("Factual Blindspot");
  const [syllabusCode, setSyllabusCode] = useState("PRE-GS1-POL-CON");
  const [sourceCitation, setSourceCitation] = useState("");

  const fetchErrors = async () => {
    try {
      const res = await fetch("/api/errors");
      if (res.ok) {
        const data = await res.json();
        const serverList = data.errors || [];
        const synced = syncWithLocalStorage(serverList);
        setErrors(synced);
        setToday(data.today || new Date().toISOString().slice(0, 10));
        return;
      }
    } catch (err) {
      console.warn("Using offline localStorage errors:", err);
    }
    // Fallback to local storage
    const localList = getLocalErrors();
    setErrors(localList);
    setToday(new Date().toISOString().slice(0, 10));
  };

  useEffect(() => {
    // Load local storage instantly for zero-latency render
    const cached = getLocalErrors();
    if (cached.length > 0) {
      setErrors(cached);
      setToday(new Date().toISOString().slice(0, 10));
    }
    fetchErrors();
  }, []);

  // Sync initialDueOnly if parent updates it
  useEffect(() => {
    if (initialDueOnly !== undefined) {
      setDueOnlyFilter(initialDueOnly);
    }
  }, [initialDueOnly]);

  // 1-3-7-21 Spaced Repetition Due Filter Check
  const isCardDueToday = (e: ErrorEntry): boolean => {
    if (e.mastered) return false;
    // An item is due if next_review_date is on or before today
    const checkDate = today || new Date().toISOString().slice(0, 10);
    return Boolean(e.next_review_date && e.next_review_date <= checkDate);
  };

  const dueCards = errors.filter(isCardDueToday);

  // Router action: Clicking "Night Review Queue" activates due-today filter
  const handleNightReviewQueueClick = () => {
    setMode("review");
    setDueOnlyFilter(true);
    setRevealedId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "errors");
      url.searchParams.set("filter", "due");
      window.history.replaceState(null, "", url.toString());
    }
    onFilterChange?.(true);
  };

  // Router action: Clicking "2-Column Registry"
  const handleShowAllRegistryClick = () => {
    setMode("table");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "errors");
      if (!dueOnlyFilter) {
        url.searchParams.set("filter", "all");
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handleReviewOutcome = async (id: number, outcome: "recalled" | "forgot") => {
    // 1. Immediately update localStorage and React state
    updateLocalErrorReview(id, outcome);
    setErrors(getLocalErrors());
    setRevealedId(null);

    // 2. Sync with SQLite backend
    try {
      await fetch("/api/errors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, outcome }),
      });
    } catch (err) {
      console.warn("Backend update error, retained in localStorage:", err);
    }

    onRegistryUpdated();
  };

  const handleAddManual = async (e: React.FormEvent) => {
    e.preventDefault();
    const node = syllabus.find((s) => s.code === syllabusCode);
    const currentDate = today || new Date().toISOString().slice(0, 10);
    const payload = {
      pyq_id: null,
      syllabus_code: syllabusCode,
      subject: node?.subject || "General Studies",
      trigger_cue: triggerCue,
      exact_fact: exactFact,
      personal_trap_note: personalTrapNote,
      error_type: errorType,
      source_citation: sourceCitation,
      next_review_date: currentDate, // Scheduled for Day 1 same-night review
      sr_stage: 1,
    };

    // 1. Save directly to localStorage
    saveLocalError(payload);
    setErrors(getLocalErrors());

    // 2. Sync to SQLite server
    try {
      const res = await fetch("/api/errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.id) {
          saveLocalError({ ...payload, id: data.id });
          setErrors(getLocalErrors());
        }
      }
    } catch (err) {
      console.warn("Saved to localStorage; server sync deferred:", err);
    }

    setTriggerCue("");
    setExactFact("");
    setPersonalTrapNote("");
    setSourceCitation("");
    setShowAdd(false);
    onRegistryUpdated();
  };

  // Filtered lists
  const flashcardQueueCards = dueOnlyFilter ? dueCards : errors.filter((e) => !e.mastered);

  const displayedInTable = (dueOnlyFilter ? errors.filter(isCardDueToday) : errors).filter((e) =>
    taxonomyFilter === "ALL" ? true : e.error_type === taxonomyFilter
  );

  return (
    <div className="space-y-6">
      {/* Header & Routing Controls */}
      <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-900">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Error & Trap Registry (1–3–7–21 Spaced Repetition)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              Format: <span className="font-semibold text-stone-900">Left Column = Trigger Cue</span> (active recall prompt) →{" "}
              <span className="font-semibold text-stone-900">Right Column = Exact Fact / Distinction + Trap Type + Citation</span>.
              Review mistakes on Day 1 (same night in Block 4), Day 3, Day 7, and Day 21.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleNightReviewQueueClick}
              className={`rounded-full px-4 py-2 text-xs font-semibold shadow-xs transition-all active:scale-95 ${
                mode === "review" && dueOnlyFilter
                  ? "bg-[#312E81] text-white ring-2 ring-indigo-900/30"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              <CalendarCheck className="mr-1.5 inline h-3.5 w-3.5" />
              Night Review Queue ({dueCards.length} Due Today)
            </button>
            <button
              onClick={handleShowAllRegistryClick}
              className={`rounded-full px-4 py-2 text-xs font-semibold shadow-xs transition-all active:scale-95 ${
                mode === "table"
                  ? "bg-stone-900 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              2-Column Registry ({errors.length})
            </button>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/70 px-4 py-2 text-xs font-bold text-amber-950 shadow-xs transition hover:bg-amber-200/70 active:scale-95"
            >
              <Plus className="h-3.5 w-3.5 text-amber-800" />
              Log SFG / Mock Mistake
            </button>
          </div>
        </div>
      </div>

      {/* Material 3 Active Filter Indicator Banner */}
      {dueOnlyFilter && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200/80 bg-[#EEF2FF] px-5 py-3 text-xs text-[#1E1B4B] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="font-semibold">
              Night Review Queue Active: Displaying only items due for review today ({today}) based on the 1–3–7–21 cycle.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white px-2.5 py-0.5 font-bold text-indigo-950 shadow-xs">
              {dueCards.length} Cards Due
            </span>
            <button
              onClick={() => {
                setDueOnlyFilter(false);
                if (typeof window !== "undefined") {
                  const url = new URL(window.location.href);
                  url.searchParams.set("filter", "all");
                  window.history.replaceState(null, "", url.toString());
                }
                onFilterChange?.(false);
              }}
              className="rounded-full border border-indigo-300 bg-white px-3 py-1 text-xs font-bold text-indigo-800 transition hover:bg-indigo-50"
            >
              Show All ({errors.length}) Cards
            </button>
          </div>
        </div>
      )}

      {/* Add Manual Entry Form */}
      {showAdd && (
        <form onSubmit={handleAddManual} className="rounded-[28px] border border-amber-300 bg-amber-50/70 p-6 shadow-sm space-y-3.5">
          <h3 className="font-serif text-base font-bold text-stone-900">
            Add 2-Column Error Card (SFG / Vision Mock / PYQ)
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-stone-700">Syllabus Unit</label>
              <select
                value={syllabusCode}
                onChange={(e) => setSyllabusCode(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs text-stone-900 focus:outline-none"
              >
                {syllabus
                  .filter((s) => s.stage !== "MAINS")
                  .map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.code} — {s.topic}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700">Error Taxonomy</label>
              <select
                value={errorType}
                onChange={(e) => setErrorType(e.target.value as ErrorTaxonomy)}
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs text-stone-900 focus:outline-none"
              >
                <option value="Factual Blindspot">Factual Blindspot</option>
                <option value="Veteran Illusion">Veteran Illusion</option>
                <option value="50:50 Trap">50:50 Trap</option>
                <option value="Misread Correct/Incorrect">Misread Correct/Incorrect</option>
                <option value="Over-stretched Logic">Over-stretched Logic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-stone-700">
                Left Column: Trigger Cue (Recall Question / Distinguishing Prompt) *
              </label>
              <textarea
                required
                rows={3}
                value={triggerCue}
                onChange={(e) => setTriggerCue(e.target.value)}
                placeholder="e.g., WPA 1972 (2022 Amendment): How many Schedules now exist & what is Schedule IV?"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white p-3 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700">
                Right Column: Exact Verified Fact / Distinction *
              </label>
              <textarea
                required
                rows={3}
                value={exactFact}
                onChange={(e) => setExactFact(e.target.value)}
                placeholder="e.g., Reduced from 6 to 4 schedules; Schedule IV lists CITES specimens (Vermin schedule deleted)."
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white p-3 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-stone-700">Personal Trap / Why I Missed It</label>
              <input
                type="text"
                value={personalTrapNote}
                onChange={(e) => setPersonalTrapNote(e.target.value)}
                placeholder="e.g., Remembered pre-2022 6-schedule classification."
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700">Primary Source Citation</label>
              <input
                type="text"
                value={sourceCitation}
                onChange={(e) => setSourceCitation(e.target.value)}
                placeholder="e.g., Wild Life (Protection) Amendment Act, 2022"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-semibold text-stone-700"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-stone-900 px-5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-stone-800">
              Save to Day 1 Queue
            </button>
          </div>
        </form>
      )}

      {/* Mode 1: Night Review Queue Flashcards */}
      {mode === "review" ? (
        flashcardQueueCards.length === 0 ? (
          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-10 text-center shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mt-3 font-serif text-lg font-bold text-stone-900">
              All Scheduled 1–3–7–21 Error Cards Cleared for Today!
            </h3>
            <p className="mt-1 text-xs text-stone-600">
              You have no pending reviews scheduled on or before {today}. New mistakes from today&apos;s PYQs or mocks will appear here for Block 4 night review.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  setDueOnlyFilter(false);
                  setMode("table");
                }}
                className="rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-stone-800"
              >
                Inspect All {errors.length} Cards in Registry
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {flashcardQueueCards.map((card) => {
              const isRevealed = revealedId === card.id;
              return (
                <div key={card.id} className="rounded-[28px] border border-stone-200/90 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-900">
                        {STAGE_LABEL[card.sr_stage] || `Stage ${card.sr_stage}`}
                      </span>
                      <span className="rounded-full bg-stone-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-stone-700">
                        {card.syllabus_code}
                      </span>
                      <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
                        {card.error_type}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-stone-400">
                      Scheduled Due: {card.next_review_date}
                    </span>
                  </div>

                  {/* Left Column: Trigger Cue */}
                  <div className="mt-4 rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Trigger Cue (Recall Before Revealing)
                    </div>
                    <div className="mt-1 font-serif text-base font-semibold text-stone-900">
                      {card.trigger_cue}
                    </div>
                  </div>

                  {!isRevealed ? (
                    <button
                      onClick={() => setRevealedId(card.id)}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800 active:scale-95"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Reveal Exact Fact & Citation
                    </button>
                  ) : (
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                          Exact Verified Fact / Distinction
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-stone-900">{card.exact_fact}</p>
                        {card.personal_trap_note && (
                          <p className="mt-2 text-xs italic text-stone-700">
                            Trap note: {card.personal_trap_note}
                          </p>
                        )}
                        {card.source_citation && (
                          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-900">
                            <BookMarked className="h-3.5 w-3.5" />
                            Source: {card.source_citation}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={() => handleReviewOutcome(card.id, "recalled")}
                          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-95"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Recalled Cleanly (Advance 1-3-7-21 Cycle)
                        </button>
                        <button
                          onClick={() => handleReviewOutcome(card.id, "forgot")}
                          className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-5 py-2.5 text-xs font-semibold text-rose-800 transition hover:bg-rose-100 active:scale-95"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Missed / Still Trapped (Reset to Day 1)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Mode 2: 2-Column Error Registry Table with Spaced Repetition Filtering */
        <div className="rounded-[28px] border border-stone-200/90 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Registry View:
              </span>
              <button
                onClick={() => setDueOnlyFilter(false)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  !dueOnlyFilter
                    ? "bg-stone-900 text-white shadow-xs"
                    : "border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100"
                }`}
              >
                All Cards ({errors.length})
              </button>
              <button
                onClick={() => setDueOnlyFilter(true)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  dueOnlyFilter
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100"
                }`}
              >
                Due Today Only ({dueCards.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">Taxonomy:</span>
              <select
                value={taxonomyFilter}
                onChange={(e) => setTaxonomyFilter(e.target.value)}
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-800 focus:outline-none"
              >
                <option value="ALL">All Error Types</option>
                <option value="Factual Blindspot">Factual Blindspot</option>
                <option value="Veteran Illusion">Veteran Illusion</option>
                <option value="50:50 Trap">50:50 Trap</option>
                <option value="Misread Correct/Incorrect">Misread Correct/Incorrect</option>
                <option value="Over-stretched Logic">Over-stretched Logic</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F5F2EC] text-stone-700">
                  <th className="p-3.5 font-bold rounded-l-xl">Left Column: Trigger Cue</th>
                  <th className="p-3.5 font-bold">Right Column: Exact Fact & Source</th>
                  <th className="p-3.5 font-bold">Taxonomy</th>
                  <th className="p-3.5 font-bold rounded-r-xl">1-3-7-21 Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {displayedInTable.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-stone-500">
                      No cards match the active filter ({dueOnlyFilter ? "Due Today" : "All"} • {taxonomyFilter}).
                    </td>
                  </tr>
                ) : (
                  displayedInTable.map((e) => (
                    <tr key={e.id} className="align-top hover:bg-stone-50/70">
                      <td className="w-1/3 p-3.5 font-medium text-stone-900">
                        <div>{e.trigger_cue}</div>
                        <div className="mt-1 font-mono text-[10px] text-stone-500">
                          {e.syllabus_code} • {e.subject}
                        </div>
                      </td>
                      <td className="w-1/2 p-3.5 text-stone-700 leading-relaxed">
                        <div>{e.exact_fact}</div>
                        {e.personal_trap_note && (
                          <div className="mt-1 text-amber-900 italic font-medium">
                            Trap: {e.personal_trap_note}
                          </div>
                        )}
                        {e.source_citation && (
                          <div className="mt-1 text-[11px] font-semibold text-emerald-900">
                            Source: {e.source_citation}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-block rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
                          {e.error_type}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            e.mastered ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-900"
                          }`}
                        >
                          {STAGE_LABEL[e.sr_stage] || `Stage ${e.sr_stage}`}
                        </span>
                        {!e.mastered && (
                          <div className="mt-1 text-[10px] font-semibold text-stone-500">
                            Due: {e.next_review_date} {e.next_review_date <= today ? "⚠️ Today" : ""}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
