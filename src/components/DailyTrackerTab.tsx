"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ArrowRight,
  Save,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";
import { DailyLogEntry, DailyTargetSuggestion, SyllabusNode } from "@/types";

interface DailyTrackerTabProps {
  suggestion: DailyTargetSuggestion;
  dailyLog: DailyLogEntry;
  rollingLogs: DailyLogEntry[];
  syllabus: SyllabusNode[];
  dueErrorsCount: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onUpdateLog: (patch: Partial<DailyLogEntry>) => Promise<void>;
  onJumpToPyq: (syllabusCode: string) => void;
  onJumpToErrors: () => void;
}

const CATEGORY_BADGE: Record<string, { label: string; className: string }> = {
  static: { label: "Active Recall", className: "bg-slate-100 text-slate-700 border-slate-200" },
  mcq_test: { label: "Testing Effect", className: "bg-amber-50 text-amber-800 border-amber-200" },
  office_pocket: { label: "Office Pocket", className: "bg-sky-50 text-sky-800 border-sky-200" },
  fitness: { label: "Cortisol Reset", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  weak_pillar: { label: "Bleeder Attack", className: "bg-rose-50 text-rose-800 border-rose-200" },
  spouse: { label: "Protected Time", className: "bg-pink-50 text-pink-800 border-pink-200" },
  error_review: { label: "1-3-7-21 Review", className: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  mock: { label: "Exam Simulation", className: "bg-purple-50 text-purple-800 border-purple-200" },
};

export default function DailyTrackerTab({
  suggestion,
  dailyLog,
  rollingLogs,
  syllabus,
  dueErrorsCount,
  selectedDate,
  onDateChange,
  onUpdateLog,
  onJumpToPyq,
  onJumpToErrors,
}: DailyTrackerTabProps) {
  const [spilloverNote, setSpilloverNote] = useState(dailyLog.office_spillover_note || "");
  const [savingNote, setSavingNote] = useState(false);

  const toggleSlot = async (slotId: string) => {
    const exists = dailyLog.completed_slots.includes(slotId);
    const updated = exists
      ? dailyLog.completed_slots.filter((s) => s !== slotId)
      : [...dailyLog.completed_slots, slotId];
    await onUpdateLog({ completed_slots: updated });
  };

  const adjustCounter = async (field: "mcqs_solved" | "mcqs_correct" | "pyqs_dissected", delta: number) => {
    const nextVal = Math.max(0, (dailyLog[field] || 0) + delta);
    await onUpdateLog({ [field]: nextVal });
  };

  const handleSaveNote = async () => {
    setSavingNote(true);
    await onUpdateLog({ office_spillover_note: spilloverNote });
    setSavingNote(false);
  };

  const suggestedNodes = syllabus.filter((n) => suggestion.suggested_syllabus_codes.includes(n.code));
  const completedCount = dailyLog.completed_slots.length;
  const totalSlots = suggestion.slots.length;
  const completionPct = totalSlots > 0 ? Math.round((completedCount / totalSlots) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Phase & Day Banner */}
      <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-semibold text-amber-950">
                <Sparkles className="h-3.5 w-3.5" />
                {suggestion.phase_name}
              </span>
              <span className="rounded-full border border-stone-200 bg-[#F5F2EC] px-3.5 py-1 text-xs font-medium text-stone-700 capitalize">
                {suggestion.day_type} Protocol • {suggestion.phase_split}
              </span>
            </div>
            <h2 className="mt-2 font-serif text-xl font-bold text-stone-900">
              Today&apos;s Focus: {suggestion.focus_pillars.join(" + ")}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-stone-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="rounded-full border border-stone-300 bg-[#F5F2EC] px-4 py-1.5 text-xs font-semibold text-stone-800 focus:border-amber-700 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Daily Output KPI Bar in Material 3 Tonal Containers */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-3.5">
            <div className="text-xs font-medium text-stone-500">Routine Adherence</div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-bold tabular-nums text-stone-900">
                {completedCount}/{totalSlots}
              </span>
              <span className="text-xs font-bold text-emerald-800">{completionPct}%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-3.5">
            <div className="text-xs font-medium text-stone-500">MCQs Solved (Target {suggestion.daily_mcq_target})</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-bold tabular-nums text-stone-900">{dailyLog.mcqs_solved}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => adjustCounter("mcqs_solved", -5)}
                  className="rounded-full border border-stone-300 bg-white px-2 py-0.5 text-xs hover:bg-stone-100"
                >
                  -5
                </button>
                <button
                  onClick={() => adjustCounter("mcqs_solved", 10)}
                  className="rounded-full border border-stone-300 bg-white px-2 py-0.5 text-xs font-bold hover:bg-stone-100"
                >
                  +10
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-3.5">
            <div className="text-xs font-medium text-stone-500">PYQs Dissected (Target {suggestion.daily_pyq_target})</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-bold tabular-nums text-stone-900">{dailyLog.pyqs_dissected}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => adjustCounter("pyqs_dissected", -1)}
                  className="rounded-full border border-stone-300 bg-white px-2 py-0.5 text-xs hover:bg-stone-100"
                >
                  -1
                </button>
                <button
                  onClick={() => adjustCounter("pyqs_dissected", 5)}
                  className="rounded-full border border-stone-300 bg-white px-2 py-0.5 text-xs font-bold hover:bg-stone-100"
                >
                  +5
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onJumpToErrors}
            className="rounded-2xl border border-indigo-200/80 bg-[#E0E7FF]/70 p-3.5 text-left transition hover:bg-[#E0E7FF] active:scale-95"
          >
            <div className="text-xs font-medium text-[#1E1B4B]">1-3-7-21 Errors Due</div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-bold tabular-nums text-[#1E1B4B]">{dueErrorsCount}</span>
              <span className="text-xs font-bold text-[#3730A3]">Review at 9:30 PM →</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Two-Column Grid: Routine Timeline + Syllabus Anchors */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Time-Blocked Routine */}
        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Time-Blocked Daily Architecture
            </h3>
            <span className="text-xs text-stone-500">Office: 9:30 AM – 6:00 PM • Sleep: 10:00 PM</span>
          </div>

          {suggestion.slots.map((slot) => {
            const done = dailyLog.completed_slots.includes(slot.id);
            const badge = CATEGORY_BADGE[slot.category] || CATEGORY_BADGE.static;

            return (
              <div
                key={slot.id}
                onClick={() => toggleSlot(slot.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 active:scale-[0.99] ${
                  done
                    ? "border-emerald-300 bg-emerald-50/50"
                    : slot.is_protected
                    ? "border-rose-200/90 bg-white hover:border-rose-300 shadow-xs"
                    : "border-stone-200/90 bg-white hover:border-amber-400 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-stone-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                        <Clock className="h-3.5 w-3.5" />
                        {slot.time_window} ({slot.duration_min}m)
                      </span>
                      <span className={`rounded-full border px-3 py-0.5 text-[11px] font-semibold ${badge.className}`}>
                        {slot.is_protected && <ShieldCheck className="mr-1 inline h-3 w-3" />}
                        {badge.label}
                      </span>
                    </div>
                    <h4
                      className={`mt-1 text-base font-semibold ${
                        done ? "text-stone-500 line-through" : "text-stone-900"
                      }`}
                    >
                      {slot.title}
                    </h4>
                    <p className="mt-1 text-sm text-stone-600 leading-relaxed">{slot.description}</p>
                    <p className="mt-1.5 text-xs italic text-stone-500">Why: {slot.scientific_reason}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Syllabus-Rooted Daily Targets & 14-Day Spillover */}
        <div className="space-y-5">
          <div className="rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-700" />
              <h3 className="font-serif text-base font-bold text-stone-900">
                Syllabus-Rooted Today
              </h3>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Auto-selected from UPSC CSE GS-I rotation to pair static precision with non-PSIR bleeders.
            </p>

            <div className="mt-3.5 space-y-3">
              {suggestedNodes.map((node) => (
                <div key={node.code} className="rounded-2xl border border-stone-200 bg-[#F5F2EC] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold text-stone-800 shadow-xs">
                      {node.code}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        node.priority_tag === "non_psir_bleeder"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {node.priority_tag === "non_psir_bleeder" ? "Non-PSIR Bleeder" : "Veteran Verification"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-stone-900">{node.topic}</div>
                  <div className="mt-1 text-xs text-stone-600">{node.subtopics}</div>
                  <div className="mt-2 text-[11px] font-medium text-amber-900">Source: {node.recommended_source}</div>
                  <button
                    onClick={() => onJumpToPyq(node.code)}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950"
                  >
                    Practice PYQs for this syllabus unit <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Office Spillover / 14-Day Rolling Continuity */}
          <div className="rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-stone-900">
                14-Day Rolling Spillover Note
              </h3>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Urgent office file or late inspection? Log displaced targets here to clear during Saturday 6–10 AM consolidation.
            </p>
            <textarea
              rows={3}
              value={spilloverNote}
              onChange={(e) => setSpilloverNote(e.target.value)}
              placeholder="e.g., Missed evening Env block due to urgent file; move WPA 2022 schedules to Saturday 6 AM..."
              className="mt-2.5 w-full rounded-2xl border border-stone-300 bg-[#F5F2EC] p-3 text-xs text-stone-800 focus:border-amber-700 focus:bg-white focus:outline-none"
            />
            <button
              onClick={handleSaveNote}
              disabled={savingNote}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-stone-800 active:scale-95 disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {savingNote ? "Saving..." : "Save Spillover Note"}
            </button>

            <div className="mt-4 border-t border-stone-100 pt-3">
              <div className="text-xs font-semibold text-stone-700">Recent Rolling Logs</div>
              <div className="mt-2 space-y-1.5">
                {rollingLogs.slice(0, 5).map((log) => (
                  <div key={log.log_date} className="flex items-center justify-between text-xs text-stone-600">
                    <span className="font-mono">{log.log_date}</span>
                    <span>
                      {log.completed_slots.length} blocks • {log.mcqs_solved} MCQs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
