"use client";

import React, { useState } from "react";
import { BookOpen, Search, Target, ArrowRight } from "lucide-react";
import { StageType, SyllabusNode } from "@/types";

interface SyllabusTabProps {
  syllabus: SyllabusNode[];
  onUpdateMastery: (code: string, masteryPct: number) => Promise<void>;
  onPracticePyq: (code: string) => void;
}

const PRIORITY_BADGES: Record<string, { label: string; className: string }> = {
  non_psir_bleeder: { label: "Non-PSIR Bleeder (15-20m Gap)", className: "bg-rose-100 text-rose-800" },
  veteran_trap: { label: "Mains Veteran Trap", className: "bg-amber-100 text-amber-900" },
  psir_bridge: { label: "PSIR Overlap / Bridge", className: "bg-sky-100 text-sky-800" },
  high_roi_mains: { label: "High-ROI Mains Target", className: "bg-purple-100 text-purple-900" },
  csat_insurance: { label: "CSAT Insurance", className: "bg-emerald-100 text-emerald-800" },
};

export default function SyllabusTab({ syllabus, onUpdateMastery, onPracticePyq }: SyllabusTabProps) {
  const [stageFilter, setStageFilter] = useState<StageType | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = syllabus.filter((node) => {
    if (stageFilter !== "ALL" && node.stage !== stageFilter && node.stage !== "BOTH") {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        node.code.toLowerCase().includes(q) ||
        node.topic.toLowerCase().includes(q) ||
        node.subtopics.toLowerCase().includes(q) ||
        node.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-900">
                <BookOpen className="h-4 w-4" />
              </div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Official UPSC CSE Syllabus Matrix
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-600">
              Rooted in the official UPSC syllabus tree, tagged with your personalized diagnosis: Non-PSIR Bleeders, Veteran Traps, and Mains Overlaps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search micro-topics, acts, terms..."
                className="rounded-full border border-stone-300 bg-[#F5F2EC] pl-9 pr-4 py-2 text-xs focus:border-amber-700 focus:bg-white focus:outline-none"
              />
            </div>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as StageType | "ALL")}
              className="rounded-full border border-stone-300 bg-[#F5F2EC] px-4 py-2 text-xs font-semibold text-stone-800 focus:outline-none"
            >
              <option value="ALL">All Stages (Prelims & Mains)</option>
              <option value="PRELIMS">Prelims GS-I & CSAT</option>
              <option value="MAINS">Mains GS 1–4, Essay & PSIR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((node) => {
          const badge = PRIORITY_BADGES[node.priority_tag] || {
            label: node.priority_tag,
            className: "bg-stone-100 text-stone-700",
          };

          return (
            <div key={node.code} className="flex flex-col justify-between rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-stone-900 px-3 py-0.5 font-mono text-[11px] font-bold text-white">
                      {node.code}
                    </span>
                    <span className="text-xs font-semibold text-stone-600">{node.paper}</span>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-base font-bold text-stone-900">{node.topic}</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">{node.subtopics}</p>

                <div className="mt-3.5 rounded-2xl border border-stone-100 bg-[#F5F2EC] p-3 text-[11px] text-stone-700">
                  <span className="font-bold text-stone-950">Recommended Source: </span>
                  {node.recommended_source}
                </div>
              </div>

              <div className="mt-4 border-t border-stone-100 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-700" />
                    <span className="text-xs font-bold text-stone-800">
                      Mastery: {Math.round(node.mastery_pct)}%
                    </span>
                  </div>
                  {node.target_mcqs > 0 && (
                    <span className="text-xs font-medium text-stone-500">
                      {node.completed_mcqs} / {node.target_mcqs} MCQs
                    </span>
                  )}
                </div>

                {/* Mastery Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={node.mastery_pct}
                  onChange={(e) => onUpdateMastery(node.code, Number(e.target.value))}
                  className="mt-2.5 w-full accent-amber-700"
                />

                {node.stage !== "MAINS" && (
                  <button
                    onClick={() => onPracticePyq(node.code)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100/70 px-4 py-1.5 text-xs font-bold text-amber-950 transition hover:bg-amber-200/80 active:scale-95"
                  >
                    Launch PYQ Dissection Widget <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
