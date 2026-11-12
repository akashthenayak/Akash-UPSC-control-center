import { DailyTargetSuggestion, RoutineSlot, StudyPhaseInfo } from "@/types";

export const STUDY_PHASES: StudyPhaseInfo[] = [
  {
    id: "phase_1",
    name: "Phase 1: Factual Precision Rebuild",
    window: "1 Jan – 28 Feb 2027 (8 Weeks)",
    split: "90% Prelims : 10% Passive PSIR/IR Op-Eds",
    objective:
      "Break the 'Mains Veteran Illusion' in Polity & Economy (target 85%+ accuracy) while ramping up daily 50-MCQ morning discipline.",
    key_rule: "Notification releases 13 Jan 2027 (last date 2 Feb). Apply in week 1. Test-first reverse learning every morning.",
  },
  {
    id: "phase_2",
    name: "Phase 2: Non-PSIR Bleeders & 15-Yr PYQ Dissection",
    window: "1 Mar – 15 Apr 2027 (6.5 Weeks)",
    split: "100% Prelims Immersion",
    objective:
      "Eliminate the 15-20 mark GS-I gap by attacking Environment, Geography Mapping, Ancient/Medieval/Culture, and S&T with 15-year PYQ dissection.",
    key_rule: "Sunday 9:30 AM biological-clock mock sync. Zero passive re-reading.",
  },
  {
    id: "phase_3",
    name: "Phase 3: Consolidation & 1-Week Prelims Leave",
    window: "16 Apr – 23 May 2027 (5 Weeks)",
    split: "100% Error Registry + Mapping + Survey/Budget",
    objective:
      "Deploy 1-week leave (May 10–21 -> 9 consecutive days) for 3 full passes of your Error & Trap Registry and high-yield mapping sheets.",
    key_rule: "No new sources after April 23. Exam Day: 23 May 2027.",
  },
  {
    id: "phase_4",
    name: "Phase 4: 89-Day Mains Blitz (2-Month Leave)",
    window: "26 May – 20 Aug 2027 (12.5 Weeks)",
    split: "GS 1-4 (376 -> 435) + PSIR (264 -> 290+) + Essay (115 -> 130+)",
    objective:
      "Use 60 days of leave from ~June 15 to write 16-20 GS MGP+ mocks & 8 PSIR tests. Zero unattempted questions.",
    key_rule: "Restart May 26 without waiting for Prelims results. 1-page templates for every GS micro-topic.",
  },
];

export const EXAM_MILESTONES = [
  { label: "UPSC CSE 2027 Notification", date: "2027-01-13", detail: "Apply in Week 1 (closes 2 Feb 2027)" },
  { label: "100% Prelims Pivot", date: "2027-03-01", detail: "Drop passive Mains completely" },
  { label: "No New Sources Cutoff", date: "2027-04-23", detail: "30-day Error Registry & Revision lock" },
  { label: "1-Week Prelims Leave", date: "2027-05-10", detail: "9 consecutive full-time days till May 21" },
  { label: "UPSC Prelims 2027", date: "2027-05-23", detail: "GS Paper I (9:30 AM) & CSAT (2:30 PM)" },
  { label: "2-Month Mains Leave Begins", date: "2027-06-15", detail: "60 days full-time MGP+ & PSIR sprint" },
  { label: "UPSC Mains 2027", date: "2027-08-20", detail: "Target: 840–860 Written Total" },
];

export const SCORECARD_BENCHMARK = [
  { component: "PSIR Optional", score2021: "235 (missed 60m)", score2022: "264 (missed 10m)", target2027: "285–295", delta: "+25" },
  { component: "Essay", score2021: "123", score2022: "115", target2027: "130+", delta: "+15" },
  { component: "GS Total (1–4)", score2021: "388 (~97/paper)", score2022: "376 (~94/paper)", target2027: "425–435", delta: "+55" },
  { component: "Written Total", score2021: "746", score2022: "755", target2027: "840–860", delta: "+90" },
];

