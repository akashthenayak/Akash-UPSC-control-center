"use client";

import React from "react";
import { Award, Calendar, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { StudyPhaseInfo } from "@/types";

interface RoadmapTabProps {
  phases: StudyPhaseInfo[];
  milestones: { label: string; date: string; detail: string }[];
  scorecard: { component: string; score2021: string; score2022: string; target2027: string; delta: string }[];
  stats: {
    pyqAttempts: number;
    pyqCorrect: number;
    subjectAccuracy: { subject: string; attempts: number; correct: number }[];
    errorTaxonomyStats: { error_type: string; count: number }[];
  };
}

const PAID_COURSE_STACK = [
  {
    stage: "Prelims Daily Discipline (Jan – Apr)",
    course: "ForumIAS SFG 2027 (Online)",
    rule: "Non-negotiable 7:00 AM 50-MCQ test. Forces line-by-line static memorization over 2022 intuition.",
  },
  {
    stage: "Non-PSIR Weak Zones (Jan – Apr)",
    course: "Sleepy Classes Prelims Crash / Vision Sandhan + PT 365",
    rule: "Use strictly for Environment, Mapping, S&T, Economy micro-terms, and Ancient/Medieval.",
  },
  {
    stage: "PSIR 264 → 290+ (Buy Late May)",
    course: "Shubhra Ranjan PSIR Crash + Test Series / NextIAS",
    rule: "Do NOT study until May 26 (only lunch IR op-eds Jan–May). Write 8 full tests during 2-month leave.",
  },
  {
    stage: "GS 376 → 435+ (Buy Late May)",
    course: "ForumIAS MGP+ (Post-Prelims Intensive)",
    rule: "Write 16–20 full-length 3-hour GS + Essay mocks during June–August 2-month leave.",
  },
];

function daysUntil(targetDateStr: string): number {
  const now = new Date();
  const target = new Date(`${targetDateStr}T09:30:00`);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function RoadmapTab({ phases, milestones, scorecard, stats }: RoadmapTabProps) {
  return (
    <div className="space-y-6">
      {/* Countdown Milestones */}
      <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-900">
            <Calendar className="h-4 w-4" />
          </div>
          <h2 className="font-serif text-xl font-bold text-stone-900">
            UPSC CSE 2027 Command Radar & Leave Windows
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => {
            const dLeft = daysUntil(m.date);
            return (
              <div key={m.label} className="rounded-2xl border border-stone-200/90 bg-[#F5F2EC] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-stone-500">{m.date}</span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-amber-900 shadow-xs">
                    {dLeft > 0 ? `${dLeft}d away` : "Active"}
                  </span>
                </div>
                <div className="mt-2 text-sm font-bold text-stone-900">{m.label}</div>
                <div className="mt-1 text-xs text-stone-600">{m.detail}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scorecard & Accuracy Audit */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Award className="h-4 w-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Mains Scorecard Diagnosis (755 → 850+)
            </h3>
          </div>
          <p className="mt-1 text-xs text-stone-500 leading-relaxed">
            PSIR jumped +29 simply by finishing 50 extra marks. Your Mains bottleneck is GS 1–4 (94/paper).
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F5F2EC] text-stone-600">
                  <th className="p-3 font-semibold rounded-l-xl">Component</th>
                  <th className="p-3 font-semibold">2021</th>
                  <th className="p-3 font-semibold">2022</th>
                  <th className="p-3 font-semibold">2027 Target</th>
                  <th className="p-3 font-semibold rounded-r-xl">Jump</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {scorecard.map((row) => (
                  <tr key={row.component} className="hover:bg-stone-50/70">
                    <td className="p-3 font-bold text-stone-900">{row.component}</td>
                    <td className="p-3 text-stone-600">{row.score2021}</td>
                    <td className="p-3 text-stone-600">{row.score2022}</td>
                    <td className="p-3 font-bold text-emerald-800">{row.target2027}</td>
                    <td className="p-3 font-bold text-amber-800">{row.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live PYQ Accuracy & Error Taxonomy Telemetry */}
        <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-900">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Prelims Telemetry (Polity/Econ ≥85% Check)
            </h3>
          </div>
          <p className="mt-1 text-xs text-stone-500 leading-relaxed">
            Live accuracy tracked from your SQLite PYQ attempts (spanning 2013–2026).
          </p>

          <div className="mt-4 space-y-2.5">
            {stats.subjectAccuracy.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 bg-[#F5F2EC] p-4 text-xs text-stone-500">
                Solve PYQs in the Practice Widget to populate live subject-wise accuracy telemetry.
              </div>
            ) : (
              stats.subjectAccuracy.map((sub) => {
                const pct = sub.attempts > 0 ? Math.round((sub.correct / sub.attempts) * 100) : 0;
                const isPolityOrEcon = sub.subject.includes("Polity") || sub.subject.includes("Economy");
                const meetsGoal = !isPolityOrEcon || pct >= 85;
                return (
                  <div key={sub.subject} className="rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">{sub.subject}</span>
                      <span className={`font-bold ${meetsGoal ? "text-emerald-700" : "text-rose-700"}`}>
                        {pct}% ({sub.correct}/{sub.attempts})
                        {isPolityOrEcon && (meetsGoal ? " ✓ Target Met" : " ⚠ Below 85% Goal")}
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            {stats.errorTaxonomyStats.length > 0 && (
              <div className="mt-4 border-t border-stone-100 pt-3">
                <div className="text-xs font-bold text-stone-700">Error Registry Breakdown</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {stats.errorTaxonomyStats.map((et) => (
                    <span
                      key={et.error_type}
                      className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-800"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {et.error_type}: {et.count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4-Phase Roadmap & Recommended Paid Courses */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)] space-y-3">
          <h3 className="font-serif text-lg font-bold text-stone-900">20-Week Prelims + 89-Day Mains Phases</h3>
          {phases.map((p) => (
            <div key={p.id} className="rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-stone-900">{p.name}</span>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-amber-900 shadow-xs">
                  {p.window}
                </span>
              </div>
              <div className="mt-1 text-xs font-bold text-indigo-900">{p.split}</div>
              <p className="mt-1 text-xs text-stone-700 leading-relaxed">{p.objective}</p>
              <p className="mt-1.5 text-[11px] italic text-stone-500">Rule: {p.key_rule}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)] space-y-3">
          <h3 className="font-serif text-lg font-bold text-stone-900">Veteran Paid Course Stack (Skip Foundation)</h3>
          {PAID_COURSE_STACK.map((item) => (
            <div key={item.course} className="rounded-2xl border border-stone-200/80 bg-[#F5F2EC] p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-stone-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                {item.stage}
              </div>
              <div className="mt-1.5 text-sm font-bold text-stone-900">{item.course}</div>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">{item.rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
