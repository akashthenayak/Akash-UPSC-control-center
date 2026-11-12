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
import {
  getLocalDashboard,
  saveLocalDailyLog,
  updateLocalSyllabusMastery,
} from "@/lib/storage";

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
  const [errorFilterDue, setErrorFilterDue] = useState<boolean>(true);
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

  // Sync URL search params and hash (e.g. ?tab=errors&filter=due or #night-review-queue)
  useEffect(() => {
    const parseUrlState = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabId | null;
      const filterParam = params.get("filter");
      const hash = window.location.hash;

      if (hash === "#night-review-queue" || (tabParam === "errors" && filterParam === "due")) {
        setActiveTab("errors");
        setErrorFilterDue(true);
      } else if (tabParam && ["tracker", "pyq", "errors", "syllabus", "roadmap"].includes(tabParam)) {
        setActiveTab(tabParam);
        if (tabParam === "errors" && filterParam === "all") {
          setErrorFilterDue(false);
        }
      }
    };

    parseUrlState();
    window.addEventListener("popstate", parseUrlState);
    return () => window.removeEventListener("popstate", parseUrlState);
  }, []);

  const loadDashboard = (dateStr = selectedDate) => {
    try {
      const localData = getLocalDashboard(dateStr);
      setData(localData as DashboardResponse);
      setLoading(false);
    } catch (err) {
      console.warn("Using network dashboard fallback:", err);
      fetch(`/api/dashboard?date=${encodeURIComponent(dateStr)}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    loadDashboard(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleUpdateDailyLog = async (patch: Partial<DailyLogEntry>) => {
    saveLocalDailyLog({ log_date: selectedDate, ...patch });
    loadDashboard(selectedDate);
    try {
      fetch("/api/daily-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ log_date: selectedDate, ...patch }),
      }).catch(() => {});
    } catch {}
  };

  const handleUpdateSyllabusMastery = async (code: string, masteryPct: number) => {
    updateLocalSyllabusMastery(code, masteryPct);
    loadDashboard(selectedDate);
    try {
      fetch("/api/syllabus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, mastery_pct: masteryPct }),
      }).catch(() => {});
    } catch {}
  };

  const handleJumpToPyq = (syllabusCode: string) => {
    setPyqInitialSyllabus(syllabusCode);
    setActiveTab("pyq");
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      if (tabId === "errors") {
        url.searchParams.set("filter", errorFilterDue ? "due" : "all");
      } else {
        url.searchParams.delete("filter");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  const handleJumpToNightReview = () => {
    setErrorFilterDue(true);
    setActiveTab("errors");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "errors");
      url.searchParams.set("filter", "due");
      window.history.pushState({}, "", url.toString());
    }
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
    <div className="min-h-screen bg-[#FBF8F5] text-[#1D1B16]">
      {/* Material 3 Expressive Top App Bar */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#FBF8F5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-amber-400 shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-stone-900">
                Sankalp 2027 — UPSC CSE Prep OS
              </h1>
              <p className="text-[11px] font-medium text-stone-500">
                Material 3 Expressive • Serving Officer Protocol • 2013–2026 PYQ Dissection Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {data && (
              <div className="hidden rounded-full border border-stone-300/80 bg-white px-3.5 py-1 text-xs font-medium text-stone-700 shadow-xs md:block">
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
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-semibold text-stone-700 shadow-xs transition hover:bg-stone-50 active:scale-95"
            >
              <Settings className="h-3.5 w-3.5 text-amber-800" />
              Settings
            </button>
          </div>
        </div>

        {/* Material 3 Expressive Navigation Segmented Pills */}
        <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 pb-2.5">
          {navItems.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  active
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-200/60 hover:text-stone-950"
                }`}
              >
                {tab.icon}
                {tab.label}
                {typeof tab.badge === "number" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                      active ? "bg-amber-400 text-stone-950" : "bg-stone-200 text-stone-700"
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

      {/* Main Content Container */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {loading || !data ? (
          <div className="rounded-[28px] border border-stone-200 bg-white p-12 text-center text-sm text-stone-500 shadow-sm">
            Initializing Material 3 Expressive OS, UPSC syllabus matrix, and 2013–2026 PYQs...
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
                onJumpToErrors={handleJumpToNightReview}
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
                initialDueOnly={errorFilterDue}
                onFilterChange={(dueOnly) => {
                  setErrorFilterDue(dueOnly);
                  if (typeof window !== "undefined") {
                    const url = new URL(window.location.href);
                    if (activeTab === "errors") {
                      url.searchParams.set("filter", dueOnly ? "due" : "all");
                      window.history.replaceState({}, "", url.toString());
                    }
                  }
                }}
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