const WEEKDAY_SLOTS: RoutineSlot[] = [
  {
    id: "wd_static",
    time_window: "5:30 AM – 6:45 AM",
    title: "Block 1: High-Precision Static Revision",
    category: "static",
    duration_min: 75,
    description: "Active Recall / blank-sheet blurting for next day's SFG micro-syllabus. Zero passive highlighting.",
    scientific_reason: "Peak pre-frontal cortex alertness before office files or calls can intrude.",
  },
  {
    id: "wd_mcq",
    time_window: "6:45 AM – 8:15 AM",
    title: "Block 2: Daily 50-MCQ Test + 15m Error Tagging",
    category: "mcq_test",
    duration_min: 90,
    description: "Solve 50 timed MCQs (SFG/sectional) + immediately tag wrong & 50:50 guessed questions.",
    scientific_reason: "Testing Effect exposes exact factual blindspots before you rationalize them.",
  },
  {
    id: "wd_office_lunch",
    time_window: "Office Lunch (35–40 min)",
    title: "Lunch Pocket: The Hindu/IE Op-Eds + Atlas Mapping",
    category: "office_pocket",
    duration_min: 40,
    description: "PSIR/IR op-eds (C. Raja Mohan, Harsh Pant, Suhasini Haidar) + 15-min river/strait/conflict map drill.",
    scientific_reason: "Keeps newspaper reading inside office hours so home hours stay 100% Prelims-focused.",
  },
  {
    id: "wd_fitness",
    time_window: "6:15 PM – 6:50 PM",
    title: "Smart Fitness Reset (35-min High Intensity)",
    category: "fitness",
    duration_min: 35,
    description: "Compressed workout/sport right after office (9:30–6:00). Never drop to zero.",
    scientific_reason: "Flushes office cortisol and triggers neurochemical reset for your evening study block.",
    is_protected: true,
  },
  {
    id: "wd_weak_pillar",
    time_window: "7:15 PM – 8:30 PM",
    title: "Block 3: Non-PSIR Weak Pillar + PYQ Option Dissection",
    category: "weak_pillar",
    duration_min: 75,
    description: "Environment / Ancient-Medieval / Geography Mapping / S&T + dissect all 4 options of 15-Yr PYQs.",
    scientific_reason: "Cognitive interleaving contrasts morning static load with high-yield factual pillars.",
  },
  {
    id: "wd_spouse",
    time_window: "8:30 PM – 9:30 PM",
    title: "Protected Spouse Hour (Unplugged)",
    category: "spouse",
    duration_min: 60,
    description: "Dinner & evening walk with wife. Strictly no UPSC talk or phones.",
    scientific_reason: "Emotional anchor that prevents burnout and relationship friction in year 1 of marriage.",
    is_protected: true,
  },
  {
    id: "wd_error_review",
    time_window: "9:30 PM – 10:00 PM",
    title: "Block 4: Error Registry Review (1–3–7–21 Cycle)",
    category: "error_review",
    duration_min: 30,
    description: "Active recall of Day 1, Day 3, Day 7, and Day 21 Error Registry cards before sleep at 10:00 PM.",
    scientific_reason: "Pre-sleep consolidation locks factual corrections into long-term memory during slow-wave sleep.",
  },
];

const SATURDAY_SLOTS: RoutineSlot[] = [
  {
    id: "sat_consolidate",
    time_window: "6:00 AM – 10:00 AM",
    title: "Weekly Consolidation & Office Spillover Buffer",
    category: "static",
    duration_min: 240,
    description: "Consolidate all 5 weekday static blocks + clear any targets displaced by urgent office files.",
    scientific_reason: "14-day rolling cycle ensures one busy office day never collapses your whole week.",
  },
  {
    id: "sat_low_roi",
    time_window: "11:00 AM – 2:00 PM",
    title: "Low-ROI / High-Hurt Prelims Modules",
    category: "weak_pillar",
    duration_min: 180,
    description: "Art & Culture, Ancient/Medieval terms, International Bodies, WPA 2022 Schedules, Minerals & Crops.",
    scientific_reason: "Targets the exact non-PSIR bleeders behind the 15-20 mark GS deficit.",
  },
  {
    id: "sat_pyq_sprint",
    time_window: "4:00 PM – 6:00 PM",
    title: "100-Question PYQ Sprint (CSE + CDS/CAPF)",
    category: "mcq_test",
    duration_min: 120,
    description: "Rapid 100-PYQ timed run (2014–2026) focusing on UPSC's post-2022 statement-pair traps.",
    scientific_reason: "Calibrates 50:50 risk appetite and eliminates impulsive over-guessing.",
  },
  {
    id: "sat_spouse",
    time_window: "Saturday Night",
    title: "Extended Quality Time / Outing with Wife",
    category: "spouse",
    duration_min: 150,
    description: "Protected weekend recovery block away from books.",
    scientific_reason: "Sustains 20-week endurance without cognitive fatigue.",
    is_protected: true,
  },
];

