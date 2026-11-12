# Sankalp 2027 — UPSC CSE Prep OS

A purpose-built study operating system for a serving civil servant making their final UPSC CSE attempt. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and local-first SQLite (`node:sqlite`).

---

## 🌟 Core Components Built From Your Gemini Brainstorm

### 1. Syllabus-Rooted Daily Tracker & Time-Blocked Architecture
- **Circadian-Synced Daily Routine**:
  - `5:30 AM – 6:45 AM`: Block 1 Static High-Precision Revision (Active Recall / blank-sheet blurting).
  - `6:45 AM – 8:15 AM`: Block 2 Daily 50-MCQ Test (SFG micro-syllabus) + immediate error tagging.
  - `Office Lunch (35–40 min)`: The Hindu/IE Op-eds (C. Raja Mohan, Harsh Pant, Suhasini Haidar) + Atlas Mapping Drill.
  - `6:15 PM – 6:50 PM`: Smart 35-min High-Intensity Fitness Compromise (Cortisol reset switch).
  - `7:15 PM – 8:30 PM`: Block 3 Non-PSIR Weak Pillar (Env, S&T, Ancient-Medieval, Mapping) + 15-Yr PYQ Option Dissection.
  - `8:30 PM – 9:30 PM`: **Protected Spouse Hour** (Dinner & evening walk, strictly unplugged).
  - `9:30 PM – 10:00 PM`: Block 4 Error Registry Spaced Repetition (Pre-sleep consolidation).
- **14-Day Rolling Cycle**: Dedicated spillover logging so sudden office files or late inspections don't collapse your weekly plan—catch up during Saturday 6:00–10:00 AM consolidation.
- **Syllabus Pairing**: Automatically selects daily topics from the official UPSC syllabus to pair conceptual pillars with your diagnosed non-PSIR bleeders.

### 2. Interactive UPSC CSE PYQ MCQ Practice Widget
- **Verified Primary Answer Keys**: Preloaded starter bank containing verified UPSC CSE Prelims questions with official UPSC answer keys (zero AI hallucinations).
- **Statement-by-Statement Fact Breakdown**: Explicitly flags why each statement is true, false, or nuanced.
- **UPSC Trap Dissection**: Explains post-2022 "Only one / Only two / All three" pair-counting traps, bare-act exact word traps ("person" vs "citizen"), directional reversals, and Mains veteran assumptions.
- **Authoritative Source Citations**: Direct citations to the Constitution of India, Bare Acts, NCERTs, Supreme Court Reports, MoEFCC census data, and RBI reports.
- **Personal Trick / Mistake Note**: Save personal mnemonics and reasons for guessing right into SQLite.
- **Bulk JSON Importer**: Import your own PYQ packs (2012–2026) directly into SQLite.
- **Optional Gemini AI Dissection**: Anchor deep analysis to the official UPSC answer key with an optional Gemini API key.

### 3. 1–3–7–21 Error & Trap Registry
- **2-Column Scientific Format**:
  - **Left Column**: Trigger Cue (Active recall question / distinction prompt).
  - **Right Column**: Exact Fact + Personal Trap Note + Primary Source Citation.
- **Spaced Repetition Engine**: Cards advance through Day 1 → Day 3 → Day 7 → Day 21 → Mastered.
- **Taxonomy Tagging**: Categorizes errors into *Factual Blindspot*, *Veteran Illusion*, *50:50 Trap*, *Misread Correct/Incorrect*, and *Over-stretched Logic*.

### 4. Official UPSC Syllabus Tree & Mastery Matrix
- Complete Prelims (GS-I & CSAT) and Mains (GS 1–4, Essay & PSIR) syllabus.
- Custom priority tags: *Non-PSIR Bleeders*, *Mains Veteran Traps*, *PSIR Bridge*, and *High-ROI Mains Targets*.
- Interactive mastery percentage sliders and direct one-click PYQ practice launches.

### 5. 2027 Command Radar & Scorecard Diagnostics
- Countdown to Notification (13 Jan 2027), 100% Prelims Pivot (1 Mar 2027), Prelims Exam (23 May 2027), and Mains (20 Aug 2027).
- Scorecard bridge tracking your path from **755 to 840–860+**:
  - PSIR: 264 → 285–295 (+25 marks)
  - GS 1–4: 376 → 425–435 (+55 marks)
  - Essay: 115 → 130+ (+15 marks)
- Paid course guidance tailored to a working officer (ForumIAS SFG, Sleepy Classes modular crash, Shubhra Ranjan / NextIAS post-prelims).

---

## 🚀 How to Run

Double-click `start.bat` in this folder, or run in PowerShell/terminal:

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your web browser.
