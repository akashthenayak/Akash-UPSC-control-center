"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  BookMarked,
  ShieldAlert,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Upload,
  ExternalLink,
  PlusCircle,
  Save,
  Check,
  Filter,
  Calendar,
  Layers,
  Sparkle,
} from "lucide-react";
import { ErrorTaxonomy, PyqQuestion, SyllabusNode } from "@/types";
import {
  getAllPyqs,
  getLoggedPyqIds,
  markPyqAsLogged,
  recordLocalPyqAttempt,
  saveLocalCustomPyqs,
  saveLocalError,
  saveLocalTrickNote,
} from "@/lib/storage";

interface PyqWithAttempt extends PyqQuestion {
  last_attempt?: {
    selected_option: "A" | "B" | "C" | "D";
    confidence: string;
    is_correct: boolean;
    attempted_at: string;
  } | null;
}

interface PyqWidgetTabProps {
  initialSyllabusCode?: string;
  syllabus: SyllabusNode[];
  geminiApiKey: string;
  onAttemptRecorded: () => void;
  onErrorLogged: () => void;
}

export const PYQ_YEARS = [
  2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
];

const SAMPLE_IMPORT_JSON = `[
  {
    "year": 2024,
    "paper": "GS Paper I",
    "subject": "Polity & Governance",
    "syllabus_code": "PRE-GS1-POL-CON",
    "question_style": "standard",
    "stem": "With reference to the Constitution of India, consider the following...",
    "options": { "A": "1 only", "B": "2 only", "C": "Both 1 and 2", "D": "Neither 1 nor 2" },
    "official_answer": "C",
    "key_status": "Official UPSC CSE 2024 Answer Key",
    "explanation": "Verified under Article ...",
    "fact_breakdown": [
      { "label": "Statement 1", "status": "true", "detail": "Direct text from Bare Act" }
    ],
    "trap_type": "Bare Act Qualifier",
    "trap_analysis": "Watch for subtle changes in wording.",
    "citations": [
      { "title": "Constitution of India", "reference": "Article 355" }
    ]
  }
]`;

