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
} from "lucide-react";
import { ErrorEntry, ErrorTaxonomy, SyllabusNode } from "@/types";

interface ErrorRegistryTabProps {
  syllabus: SyllabusNode[];
  onRegistryUpdated: () => void;
}

const STAGE_LABEL: Record<number, string> = {
  1: "Day 1",
  3: "Day 3",
  7: "Day 7",
  21: "Day 21",
  99: "Mastered",
};

export default function ErrorRegistryTab({ syllabus, onRegistryUpdated }: ErrorRegistryTabProps) {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [today, setToday] = useState("");
  const [mode, setMode] = useState<"review" | "table">("review");
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
    const res = await fetch("/api/errors");
    const data = await res.json();
    setErrors(data.errors || []);
    setToday(data.today || new Date().toISOString().slice(0, 10));
  };

  useEffect(() => {
    fetchErrors();
  }, []);

  const dueCards = errors.filter((e) => !e.mastered && e.next_review_date <= today);

  const handleReviewOutcome = async (id: number, outcome: "recalled" | "forgot") => {
    await fetch("/api/errors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, outcome }),
    });
    setRevealedId(null);
    await fetchErrors();
    onRegistryUpdated();
  };

  const handleAddManual = async (e: React.FormEvent) => {
    e.preventDefault();
    const node = syllabus.find((s) => s.code === syllabusCode);
    const res = await fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        syllabus_code: syllabusCode,
        subject: node?.subject || "General Studies",
        trigger_cue: triggerCue,
        exact_fact: exactFact,
        personal_trap_note: personalTrapNote,
        error_type: errorType,
        source_citation: sourceCitation,
      }),
    });
    if (res.ok) {
      setTriggerCue("");
      setExactFact("");
      setPersonalTrapNote("");
      setSourceCitation("");
      setShowAdd(false);
      await fetchErrors();
      onRegistryUpdated();
    }
  };

  const filteredTable =
    taxonomyFilter === "ALL" ? errors : errors.filter((e) => e.error_type === taxonomyFilter);

  return (
    <div className="space-y-6">
      {/* Header & Scientific 2-Column Format Explainer */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-700" />
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Error & Trap Registry (1–3–7–21 Spaced Repetition)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-600">
              Format: <span className="font-semibold">Left Column = Trigger Cue</span> (active recall prompt) →{" "}
              <span className="font-semibold">Right Column = Exact Fact / Distinction + Trap Type + Citation</span>.
              Review due cards every night in Block 4 (9:30–10:00 PM).
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode("review")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                mode === "review" ? "bg-indigo-700 text-white" : "border border-stone-300 bg-stone-50 text-stone-700"
              }`}
            >
              Night Review Queue ({dueCards.length} Due)
            </button>
            <button
              onClick={() => setMode("table")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                mode === "table" ? "bg-stone-900 text-white" : "border border-stone-300 bg-stone-50 text-stone-700"
              }`}
            >
              2-Column Registry ({errors.length})
            </button>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
            >
              <Plus className="h-3.5 w-3.5" />
              Log SFG / Mock Mistake
            </button>
          </div>
        </div>
      </div>

      {/* Add Manual Entry Form */}
      {showAdd && (
        <form onSubmit={handleAddManual} className="rounded-xl border border-amber-300 bg-amber-50/50 p-5 space-y-3">
          <h3 className="font-serif text-base font-bold text-stone-900">
            Add 2-Column Error Card (SFG / Vision Mock / PYQ)
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700">Syllabus Unit</label>
              <select
                value={syllabusCode}
                onChange={(e) => setSyllabusCode(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs"
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
              <label className="block text-xs font-semibold text-stone-700">Error Taxonomy</label>
              <select
                value={errorType}
                onChange={(e) => setErrorType(e.target.value as ErrorTaxonomy)}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs"
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
              <label className="block text-xs font-semibold text-stone-700">
                Left Column: Trigger Cue (Question / Distinction Prompt) *
              </label>
              <textarea
                required
                rows={3}
                value={triggerCue}
                onChange={(e) => setTriggerCue(e.target.value)}
                placeholder="e.g., WPA 1972 (2022 Amendment): How many Schedules now exist & what is Schedule IV?"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                Right Column: Exact Verified Fact / Distinction *
              </label>
              <textarea
                required
                rows={3}
                value={exactFact}
                onChange={(e) => setExactFact(e.target.value)}
                placeholder="e.g., Reduced from 6 to 4 schedules; Schedule IV lists CITES-listed specimens (not Vermin—Vermin schedule omitted)."
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white p-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700">Personal Trap / Why I Missed It</label>
              <input
                type="text"
                value={personalTrapNote}
                onChange={(e) => setPersonalTrapNote(e.target.value)}
                placeholder="e.g., Remembered pre-2022 6-schedule classification."
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700">Primary Source Citation</label>
              <input
                type="text"
                value={sourceCitation}
                onChange={(e) => setSourceCitation(e.target.value)}
                placeholder="e.g., Wild Life (Protection) Amendment Act, 2022"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white">
              Save to Day 1 Queue
            </button>
          </div>
        </form>
      )}

      {/* Mode 1: Block 4 Active Recall Flashcard Queue */}
      {mode === "review" ? (
        dueCards.length === 0 ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-8 text-center">
            <Check className="mx-auto h-8 w-8 text-emerald-600" />
            <h3 className="mt-2 font-serif text-lg font-bold text-stone-900">
              All Scheduled Error Cards Cleared for Today!
            </h3>
            <p className="mt-1 text-xs text-stone-600">
              Switch to the 2-Column Registry view to inspect upcoming Day 3 / Day 7 / Day 21 cards or log new mock errors.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {dueCards.map((card) => {
              const isRevealed = revealedId === card.id;
              return (
                <div key={card.id} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-900">
                        {STAGE_LABEL[card.sr_stage] || `Stage ${card.sr_stage}`}
                      </span>
                      <span className="rounded bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-700">
                        {card.syllabus_code}
                      </span>
                      <span className="rounded bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-800">
                        {card.error_type}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400">Due: {card.next_review_date}</span>
                  </div>

                  {/* Left Column: Trigger Cue */}
                  <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                      Trigger Cue (Recall Before Revealing)
                    </div>
                    <div className="mt-1 font-serif text-base font-semibold text-stone-900">
                      {card.trigger_cue}
                    </div>
                  </div>

                  {!isRevealed ? (
                    <button
                      onClick={() => setRevealedId(card.id)}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Reveal Exact Fact & Citation
                    </button>
                  ) : (
                    <div className="mt-3 space-y-3">
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                        <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                          Exact Verified Fact / Distinction
                        </div>
                        <p className="mt-1 text-sm text-stone-900">{card.exact_fact}</p>
                        {card.personal_trap_note && (
                          <p className="mt-2 text-xs italic text-stone-700">
                            Trap note: {card.personal_trap_note}
                          </p>
                        )}
                        {card.source_citation && (
                          <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-900">
                            <BookMarked className="h-3.5 w-3.5" />
                            Source: {card.source_citation}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleReviewOutcome(card.id, "recalled")}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Recalled Cleanly (Advance Cycle)
                        </button>
                        <button
                          onClick={() => handleReviewOutcome(card.id, "forgot")}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-100"
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
        /* Mode 2: 2-Column Error Registry Table */
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Layers className="h-4 w-4 text-stone-500" />
              Filter by Error Taxonomy:
            </div>
            <select
              value={taxonomyFilter}
              onChange={(e) => setTaxonomyFilter(e.target.value)}
              className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-1 text-xs font-medium"
            >
              <option value="ALL">All Error Types</option>
              <option value="Factual Blindspot">Factual Blindspot</option>
              <option value="Veteran Illusion">Veteran Illusion</option>
              <option value="50:50 Trap">50:50 Trap</option>
              <option value="Misread Correct/Incorrect">Misread Correct/Incorrect</option>
              <option value="Over-stretched Logic">Over-stretched Logic</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-600">
                  <th className="p-3 font-semibold">Left Column: Trigger Cue</th>
                  <th className="p-3 font-semibold">Right Column: Exact Fact & Source</th>
                  <th className="p-3 font-semibold">Taxonomy</th>
                  <th className="p-3 font-semibold">1-3-7-21 Cycle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredTable.map((e) => (
                  <tr key={e.id} className="align-top hover:bg-stone-50/70">
                    <td className="w-1/3 p-3 font-medium text-stone-900">
                      <div>{e.trigger_cue}</div>
                      <div className="mt-1 font-mono text-[10px] text-stone-500">
                        {e.syllabus_code} • {e.subject}
                      </div>
                    </td>
                    <td className="w-1/2 p-3 text-stone-700">
                      <div>{e.exact_fact}</div>
                      {e.personal_trap_note && (
                        <div className="mt-1 italic text-amber-900">Trap: {e.personal_trap_note}</div>
                      )}
                      {e.source_citation && (
                        <div className="mt-1 text-[11px] font-medium text-emerald-800">
                          Source: {e.source_citation}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="inline-block rounded bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-800">
                        {e.error_type}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          e.mastered ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {STAGE_LABEL[e.sr_stage] || `Stage ${e.sr_stage}`}
                      </span>
                      {!e.mastered && (
                        <div className="mt-1 text-[10px] text-stone-500">Next: {e.next_review_date}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