const SUNDAY_SLOTS: RoutineSlot[] = [
  {
    id: "sun_gs_mock",
    time_window: "9:30 AM – 11:30 AM",
    title: "Full-Length GS Prelims Mock (Biological-Clock Sync)",
    category: "mock",
    duration_min: 120,
    description: "Strict exam-hall simulation (100 Qs, OMR timing, zero breaks) matching UPSC's exact 9:30 AM slot.",
    scientific_reason: "Trains peak cognitive stamina at the exact circadian hour of Prelims GS Paper I.",
  },
  {
    id: "sun_csat",
    time_window: "2:30 PM – 4:30 PM",
    title: "CSAT Maintenance Mock (Every 3rd Sunday)",
    category: "mock",
    duration_min: 120,
    description: "Since CSAT is consistently cleared, run 1 timed simulation every 3rd Sunday + April PYQ sprint.",
    scientific_reason: "Maintains qualifying margin (80+) without stealing weekdays from GS Paper I.",
  },
  {
    id: "sun_postmortem",
    time_window: "5:00 PM – 8:30 PM",
    title: "Forensic Mock Post-Mortem & Error Registry Sync",
    category: "error_review",
    duration_min: 210,
    description: "Classify every mistake: Factual Blindspot, Misread Keyword, Over-stretched Logic, or Veteran Illusion.",
    scientific_reason: "A 2-hour mock without a 3-hour post-mortem wastes 80% of the testing effect.",
  },
];

const WEEKDAY_ROTATION: Record<number, { pillars: string[]; codes: string[] }> = {
  1: { pillars: ["Polity Bare-Act Audit", "Environment & WPA 1972"], codes: ["PRE-GS1-POL-CON", "PRE-GS1-ENV-ECO"] },
  2: { pillars: ["Monetary Policy & Banking", "Indian Mapping & Rivers"], codes: ["PRE-GS1-ECO-MAC", "PRE-GS1-GEO-IND"] },
  3: { pillars: ["Parliamentary Procedures", "Ancient/Medieval Terms & Culture"], codes: ["PRE-GS1-POL-PAR", "PRE-GS1-HIS-ANC"] },
  4: { pillars: ["Modern History Acts (1773–1935)", "Science & Emerging Tech"], codes: ["PRE-GS1-HIS-MOD", "PRE-GS1-SNT"] },
  5: { pillars: ["External Sector & Budget", "World Conflict Mapping & Climate"], codes: ["PRE-GS1-ECO-EXT", "PRE-GS1-GEO-WLD"] },
};

export function getPhaseForDate(dateStr: string): StudyPhaseInfo {
  if (dateStr >= "2027-05-24") return STUDY_PHASES[3];
  if (dateStr >= "2027-04-16") return STUDY_PHASES[2];
  if (dateStr >= "2027-03-01") return STUDY_PHASES[1];
  return STUDY_PHASES[0];
}

export function buildDailySuggestion(dateStr: string): DailyTargetSuggestion {
  const parsed = new Date(`${dateStr}T12:00:00`);
  const day = parsed.getDay(); // 0 Sun, 6 Sat
  const phase = getPhaseForDate(dateStr);

  if (day === 6) {
    return {
      date: dateStr,
      day_type: "saturday",
      phase_name: phase.name,
      phase_split: phase.split,
      focus_pillars: ["Weekly Consolidation", "Art & Culture / Low-ROI", "100-PYQ Sprint"],
      suggested_syllabus_codes: ["PRE-GS1-HIS-ANC", "PRE-GS1-ENV-ECO", "PRE-GS1-CUR"],
      daily_mcq_target: 100,
      daily_pyq_target: 100,
      slots: SATURDAY_SLOTS,
    };
  }

  if (day === 0) {
    return {
      date: dateStr,
      day_type: "sunday",
      phase_name: phase.name,
      phase_split: phase.split,
      focus_pillars: ["Full-Length GS Simulation (9:30 AM)", "Forensic Error Taxonomy"],
      suggested_syllabus_codes: ["PRE-GS1-POL-CON", "PRE-GS1-ECO-MAC", "PRE-GS1-ENV-ECO", "PRE-CSAT"],
      daily_mcq_target: 100,
      daily_pyq_target: 25,
      slots: SUNDAY_SLOTS,
    };
  }

  const rotation = WEEKDAY_ROTATION[day] ?? WEEKDAY_ROTATION[1];
  return {
    date: dateStr,
    day_type: "weekday",
    phase_name: phase.name,
    phase_split: phase.split,
    focus_pillars: rotation.pillars,
    suggested_syllabus_codes: rotation.codes,
    daily_mcq_target: 50,
    daily_pyq_target: 15,
    slots: WEEKDAY_SLOTS,
  };
}
