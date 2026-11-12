"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarCheck2,
  BookCheck,
  BrainCircuit,
  ListTree,
  Compass,
  Settings,
  Shield,
} from "lucide-react";
import DailyTrackerTab from "@/components/DailyTrackerTab";
import PyqWidgetTab from "@/components/PyqWidgetTab";
import ErrorRegistryTab from "@/components/ErrorRegistryTab";
import SyllabusTab from "@/components/SyllabusTab";
import RoadmapTab from "@/components/RoadmapTab";
import SettingsModal from "@/components/SettingsModal";
import { DailyLogEntry, DailyTargetSuggestion, StudyPhaseInfo, SyllabusNode } from "@/types";

type TabId = "tracker" | "pyq" | "errors" | "syllabus" | "roadmap";

interface DashboardResponse {
  today: string;
  suggestion: DailyTargetSuggestion;
  dailyLog: DailyLogEntry;
  rollingLogs: DailyLogEntry[];
  syllabus: SyllabusNode[];
  phases: StudyPhaseInfo[];
  milestones: { label: string; date: string; detail: string }[];
  scorecard: { component: string; score2021: string; score2022: string; target2027: string; delta: string }[];
  stats: {
    dueErrors: number;
    totalErrors: number;
    totalPyqs: number;
    pyqAttempts: number;
    pyqCorrect: number;
    subjectAccuracy: { subject: string; attempts: number; correct: number }[];
    errorTaxonomyStats: { error_type: string; count: number }[];
  };
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("tracker");
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pyqInitialSyllabus, setPyqInitialSyllabus] = useState<string | undefined>(undefined);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("upsc_prep_gemini_key");
    if (saved) setGeminiApiKey(saved);
  }, []);

  const loadDashboard = async (dateStr = selectedDate) => {
    const res = await fetch(`/api/dashboard?date=${encodeURIComponent(dateStr)}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleUpdateDailyLog = async (patch: Partial<DailyLogEntry>) => {
    if (!data) return;
    await fetch("/api/daily-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ log_date: selectedDate, ...patch }),
    });
    await loadDashboard(selectedDate);
  };

  const handleUpdateSyllabusMastery = async (code: string, masteryPct: number) => {
    await fetch("/api/syllabus", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, mastery_pct: masteryPct }),
    });
    await loadDashboard(selectedDate);
  };

  const handleJumpToPyq = (syllabusCode: string) => {
    setPyqInitialSyllabus(syllabusCode);
    setActiveTab("pyq");
  };

  const handleSaveApiKey = (key: string) => {
    setGeminiApiKey(key);
    window.localStorage.setItem("upsc_prep_gemini_key", key);
  };

  const navItems: { id: TabId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "tracker", label: "Daily Tracker", icon: <CalendarCheck2 className="h-4 w-4" /> },
    {
      id: "pyq",
      label: "PYQ MCQ Widget",
      icon: <BookCheck className="h-4 w-4" />,
      badge: data?.stats.totalPyqs,
    },
    {
      id: "errors",
      label: "Error Registry",
      icon: <BrainCircuit className="h-4 w-4" />,
      badge: data?.stats.dueErrors,
    },
    { id: "syllabus", label: "UPSC Syllabus", icon: <ListTree className="h-4 w-4" /> },
    { id: "roadmap", label: "2027 Radar", icon: <Compass className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Top Command Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-amber-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-stone-900">
                Sankalp 2027 — UPSC CSE Prep OS
              </h1>
              <p className="text-[11px] text-stone-500">
                Serving Officer Protocol • PSIR Veteran (755 → 850+) • SQLite Local-First
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {data && (
              <div className="hidden rounded-lg border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700 md:block">
                PYQ Accuracy:{" "}
                <span className="font-bold text-stone-900">
                  {data.stats.pyqAttempts > 0
                    ? `${Math.round((data.stats.pyqCorrect / data.stats.pyqAttempts) * 100)}%`
                    : "—"}
                </span>{" "}
                ({data.stats.pyqCorrect}/{data.stats.pyqAttempts})
              </div>
            )}
            <button
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          {navItems.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {tab.icon}
                {tab.label}
                {typeof tab.badge === "number" && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? "bg-amber-400 text-stone-900" : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {loading || !data ? (
          <div className="rounded-xl border border-stone-200 bg-white p-12 text-center text-sm text-stone-500">
            Initializing SQLite database, UPSC syllabus matrix, and verified PYQs...
          </div>
        ) : (
          <>
            {activeTab === "tracker" && (
              <DailyTrackerTab
                suggestion={data.suggestion}
                dailyLog={data.dailyLog}
                rollingLogs={data.rollingLogs}
                syllabus={data.syllabus}
                dueErrorsCount={data.stats.dueErrors}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onUpdateLog={handleUpdateDailyLog}
                onJumpToPyq={handleJumpToPyq}
                onJumpToErrors={() => setActiveTab("errors")}
              />
            )}

            {activeTab === "pyq" && (
              <PyqWidgetTab
                initialSyllabusCode={pyqInitialSyllabus}
                syllabus={data.syllabus}
                geminiApiKey={geminiApiKey}
                onAttemptRecorded={() => loadDashboard(selectedDate)}
                onErrorLogged={() => loadDashboard(selectedDate)}
              />
            )}

            {activeTab === "errors" && (
              <ErrorRegistryTab
                syllabus={data.syllabus}
                onRegistryUpdated={() => loadDashboard(selectedDate)}
              />
            )}

            {activeTab === "syllabus" && (
              <SyllabusTab
                syllabus={data.syllabus}
                onUpdateMastery={handleUpdateSyllabusMastery}
                onPracticePyq={handleJumpToPyq}
              />
            )}

            {activeTab === "roadmap" && (
              <RoadmapTab
                phases={data.phases}
                milestones={data.milestones}
                scorecard={data.scorecard}
                stats={data.stats}
              />
            )}
          </>
        )}
      </main>

      <SettingsModal
        open={settingsOpen}
        apiKey={geminiApiKey}
        onSaveApiKey={handleSaveApiKey}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
