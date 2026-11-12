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
} from "lucide-react";
import { ErrorTaxonomy, PyqQuestion, SyllabusNode } from "@/types";
import { getLoggedPyqIds, markPyqAsLogged, saveLocalError } from "@/lib/storage";

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

const SAMPLE_IMPORT_JSON = `[
  {
    "year": 2023,
    "paper": "GS Paper I",
    "subject": "Polity & Governance",
    "syllabus_code": "PRE-GS1-POL-CON",
    "question_style": "standard",
    "stem": "Consider the following statements regarding the Finance Commission of India: ...",
    "options": { "A": "1 only", "B": "2 only", "C": "Both 1 and 2", "D": "Neither 1 nor 2" },
    "official_answer": "C",
    "key_status": "Official UPSC CSE 2023 Answer Key",
    "explanation": "Article 280 provides for ...",
    "fact_breakdown": [
      { "label": "Statement 1", "status": "true", "detail": "Verified under Article 280(1)" }
    ],
    "trap_type": "Constitutional vs Statutory Trap",
    "trap_analysis": "Watch out for tenure/qualification swaps.",
    "citations": [
      { "title": "Constitution of India — Article 280", "reference": "Part XII" }
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
      setSubjectFilter("ALL");
    }
  }, [initialSyllabusCode]);

  const fetchPyqs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (subjectFilter !== "ALL") params.set("subject", subjectFilter);
    if (syllabusFilter !== "ALL") params.set("syllabus_code", syllabusFilter);
    if (yearFilter !== "ALL") params.set("year", yearFilter);

    const res = await fetch(`/api/pyqs?${params.toString()}`);
    const data = await res.json();
    setQuestions(data.questions || []);
    setCurrentIndex(0);
    setLoading(false);
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
        setErrorLoggedMsg("Already saved in Local Storage & 1–3–7–21 Error Registry.");
      } else {
        setErrorLoggedMsg(null);
      }
    }
  }, [currentQ?.id]);

  const handleSubmitAnswer = async () => {
    if (!currentQ || !selectedOption) return;
    setSubmitted(true);

    await fetch("/api/pyqs/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pyq_id: currentQ.id,
        selected_option: selectedOption,
        confidence,
        personal_note: trickNote,
      }),
    });

    onAttemptRecorded();
  };

  const handleSaveTrickNote = async () => {
    if (!currentQ) return;
    setSavingNote(true);
    await fetch("/api/pyqs/attempt", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pyq_id: currentQ.id, user_trick_note: trickNote }),
    });
    setSavingNote(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
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
      const res = await fetch("/api/pyqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      if (res.ok) {
        setImportStatus(`Imported ${data.inserted} verified PYQ(s) into SQLite.`);
        setImportJson("");
        fetchPyqs();
        onAttemptRecorded();
      } else {
        setImportStatus(data.error || "Import failed.");
      }
    } catch {
      setImportStatus("Invalid JSON format. Check brackets and quotes.");
    }
  };

  const subjects = Array.from(new Set(syllabus.filter((s) => s.stage !== "MAINS").map((s) => s.subject)));

  return (
    <div className="space-y-5">
      {/* Filter & Import Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
              setSyllabusFilter("ALL");
            }}
            className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-800"
          >
            <option value="ALL">All Prelims Subjects</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <select
            value={syllabusFilter}
            onChange={(e) => setSyllabusFilter(e.target.value)}
            className="max-w-[260px] rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-800"
          >
            <option value="ALL">All Syllabus Units</option>
            {syllabus
              .filter((s) => s.stage !== "MAINS")
              .map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} — {s.topic}
                </option>
              ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-800"
          >
            <option value="ALL">All Years (2020–2023+)</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-stone-500">
            Showing {questions.length > 0 ? currentIndex + 1 : 0} of {questions.length} PYQs
          </span>
          <button
            onClick={() => setShowImport(!showImport)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-100"
          >
            <Upload className="h-3.5 w-3.5" />
            Import PYQ Pack
          </button>
        </div>
      </div>

      {/* Bulk JSON Importer Drawer */}
      {showImport && (
        <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-base font-bold text-stone-900">
              Bulk Import Verified UPSC PYQs (JSON)
            </h4>
            <button
              onClick={() => setImportJson(SAMPLE_IMPORT_JSON)}
              className="text-xs font-semibold text-amber-800 underline"
            >
              Load Sample JSON Schema
            </button>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Paste an array of PYQ objects with official UPSC answer keys and primary citations to expand your local SQLite bank.
          </p>
          <textarea
            rows={6}
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder="Paste JSON array of PYQ objects here..."
            className="mt-2.5 w-full rounded-lg border border-stone-300 bg-white p-2.5 font-mono text-xs text-stone-800"
          />
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-stone-700">{importStatus || ""}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowImport(false)}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700"
              >
                Close
              </button>
              <button
                onClick={handleBulkImport}
                className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                Import into SQLite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main PYQ Practice Widget */}
      {loading ? (
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
          Loading verified PYQ bank...
        </div>
      ) : !currentQ ? (
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
          <p className="text-sm text-stone-600">No PYQs match the current syllabus/year filter.</p>
          <button
            onClick={() => {
              setSubjectFilter("ALL");
              setSyllabusFilter("ALL");
              setYearFilter("ALL");
            }}
            className="mt-3 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          {/* Question Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-stone-900 px-2.5 py-1 text-xs font-bold text-white">
                UPSC CSE {currentQ.year}
              </span>
              <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-700">
                {currentQ.subject}
              </span>
              <span className="rounded-md bg-amber-50 px-2 py-1 font-mono text-[11px] font-semibold text-amber-900">
                {currentQ.syllabus_code}
              </span>
              {currentQ.question_style === "pair_counting" && (
                <span className="rounded-md bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-800">
                  Post-2022 Pair Trap
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="rounded-lg border border-stone-300 p-1.5 text-stone-700 hover:bg-stone-100 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex >= questions.length - 1}
                className="rounded-lg border border-stone-300 p-1.5 text-stone-700 hover:bg-stone-100 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stem */}
          <div className="mt-4 whitespace-pre-line font-serif text-base leading-relaxed text-stone-900">
            {currentQ.stem}
          </div>

          {/* Confidence Tagging (Before Submission) */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">Guessing Calibration:</span>
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
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  confidence === tag.id
                    ? "border-amber-700 bg-amber-100 text-amber-950"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Options A-D */}
          <div className="mt-4 space-y-2.5">
            {(["A", "B", "C", "D"] as const).map((optKey) => {
              const isSelected = selectedOption === optKey;
              const isOfficial = currentQ.official_answer === optKey;

              let optionStyle = "border-stone-200 bg-white hover:border-amber-500";
              if (submitted) {
                if (isOfficial) {
                  optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950";
                } else if (isSelected && !isOfficial) {
                  optionStyle = "border-rose-400 bg-rose-50 text-rose-950";
                } else {
                  optionStyle = "border-stone-200 bg-stone-50/50 opacity-70";
                }
              } else if (isSelected) {
                optionStyle = "border-amber-700 bg-amber-50/70 ring-1 ring-amber-700";
              }

              return (
                <button
                  key={optKey}
                  disabled={submitted}
                  onClick={() => setSelectedOption(optKey)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-xs font-bold text-stone-800">
                      {optKey}
                    </span>
                    <span className="text-sm font-medium text-stone-900">{currentQ.options[optKey]}</span>
                  </div>
                  {submitted && isOfficial && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />}
                  {submitted && isSelected && !isOfficial && <XCircle className="h-5 w-5 flex-shrink-0 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* Submit Row */}
          {!submitted && (
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                {currentQ.last_attempt
                  ? `Previous attempt: ${currentQ.last_attempt.selected_option} (${
                      currentQ.last_attempt.is_correct ? "Correct" : "Wrong"
                    })`
                  : "Not yet attempted"}
              </span>
              <button
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
                className="rounded-lg bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verify Official UPSC Key
              </button>
            </div>
          )}

          {/* Post-Submission Official Key, Fact Breakdown, Traps & Citations */}
          {submitted && (
            <div className="mt-6 space-y-5 border-t border-stone-200 pt-5">
              {/* Verdict Banner */}
              <div
                className={`flex flex-col justify-between gap-2 rounded-xl border p-4 sm:flex-row sm:items-center ${
                  selectedOption === currentQ.official_answer
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-rose-300 bg-rose-50"
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-stone-900">
                    {selectedOption === currentQ.official_answer
                      ? `Correct (+2.00 marks) — Official Key: Option ${currentQ.official_answer}`
                      : `Incorrect (-0.66 marks) — You chose ${selectedOption}, Official Key: Option ${currentQ.official_answer}`}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-600">
                    Verified against: <span className="font-semibold">{currentQ.key_status}</span>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-800 shadow-sm">
                  Confidence: {confidence.replace("_", " ")}
                </span>
              </div>

              {/* Official Explanation & Statement-by-Statement Fact Breakdown */}
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  Official Key Explanation & Fact Verification
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-800">{currentQ.explanation}</p>

                {currentQ.fact_breakdown.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {currentQ.fact_breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-stone-200 bg-white p-2.5">
                        <span
                          className={`mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                            item.status === "true"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.status === "false"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.status}
                        </span>
                        <div className="text-xs text-stone-700">
                          <span className="font-semibold text-stone-900">{item.label}: </span>
                          {item.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trap & Trick Dissection + Personal Trick Note */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-800" />
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    UPSC Trap Dissection: {currentQ.trap_type}
                  </h4>
                </div>
                <p className="mt-1.5 text-sm text-stone-800">{currentQ.trap_analysis}</p>

                <div className="mt-3">
                  <label className="block text-xs font-semibold text-stone-700">
                    My Personal Trick / Mistake Note (saved to SQLite)
                  </label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={trickNote}
                      onChange={(e) => setTrickNote(e.target.value)}
                      placeholder="Write your mnemonic, why you guessed wrong, or option-elimination trick..."
                      className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-900 focus:border-amber-600 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveTrickNote}
                      disabled={savingNote}
                      className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                    >
                      {noteSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                      {noteSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Primary Source Citations */}
              <div className="rounded-xl border border-stone-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-emerald-700" />
                  <h4 className="font-serif text-sm font-bold text-stone-900">
                    Authoritative Source Citations
                  </h4>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {currentQ.citations.map((cit, i) => (
                    <li key={i} className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-700">
                      <span>
                        <span className="font-semibold text-stone-900">{cit.title}</span> — {cit.reference}
                      </span>
                      {cit.url && (
                        <a
                          href={cit.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-amber-700 hover:underline"
                        >
                          Source <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions: Log to 1-3-7-21 Error Registry + Optional Gemini AI Dissection */}
              <div className="flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedErrorType}
                    onChange={(e) => setSelectedErrorType(e.target.value as ErrorTaxonomy)}
                    className="rounded-lg border border-indigo-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-800"
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
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      loggedPyqIds.includes(currentQ.id)
                        ? "bg-emerald-700 text-white hover:bg-emerald-800"
                        : "bg-indigo-700 text-white hover:bg-indigo-800"
                    } disabled:opacity-60`}
                  >
                    {isLoggingError ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving to Local Storage...
                      </>
                    ) : loggedPyqIds.includes(currentQ.id) ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-50 disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  {aiLoading ? "Analyzing via Gemini..." : "AI Deep Dissect (Optional Gemini)"}
                </button>
              </div>

              {errorLoggedMsg && (
                <div className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-900">
                  {errorLoggedMsg}
                </div>
              )}

              {aiError && (
                <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  {aiError}
                </div>
              )}

              {aiAnalysis && (
                <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-purple-900">
                    <Sparkles className="h-3.5 w-3.5" />
                    Gemini Trap & PSIR-Bridge Dissection (Anchored to Official Key {currentQ.official_answer})
                  </div>
                  <div className="mt-2 whitespace-pre-line text-xs leading-relaxed text-stone-800">
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