export default function PyqWidgetTab({
  initialSyllabusCode,
  syllabus,
  geminiApiKey,
  onAttemptRecorded,
  onErrorLogged,
}: PyqWidgetTabProps) {
  const [questions, setQuestions] = useState<PyqWithAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("ALL");
  const [syllabusFilter, setSyllabusFilter] = useState(initialSyllabusCode || "ALL");
  const [yearFilter, setYearFilter] = useState("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Interactive MCQ state
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [confidence, setConfidence] = useState<"sure_shot" | "fifty_fifty" | "wild_guess">("sure_shot");
  const [submitted, setSubmitted] = useState(false);
  const [trickNote, setTrickNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  // Optional Gemini dissection
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Send to Error Registry state
  const [errorLoggedMsg, setErrorLoggedMsg] = useState<string | null>(null);
  const [selectedErrorType, setSelectedErrorType] = useState<ErrorTaxonomy>("Factual Blindspot");
  const [isLoggingError, setIsLoggingError] = useState(false);
  const [loggedPyqIds, setLoggedPyqIds] = useState<number[]>([]);

  useEffect(() => {
    setLoggedPyqIds(getLoggedPyqIds());
  }, []);

  // Bulk Import Modal
  const [showImport, setShowImport] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    if (initialSyllabusCode) {
      setSyllabusFilter(initialSyllabusCode);
      setYearFilter("ALL");
      const matched = syllabus.find((s) => s.code === initialSyllabusCode);
      if (matched) {
        setSubjectFilter(matched.subject);
      }
    }
  }, [initialSyllabusCode, syllabus]);

  // Dynamic syllabus unit filtering based on currently selected subject
  const availableSyllabusUnits = syllabus.filter((s) => {
    if (s.stage === "MAINS") return false;
    if (subjectFilter !== "ALL" && s.subject !== subjectFilter) return false;
    return true;
  });

  const handleSubjectChange = (newSubject: string) => {
    setSubjectFilter(newSubject);
    if (newSubject !== "ALL") {
      // If current syllabus unit doesn't belong to this subject, reset to ALL
      const stillValid = syllabus.some(
        (s) => s.code === syllabusFilter && s.subject === newSubject && s.stage !== "MAINS"
      );
      if (!stillValid) {
        setSyllabusFilter("ALL");
      }
    }
  };

  const handleSyllabusChange = (newCode: string) => {
    setSyllabusFilter(newCode);
    setYearFilter("ALL"); // Synchronize to query and display matching questions across all years
    if (newCode !== "ALL") {
      const matched = syllabus.find((s) => s.code === newCode);
      if (matched) {
        setSubjectFilter(matched.subject);
      }
    }
  };

  const fetchPyqs = async () => {
    setLoading(true);
    try {
      const localResults = getAllPyqs({
        subject: subjectFilter,
        syllabus_code: syllabusFilter,
        year: yearFilter,
      });
      setQuestions(localResults);
      setCurrentIndex(0);
      setLoading(false);
    } catch (err) {
      console.warn("Using network fallback:", err);
      const params = new URLSearchParams();
      if (subjectFilter !== "ALL") params.set("subject", subjectFilter);
      if (syllabusFilter !== "ALL") params.set("syllabus_code", syllabusFilter);
      if (yearFilter !== "ALL") params.set("year", yearFilter);

      const res = await fetch(`/api/pyqs?${params.toString()}`);
      const data = await res.json();
      setQuestions(data.questions || []);
      setCurrentIndex(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPyqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectFilter, syllabusFilter, yearFilter]);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ) {
      setSelectedOption(null);
      setSubmitted(false);
      setTrickNote(currentQ.user_trick_note || "");
      setAiAnalysis(null);
      setAiError(null);
      setNoteSaved(false);
      const isAlreadyInLocal = getLoggedPyqIds().includes(currentQ.id);
      if (isAlreadyInLocal) {
        setErrorLoggedMsg("Already recorded in your local Error Registry.");
      } else {
        setErrorLoggedMsg(null);
      }
    }
  }, [currentQ?.id]);

  const handleSubmitAnswer = async () => {
    if (!currentQ || !selectedOption) return;
    setSubmitted(true);

    recordLocalPyqAttempt({
      pyq_id: currentQ.id,
      selected_option: selectedOption,
      confidence,
      personal_note: trickNote,
    });

    onAttemptRecorded();

    try {
      fetch("/api/pyqs/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pyq_id: currentQ.id,
          selected_option: selectedOption,
          confidence,
          personal_note: trickNote,
        }),
      }).catch(() => {});
    } catch {}
  };

  const handleSaveTrickNote = async () => {
    if (!currentQ) return;
    setSavingNote(true);
    saveLocalTrickNote(currentQ.id, trickNote);
    setSavingNote(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);

    try {
      fetch("/api/pyqs/attempt", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pyq_id: currentQ.id, user_trick_note: trickNote }),
      }).catch(() => {});
    } catch {}
  };

  const handleLogToErrorRegistry = async () => {
    if (!currentQ) return;
    setIsLoggingError(true);
    const primaryCitation =
      currentQ.citations.length > 0
        ? `${currentQ.citations[0].title} (${currentQ.citations[0].reference})`
        : currentQ.key_status;

    const personalNote =
      trickNote.trim() ||
      `Marked (${selectedOption || "?"}) instead of official (${currentQ.official_answer}). ${currentQ.trap_analysis}`;

    const payload = {
      pyq_id: currentQ.id,
      syllabus_code: currentQ.syllabus_code,
      subject: currentQ.subject,
      trigger_cue: `${currentQ.year} PYQ: ${currentQ.trap_type}`,
      exact_fact: currentQ.explanation,
      personal_trap_note: personalNote,
      error_type: selectedErrorType,
      source_citation: primaryCitation,
    };

    // 1. Immediately persist to Browser LocalStorage
    saveLocalError(payload);
    markPyqAsLogged(currentQ.id);
    setLoggedPyqIds((prev) => (prev.includes(currentQ.id) ? prev : [...prev, currentQ.id]));

    // 2. Persist to Server SQLite
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
        }
      }
    } catch (err) {
      console.warn("SQLite sync delayed, saved to localStorage:", err);
    } finally {
      setIsLoggingError(false);
      setErrorLoggedMsg("Saved to Local Storage & 1–3–7–21 Error Registry (Scheduled for Day 1 review).");
      onErrorLogged();
    }
  };

  const handleGeminiDissect = async () => {
    if (!currentQ) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai/dissect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pyq_id: currentQ.id,
          question: currentQ,
          user_mistake: selectedOption
            ? `User picked ${selectedOption} (${confidence}). Note: ${trickNote}`
            : trickNote,
          api_key: geminiApiKey,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error || "Gemini dissection failed");
      } else {
        setAiAnalysis(data.analysis);
      }
    } catch {
      setAiError("Network error calling /api/ai/dissect");
    } finally {
      setAiLoading(false);
    }
  };

  const handleBulkImport = async () => {
    setImportStatus(null);
    try {
      const parsed = JSON.parse(importJson);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      saveLocalCustomPyqs(items);
      setImportStatus(`Imported ${items.length} verified PYQ(s) into Browser Storage.`);
      setImportJson("");
      fetchPyqs();
      onAttemptRecorded();

      try {
        fetch("/api/pyqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(items),
        }).catch(() => {});
      } catch {}
    } catch {
      setImportStatus("Invalid JSON format. Check brackets and quotes.");
    }
  };

  const subjects = Array.from(new Set(syllabus.filter((s) => s.stage !== "MAINS").map((s) => s.subject)));
  const isAlreadyLogged = currentQ ? loggedPyqIds.includes(currentQ.id) : false;

  return (
    <div className="space-y-6">
      {/* Material 3 Expressive Filter Card */}
      <div className="rounded-[28px] border border-stone-200/80 bg-[#F5F2EC] p-5 shadow-[0_1px_3px_1px_rgba(0,0,0,0.06)] transition-all">
        {/* Top Header of Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-900">
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                PYQ Dissection Explorer
              </h3>
              <p className="text-[11px] text-stone-500">
                Filtering dynamically from 2013 to 2026 across verified UPSC CSE papers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm">
              {questions.length > 0 ? `${currentIndex + 1} of ${questions.length} Questions` : "0 Questions"}
            </span>
            <button
              onClick={() => setShowImport(!showImport)}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50 active:scale-95"
            >
              <Upload className="h-3.5 w-3.5 text-amber-700" />
              Import Pack
            </button>
          </div>
        </div>

        {/* Dynamic Subject Filter Chips (M3 Expressive Filter Chips) */}
        <div className="mt-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Filter by Subject:
          </label>
          <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => handleSubjectChange("ALL")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                subjectFilter === "ALL"
                  ? "bg-amber-900 text-white shadow-sm ring-1 ring-amber-950"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              {subjectFilter === "ALL" && <Check className="h-3.5 w-3.5" />}
              All Subjects
            </button>
            {subjects.map((sub) => {
              const active = subjectFilter === sub;
              return (
                <button
                  key={sub}
                  onClick={() => handleSubjectChange(sub)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-amber-900 text-white shadow-sm ring-1 ring-amber-950"
                      : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Second Row: Dynamic Syllabus Units Dropdown + 2013-2026 Year Selector */}
        <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Dynamic Syllabus Dropdown */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-2.5 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-500">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-amber-700" />
                Syllabus Unit ({availableSyllabusUnits.length} in {subjectFilter === "ALL" ? "All Subjects" : subjectFilter})
              </span>
              {syllabusFilter !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleSyllabusChange("ALL")}
                  className="text-amber-800 hover:text-amber-950 font-semibold normal-case"
                >
                  Clear unit
                </button>
              )}
            </div>
            <select
              value={syllabusFilter}
              onChange={(e) => handleSyllabusChange(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-medium text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none"
            >
              <option value="ALL">
                {subjectFilter === "ALL"
                  ? `All Syllabus Units (${availableSyllabusUnits.length} units)`
                  : `All Units in ${subjectFilter} (${availableSyllabusUnits.length} units)`}
              </option>
              {availableSyllabusUnits.map((s) => (
                <option key={s.code} value={s.code}>
                  [{s.code}] {s.topic}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown spanning 2013 till 2026 */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-2.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              <Calendar className="h-3.5 w-3.5 text-amber-700" />
              UPSC CSE Year (2013 – 2026)
            </div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-medium text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none"
            >
              <option value="ALL">All Years (2013 – 2026)</option>
              {PYQ_YEARS.map((y) => (
                <option key={y} value={String(y)}>
                  {y} {y >= 2025 ? "(High-Yield Simulation)" : `UPSC CSE Prelims`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Year Pill Strip */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-semibold text-stone-500 mr-1 whitespace-nowrap">Quick Year:</span>
          {PYQ_YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(String(y))}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-all ${
                yearFilter === String(y)
                  ? "bg-stone-900 font-bold text-white shadow-sm"
                  : "bg-white text-stone-700 hover:bg-stone-200/80"
              }`}
            >
              {y}
            </button>
          ))}
          {yearFilter !== "ALL" && (
            <button
              onClick={() => setYearFilter("ALL")}
              className="text-[11px] text-amber-800 underline ml-1 hover:text-amber-950 whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>

        {/* Active Filter Synchronization Feedback Bar */}
        {(syllabusFilter !== "ALL" || subjectFilter !== "ALL" || yearFilter !== "ALL") && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-300/80 bg-amber-50/70 px-4 py-2 text-xs text-amber-950">
            <div className="flex flex-wrap items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-800 flex-shrink-0" />
              <span className="font-medium text-stone-700">Filter Scope:</span>
              {syllabusFilter !== "ALL" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/90 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-950">
                  <Layers className="h-3 w-3" />
                  {syllabusFilter}
                </span>
              ) : null}
              {subjectFilter !== "ALL" && (
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-950">
                  {subjectFilter}
                </span>
              )}
              <span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-[11px] font-semibold text-stone-800">
                {yearFilter === "ALL" ? "All Years (2013–2026)" : `Year ${yearFilter}`}
              </span>
              <span className="font-semibold text-stone-900">
                — {questions.length} matching {questions.length === 1 ? "question" : "questions"} found
              </span>
            </div>
            <button
              onClick={() => {
                setSubjectFilter("ALL");
                handleSyllabusChange("ALL");
              }}
              className="text-xs font-semibold text-amber-900 underline hover:text-amber-950 whitespace-nowrap"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Bulk JSON Importer Modal / Drawer */}
      {showImport && (
        <div className="rounded-[28px] border border-amber-300 bg-amber-50/70 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-base font-bold text-stone-900">
              Bulk Import Verified UPSC PYQs (JSON)
            </h4>
            <button
              onClick={() => setImportJson(SAMPLE_IMPORT_JSON)}
              className="text-xs font-semibold text-amber-800 underline"
            >
              Load Sample Schema
            </button>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Paste an array of PYQ objects with official answer keys and citations to expand your local browser storage bank.
          </p>
          <textarea
            rows={5}
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder="Paste JSON array here..."
            className="mt-2.5 w-full rounded-2xl border border-stone-300 bg-white p-3 font-mono text-xs text-stone-800 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-stone-700">{importStatus || ""}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowImport(false)}
                className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-stone-700"
              >
                Close
              </button>
              <button
                onClick={handleBulkImport}
                className="rounded-full bg-stone-900 px-5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-stone-800"
              >
                Import to Browser Storage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main MCQ Card in Material 3 Expressive */}
      {loading ? (
        <div className="rounded-[28px] border border-stone-200 bg-white p-12 text-center text-sm text-stone-500 shadow-sm">
          Loading UPSC CSE questions...
        </div>
      ) : !currentQ ? (
        <div className="rounded-[28px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-stone-700">
            No PYQs match the filter: <b>{subjectFilter}</b> • <b>{syllabusFilter}</b> • Year: <b>{yearFilter}</b>
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Try resetting your filters or selecting &apos;All Years&apos; to view all questions from 2013 to 2026.
          </p>
          <button
            onClick={() => {
              setSubjectFilter("ALL");
              setSyllabusFilter("ALL");
              setYearFilter("ALL");
            }}
            className="mt-4 rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-stone-800"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="rounded-[28px] border border-stone-200/90 bg-white p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {/* Header Metadata Chips / Interactive Synchronized Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setYearFilter(String(currentQ.year))}
                title={`Filter by Year: ${currentQ.year}`}
                className="rounded-full bg-stone-900 px-3.5 py-1 text-xs font-bold text-white shadow-sm transition hover:bg-stone-800 active:scale-95 cursor-pointer"
              >
                UPSC CSE {currentQ.year}
              </button>
              <button
                type="button"
                onClick={() => handleSubjectChange(currentQ.subject)}
                title={`Filter by Subject: ${currentQ.subject}`}
                className="rounded-full bg-[#E0E7FF] px-3 py-1 text-xs font-semibold text-[#1E1B4B] transition hover:bg-indigo-100 active:scale-95 cursor-pointer"
              >
                {currentQ.subject}
              </button>
              <button
                type="button"
                onClick={() => handleSyllabusChange(currentQ.syllabus_code)}
                title={`Filter across all years by Syllabus: ${currentQ.syllabus_code}`}
                className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-3 py-1 font-mono text-[11px] font-bold text-[#78350F] transition hover:bg-amber-200 active:scale-95 cursor-pointer ring-1 ring-amber-400/40"
              >
                <Layers className="h-3 w-3 text-amber-800" />
                {currentQ.syllabus_code}
              </button>
              {currentQ.syllabus_topic && (
                <span className="hidden sm:inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] font-medium text-stone-700">
                  {currentQ.syllabus_topic}
                </span>
              )}
              {currentQ.syllabus_priority_tag === "non_psir_bleeder" && (
                <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-bold text-rose-800">
                  Non-PSIR Bleeder
                </span>
              )}
              {currentQ.syllabus_priority_tag === "veteran_trap" && (
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-bold text-indigo-800">
                  Veteran Verification
                </span>
              )}
              {currentQ.question_style === "pair_counting" && (
                <span className="rounded-full bg-[#FFE4E6] px-3 py-1 text-[11px] font-bold text-[#881337]">
                  Post-2022 Pair Trap
                </span>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-stone-50 text-stone-700 transition hover:bg-stone-100 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 font-mono text-xs font-semibold text-stone-600">
                {currentIndex + 1} / {questions.length}
              </span>
              <button
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex >= questions.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-stone-50 text-stone-700 transition hover:bg-stone-100 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stem */}
          <div className="mt-5 whitespace-pre-line font-serif text-lg leading-relaxed text-stone-900">
            {currentQ.stem}
          </div>

          {/* Confidence Tagging Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Guessing Calibration:
            </span>
            {(
              [
                { id: "sure_shot", label: "Sure Shot (100%)" },
                { id: "fifty_fifty", label: "50:50 Educated Guess" },
                { id: "wild_guess", label: "Blind / Risk Guess" },
              ] as const
            ).map((tag) => (
              <button
                key={tag.id}
                disabled={submitted}
                onClick={() => setConfidence(tag.id)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                  confidence === tag.id
                    ? "bg-amber-100 text-amber-950 ring-2 ring-amber-600/50"
                    : "border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Options A-D with Material 3 Expressive Tonal Cards */}
          <div className="mt-5 space-y-3">
            {(["A", "B", "C", "D"] as const).map((optKey) => {
              const isSelected = selectedOption === optKey;
              const isOfficial = currentQ.official_answer === optKey;

              let optionClass = "border-stone-200/90 bg-white hover:border-amber-600 hover:bg-amber-50/20";
              let badgeClass = "border-stone-300 bg-stone-100 text-stone-800";

              if (submitted) {
                if (isOfficial) {
                  optionClass = "border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500";
                  badgeClass = "bg-emerald-600 text-white border-emerald-600";
                } else if (isSelected && !isOfficial) {
                  optionClass = "border-rose-400 bg-rose-50/80 text-rose-950 ring-1 ring-rose-400";
                  badgeClass = "bg-rose-600 text-white border-rose-600";
                } else {
                  optionClass = "border-stone-200 bg-stone-50/40 opacity-60";
                }
              } else if (isSelected) {
                optionClass = "border-amber-700 bg-amber-50 text-amber-950 ring-2 ring-amber-600/30";
                badgeClass = "bg-amber-800 text-white border-amber-800";
              }

              return (
                <button
                  key={optKey}
                  disabled={submitted}
                  onClick={() => setSelectedOption(optKey)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.99] ${optionClass}`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all ${badgeClass}`}
                    >
                      {optKey}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{currentQ.options[optKey]}</span>
                  </div>
                  {submitted && isOfficial && (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-700" />
                  )}
                  {submitted && isSelected && !isOfficial && (
                    <XCircle className="h-5 w-5 flex-shrink-0 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submission Bar */}
          {!submitted && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-stone-500">
                {currentQ.last_attempt
                  ? `Previous attempt: Choice ${currentQ.last_attempt.selected_option} (${
                      currentQ.last_attempt.is_correct ? "Correct" : "Wrong"
                    })`
                  : "Not yet attempted in this session"}
              </span>
              <button
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
                className="rounded-full bg-stone-900 px-7 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-stone-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verify Official UPSC Key
              </button>
            </div>
          )}

          {/* Post-Submission Explanations, Fact Breakdown, Traps & Citations */}
          {submitted && (
            <div className="mt-7 space-y-5 border-t border-stone-200 pt-6">
              {/* Verdict Banner */}
              <div
                className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center ${
                  selectedOption === currentQ.official_answer
                    ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                    : "border-rose-300 bg-rose-50 text-rose-950"
                }`}
              >
                <div>
                  <div className="text-base font-bold">
                    {selectedOption === currentQ.official_answer
                      ? `Correct (+2.00 marks) — Official Key: Option ${currentQ.official_answer}`
                      : `Incorrect (-0.66 marks) — You chose Option ${selectedOption}, Official Key: Option ${currentQ.official_answer}`}
                  </div>
                  <div className="mt-0.5 text-xs opacity-80">
                    Source: <span className="font-semibold">{currentQ.key_status}</span>
                  </div>
                </div>
                <span className="self-start rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-800 shadow-sm sm:self-auto">
                  Confidence: {confidence.replace("_", " ")}
                </span>
              </div>

              {/* Official Key Explanation & Fact Breakdown */}
              <div className="rounded-2xl border border-stone-200 bg-[#F5F2EC] p-5">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Official Key Explanation & Fact Verification
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-800">{currentQ.explanation}</p>

                {currentQ.fact_breakdown.length > 0 && (
                  <div className="mt-3.5 space-y-2">
                    {currentQ.fact_breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-white p-3 shadow-xs"
                      >
                        <span
                          className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            item.status === "true"
                              ? "bg-emerald-100 text-emerald-900"
                              : item.status === "false"
                              ? "bg-rose-100 text-rose-900"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {item.status}
                        </span>
                        <div className="text-xs text-stone-800">
                          <span className="font-semibold text-stone-950">{item.label}: </span>
                          {item.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trap Dissection */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-900" />
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    UPSC Trap Dissection: {currentQ.trap_type}
                  </h4>
                </div>
                <p className="mt-2 text-sm text-stone-800 leading-relaxed">{currentQ.trap_analysis}</p>

                <div className="mt-3.5">
                  <label className="block text-xs font-bold text-stone-800">
                    My Personal Trick / Mistake Note (Saved to Browser LocalStorage)
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <input
                      type="text"
                      value={trickNote}
                      onChange={(e) => setTrickNote(e.target.value)}
                      placeholder="Write your personal mnemonic, guessing trap, or revision note..."
                      className="flex-1 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs text-stone-900 focus:border-amber-700 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveTrickNote}
                      disabled={savingNote}
                      className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-stone-800"
                    >
                      {noteSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                      {noteSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Source Citations */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-emerald-800" />
                  <h4 className="font-serif text-sm font-bold text-stone-900">
                    Authoritative Source Citations
                  </h4>
                </div>
                <ul className="mt-2.5 space-y-2">
                  {currentQ.citations.map((cit, i) => (
                    <li
                      key={i}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-stone-50 p-2.5 text-xs text-stone-700"
                    >
                      <span>
                        <span className="font-semibold text-stone-950">{cit.title}</span> — {cit.reference}
                      </span>
                      {cit.url && (
                        <a
                          href={cit.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-amber-800 hover:underline"
                        >
                          Source <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material 3 Expressive Action Footer */}
              <div className="flex flex-col gap-3 rounded-2xl border border-indigo-200/80 bg-[#F0EFF8] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedErrorType}
                    onChange={(e) => setSelectedErrorType(e.target.value as ErrorTaxonomy)}
                    className="rounded-xl border border-indigo-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 focus:outline-none"
                  >
                    <option value="Factual Blindspot">Factual Blindspot</option>
                    <option value="Veteran Illusion">Veteran Illusion</option>
                    <option value="50:50 Trap">50:50 Trap</option>
                    <option value="Misread Correct/Incorrect">Misread Correct/Incorrect</option>
                    <option value="Over-stretched Logic">Over-stretched Logic</option>
                  </select>

                  <button
                    onClick={handleLogToErrorRegistry}
                    disabled={isLoggingError}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition active:scale-95 ${
                      isAlreadyLogged
                        ? "bg-emerald-700 text-white hover:bg-emerald-800"
                        : "bg-[#2E1065] text-white hover:bg-[#3B177D]"
                    } disabled:opacity-60`}
                  >
                    {isLoggingError ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving to Local Storage...
                      </>
                    ) : isAlreadyLogged ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-200" />
                        Logged in Local Storage & Registry (Update)
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-3.5 w-3.5" />
                        Log to 1–3–7–21 Error Registry
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleGeminiDissect}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/70 px-4 py-2 text-xs font-semibold text-amber-950 shadow-xs transition hover:bg-amber-200/70 active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                  {aiLoading ? "Analyzing via Gemini..." : "AI Deep Dissect (Optional Gemini)"}
                </button>
              </div>

              {errorLoggedMsg && (
                <div className="rounded-2xl bg-emerald-100/80 px-4 py-2.5 text-xs font-semibold text-emerald-950">
                  {errorLoggedMsg}
                </div>
              )}

              {aiError && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-900">
                  {aiError}
                </div>
              )}

              {aiAnalysis && (
                <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-950">
                    <Sparkles className="h-3.5 w-3.5 text-purple-700" />
                    Gemini Trap & PSIR-Bridge Dissection (Anchored to Official Key {currentQ.official_answer})
                  </div>
                  <div className="mt-2.5 whitespace-pre-line text-xs leading-relaxed text-stone-800">
                    {aiAnalysis}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
