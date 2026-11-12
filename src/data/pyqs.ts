import { CitationItem, FactBreakdownItem } from "@/types";

export interface SeedPyqQuestion {
  year: number;
  paper: string;
  question_number: number | null;
  subject: string;
  syllabus_code: string;
  question_style: "standard" | "pair_counting" | "statement_reason" | "chronology";
  stem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  official_answer: "A" | "B" | "C" | "D";
  key_status: string;
  explanation: string;
  fact_breakdown: FactBreakdownItem[];
  trap_type: string;
  trap_analysis: string;
  citations: CitationItem[];
  is_verified: boolean;
}

/**
 * Curated Starter Bank of Verified UPSC CSE Prelims PYQs.
 * Every official_answer matches the official UPSC CSE Prelims Answer Key.
 * Additional PYQ packs (2012-2026) can be bulk-imported via JSON/CSV inside the app.
 */
export const VERIFIED_STARTER_PYQS: SeedPyqQuestion[] = [
  {
    year: 2023,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "In India, which one of the following Constitutional Amendments was widely believed to be enacted to overcome the judicial interpretations of the Fundamental Rights?",
    options: {
      A: "1st Amendment",
      B: "42nd Amendment",
      C: "44th Amendment",
      D: "86th Amendment",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2023 Answer Key",
    explanation:
      "The Constitution (First Amendment) Act, 1951 was enacted specifically to overcome Supreme Court and High Court decisions (notably State of Madras v. Champakam Dorairajan, Romesh Thappar v. State of Madras, and Kameshwar Singh) that struck down reservations, speech restrictions, and zamindari abolition laws under Articles 15, 19, and 31. It inserted Article 15(4), Articles 31A and 31B, and the Ninth Schedule.",
    fact_breakdown: [
      {
        label: "1st Amendment (1951)",
        status: "true",
        detail: "Direct response to 1950-51 SC judgments on Fundamental Rights (Articles 15, 19, 31); created the Ninth Schedule.",
      },
      {
        label: "42nd Amendment (1976)",
        status: "false",
        detail: "Sweeping Emergency-era overhaul (42nd CAA) aimed at curbing judicial review broadly and asserting Parliamentary supremacy over Kesavananda Bharati, not the initial FR interpretations.",
      },
      {
        label: "44th Amendment (1978)",
        status: "false",
        detail: "Reversed Emergency excesses and moved Right to Property from FR (Art 31) to Art 300A.",
      },
    ],
    trap_type: "Veteran Illusion (42nd vs 1st Amendment)",
    trap_analysis:
      "Mains/PSIR veterans immediately associate 'judiciary vs Fundamental Rights' with the 1970s Kesavananda-42nd Amendment tussle and miss the foundational 1951 First Amendment.",
    citations: [
      {
        title: "The Constitution (First Amendment) Act, 1951 — Statement of Objects and Reasons",
        reference: "India Code / Ministry of Law & Justice (18 June 1951)",
        url: "https://www.indiacode.nic.in/",
      },
      {
        title: "State of Madras v. Champakam Dorairajan (1951) & Romesh Thappar (1950)",
        reference: "Supreme Court Reports (SCR), 1950-1951",
      },
    ],
    is_verified: true,
  },
  {
    year: 2023,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "pair_counting",
    stem: "Consider the following organizations/bodies in India:\n1. The National Commission for Backward Classes\n2. The National Human Rights Commission\n3. The National Law Commission\n4. The National Consumer Disputes Redressal Commission\n\nHow many of the above are constitutional bodies?",
    options: {
      A: "Only one",
      B: "Only two",
      C: "Only three",
      D: "All four",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2023 Answer Key",
    explanation:
      "Only the National Commission for Backward Classes (NCBC) is a constitutional body, having been granted constitutional status under Article 338B via the 102nd Constitutional Amendment Act, 2018. NHRC and NCDRC are statutory bodies, while the Law Commission of India is an executive body.",
    fact_breakdown: [
      {
        label: "1. NCBC",
        status: "true",
        detail: "Constitutional body under Article 338B (102nd Amendment Act, 2018).",
      },
      {
        label: "2. NHRC",
        status: "false",
        detail: "Statutory body established under the Protection of Human Rights Act, 1993.",
      },
      {
        label: "3. Law Commission of India",
        status: "false",
        detail: "Non-statutory executive body constituted by Government of India notification for fixed terms.",
      },
      {
        label: "4. NCDRC",
        status: "false",
        detail: "Quasi-judicial statutory body under the Consumer Protection Act, 1986 (replaced by 2019 Act).",
      },
    ],
    trap_type: "Pair-Counting Precision (Constitutional vs Statutory vs Executive)",
    trap_analysis:
      "Because elimination is impossible in 'Only one / Only two / Only three' formats, misclassifying even one high-profile body (e.g., thinking NHRC or Law Commission is constitutional) flips the answer.",
    citations: [
      {
        title: "Constitution of India — Article 338B (102nd Amendment Act, 2018)",
        reference: "Part XVI, Special Provisions Relating to Certain Classes",
      },
      {
        title: "Protection of Human Rights Act, 1993 & Consumer Protection Act, 2019",
        reference: "Legislative Department, Ministry of Law & Justice",
      },
    ],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-PAR",
    question_style: "standard",
    stem: "With reference to the Deputy Speaker of Lok Sabha, consider the following statements:\n1. As per the Rules of Procedure and Conduct of Business in Lok Sabha, the election of Deputy Speaker shall be held on such date as the Speaker may fix.\n2. There is a mandatory provision that the election of a candidate as Deputy Speaker of Lok Sabha shall be from either the principal opposition party or the ruling party.\n3. The Deputy Speaker has the same power as of the Speaker when presiding over the sitting of the House and no appeal lies against his rulings.\n4. The well established parliamentary practice regarding the appointment of Deputy Speaker is that the motion is moved by the Speaker and duly seconded by the Prime Minister.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 3 only",
      B: "1, 2 and 3",
      C: "3 and 4 only",
      D: "2 and 4 only",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2022 Answer Key",
    explanation:
      "Statement 1 is correct under Rule 8 of Lok Sabha Rules of Procedure. Statement 2 is false because offering the post to the opposition is a convention (since 11th Lok Sabha), not a mandatory constitutional or rule-book provision. Statement 3 is correct: while presiding, the Deputy Speaker holds the exact powers of the Speaker and no appeal lies to the Speaker. Statement 4 is false: the Speaker never moves the election motion; a Minister or Member moves it.",
    fact_breakdown: [
      {
        label: "Statement 1 (Speaker fixes date)",
        status: "true",
        detail: "Rule 8 of Rules of Procedure and Conduct of Business in Lok Sabha explicitly empowers the Speaker to fix the date.",
      },
      {
        label: "Statement 2 (Mandatory opposition/ruling rule)",
        status: "false",
        detail: "Strictly a convention, NOT a mandatory provision in Article 93 or Lok Sabha Rules.",
      },
      {
        label: "Statement 3 (Equal presiding powers)",
        status: "true",
        detail: "Under Article 95(1) and parliamentary practice, Deputy Speaker's rulings while presiding are final.",
      },
      {
        label: "Statement 4 (Moved by Speaker)",
        status: "false",
        detail: "Motions for Deputy Speaker's election are moved by a Minister/Member and seconded by another Member, never by the Speaker.",
      },
    ],
    trap_type: "Procedural Rule vs Parliamentary Convention",
    trap_analysis:
      "UPSC turns 'well-known conventions' into 'mandatory provisions' (Statement 2) and inserts subtle role reversals (Speaker moving a motion in Statement 4). Read every procedural qualifier word-for-word.",
    citations: [
      {
        title: "Rules of Procedure and Conduct of Business in Lok Sabha — Rule 8",
        reference: "Lok Sabha Secretariat (16th Edition)",
      },
      {
        title: "Constitution of India — Articles 93 & 95(1)",
        reference: "Part V, Chapter II (Parliament)",
      },
    ],
    is_verified: true,
  },
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "What is the position of the Right to Property in India?",
    options: {
      A: "Legal right available to citizens only",
      B: "Legal right available to any person",
      C: "Fundamental Right available to citizens only",
      D: "Neither Fundamental Right nor legal right",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "The 44th Constitutional Amendment Act, 1978 omitted Article 19(1)(f) and Article 31 from Part III and inserted Article 300A in Part XII: 'No person shall be deprived of his property save by authority of law.' Because Article 300A uses the word 'person' rather than 'citizen', it is a constitutional/legal right available to any person (including non-citizens).",
    fact_breakdown: [
      {
        label: "Right status",
        status: "true",
        detail: "Constitutional / legal right under Article 300A (not a Fundamental Right).",
      },
      {
        label: "Beneficiary scope ('any person' vs 'citizens only')",
        status: "true",
        detail: "Text of Article 300A says 'No person', unlike Articles 15, 16, 19, 29, 30 which specify 'citizen'.",
      },
    ],
    trap_type: "Bare-Act Exact Word Trap ('Person' vs 'Citizen')",
    trap_analysis:
      "Candidates stop thinking once they see 'Legal right' in Option A and rush to mark it without reading the second half ('citizens only' vs 'any person').",
    citations: [
      {
        title: "Constitution of India — Article 300A (44th Amendment Act, 1978)",
        reference: "Part XII, Chapter IV — Right to Property",
      },
    ],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "GS Paper I",
    question_number: null,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "With reference to the Indian economy, consider the following statements:\n1. If the inflation is too high, Reserve Bank of India (RBI) is likely to buy government securities.\n2. If the rupee is rapidly depreciating, RBI is likely to sell dollars in the market.\n3. If interest rates in the USA or European Union were to fall, that is likely to induce RBI to buy dollars.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2022 Answer Key",
    explanation:
      "When inflation is high, RBI tightens liquidity by SELLING government securities via Open Market Operations (OMO), so Statement 1 is wrong. When INR depreciates rapidly, RBI sells USD from forex reserves to increase dollar supply and absorb rupees (Statement 2 is correct). When US/EU interest rates fall, FPI/capital inflows surge into emerging markets like India, creating INR appreciation pressure; RBI buys excess dollars to curb sharp rupee appreciation and build reserves (Statement 3 is correct).",
    fact_breakdown: [
      {
        label: "Statement 1 (High inflation -> Buy G-secs)",
        status: "false",
        detail: "Buying G-secs injects rupee liquidity and worsens inflation; RBI SELLS G-secs to absorb liquidity.",
      },
      {
        label: "Statement 2 (Depreciating INR -> Sell USD)",
        status: "true",
        detail: "Selling USD increases dollar supply in the forex market and reduces INR liquidity, arresting depreciation.",
      },
      {
        label: "Statement 3 (US/EU rate cut -> RBI buys USD)",
        status: "true",
        detail: "Lower foreign rates drive capital inflows into India; RBI absorbs excess dollars to prevent export-hurting INR appreciation.",
      },
    ],
    trap_type: "Directional Mechanism Reversal (Buy vs Sell)",
    trap_analysis:
      "Statement 3 feels counter-intuitive at speed unless you trace the two-step chain: Foreign rate cut -> FPI inflow to India -> INR appreciation -> RBI buys USD.",
    citations: [
      {
        title: "RBI Monetary Policy & Open Market Operations Framework",
        reference: "Reserve Bank of India — Functions & Working",
        url: "https://www.rbi.org.in/",
      },
    ],
    is_verified: true,
  },
  {
    year: 2020,
    paper: "GS Paper I",
    question_number: null,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "If you withdraw ₹1,00,000 in cash from your Demand Deposit Account at your bank, the immediate effect on aggregate money supply in the economy will be",
    options: {
      A: "to reduce it by ₹1,00,000",
      B: "to increase it by ₹1,00,000",
      C: "to increase it by more than ₹1,00,000",
      D: "to leave it unchanged",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2020 Answer Key",
    explanation:
      "Aggregate money supply (M1 or M3) equals Currency with the Public (C) + Demand Deposits with Banks (DD) [+ Time Deposits in M3]. Withdrawing ₹1,00,000 in cash decreases DD by ₹1,00,000 and increases Currency with the Public (C) by ₹1,00,000 simultaneously. Thus, the IMMEDIATE net change in M1/M3 is zero.",
    fact_breakdown: [
      {
        label: "M1 Formula (C + DD + OD)",
        status: "true",
        detail: "Cash in hand (+1L) and Demand Deposit (-1L) are both components of M1 and M3, cancelling out immediately.",
      },
      {
        label: "Key qualifier: 'Immediate effect'",
        status: "nuance",
        detail: "Reserve contraction only reduces credit creation over subsequent banking rounds, not immediately.",
      },
    ],
    trap_type: "Time-Horizon Trap ('Immediate' vs Multi-Round Multiplier)",
    trap_analysis:
      "Economy learners reflexively invoke the Money Multiplier (reducing bank reserves contracts money supply) and ignore the word 'immediate' in the stem.",
    citations: [
      {
        title: "NCERT Class XII Macroeconomics — Chapter 3: Money and Banking",
        reference: "Sections on Money Supply Measures (M1, M3)",
      },
      {
        title: "RBI Working Group on Money Supply: Analytics and Methodology",
        reference: "Reserve Bank of India Monetary Aggregates",
      },
    ],
    is_verified: true,
  },
  {
    year: 2020,
    paper: "GS Paper I",
    question_number: null,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "With reference to Indian elephants, consider the following statements:\n1. The leader of an elephant group is a female.\n2. The maximum gestation period can be 22 months.\n3. An elephant can normally go on calving till the age of 40 years only.\n4. Among the States in India, the highest elephant population is in Kerala.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 4 only",
      C: "3 only",
      D: "1, 3 and 4 only",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2020 Answer Key",
    explanation:
      "Asian elephant herds are matriarchal, led by the oldest female (Statement 1 correct), and elephants have the longest mammalian gestation of 18-22 months (Statement 2 correct). However, female elephants remain reproductive until roughly 60-65 years of age (Statement 3 false), and Karnataka has the highest wild elephant population in India according to the MoEFCC All-India Synchronised Elephant Census, ahead of Assam and Kerala (Statement 4 false).",
    fact_breakdown: [
      {
        label: "Statement 1 (Female matriarch)",
        status: "true",
        detail: "Elephant herds are structured as matriarchal family units.",
      },
      {
        label: "Statement 2 (Up to 22 months gestation)",
        status: "true",
        detail: "Longest gestation period of all land mammals (20-22 months).",
      },
      {
        label: "Statement 3 (Calving till 40 years only)",
        status: "false",
        detail: "Asian elephants reproduce well into their 50s and early 60s.",
      },
      {
        label: "Statement 4 (Highest in Kerala)",
        status: "false",
        detail: "Karnataka (~6,049) ranks 1st, followed by Assam (~5,719) and Kerala (~3,054) in the 2017 MoEFCC Census.",
      },
    ],
    trap_type: "Species Fact Sheet + State Rank Swap",
    trap_analysis:
      "Kerala's cultural prominence with elephants makes Statement 4 look obvious, yet Karnataka holds nearly double Kerala's wild elephant population.",
    citations: [
      {
        title: "All-India Synchronised Elephant Population Estimation (2017)",
        reference: "Project Elephant Division, Ministry of Environment, Forest and Climate Change (MoEFCC)",
      },
    ],
    is_verified: true,
  },
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "Which one of the following is a filter feeder?",
    options: {
      A: "Catfish",
      B: "Octopus",
      C: "Oyster",
      D: "Pelican",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "Oysters are bivalve molluscs that feed by pumping large volumes of water over their gills to strain out microscopic plankton and suspended organic particles—the textbook definition of filter feeding (suspension feeding). Catfish are bottom-dwelling omnivores/scavengers, octopuses are active predators, and pelicans are plunge-diving/scoop-feeding birds.",
    fact_breakdown: [
      {
        label: "Oyster (Bivalve Mollusc)",
        status: "true",
        detail: "Uses ciliated gills to trap plankton from pumped water; key ecological water clarifiers.",
      },
      {
        label: "Catfish / Octopus / Pelican",
        status: "false",
        detail: "Active predators or benthic scavengers rather than suspension filter feeders.",
      },
    ],
    trap_type: "Ecology Mechanism Distinction (Scoop vs Filter Feeder)",
    trap_analysis:
      "Some candidates confuse pelicans scooping water in their gular pouch with aquatic filter feeding; true filter feeders strain suspended micro-particles through specialized gill/baleen structures.",
    citations: [
      {
        title: "NCERT Class XI Biology / Marine Bivalve Ecology",
        reference: "Phylum Mollusca — Suspension/Filter Feeding Mechanism",
      },
    ],
    is_verified: true,
  },
  {
    year: 2023,
    paper: "GS Paper I",
    question_number: null,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-IND",
    question_style: "pair_counting",
    stem: "Consider the following pairs:\n1. Kamarajar Port : First major port in India registered as a company\n2. Mundra Port : Largest privately owned port in India\n3. Visakhapatnam Port : Largest container port in India\n\nHow many of the above pairs are correctly matched?",
    options: {
      A: "Only one pair",
      B: "Only two pairs",
      C: "All three pairs",
      D: "None of the pairs",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2023 Answer Key",
    explanation:
      "Pair 1 is correct: Kamarajar (Ennore) Port Limited was corporatized under the Companies Act, 1956 as India's first corporate major port. Pair 2 is correct: Mundra Port (Gujarat, operated by Adani Ports) is India's largest privately owned commercial port. Pair 3 is incorrect: Jawaharlal Nehru Port (JNPT, Navi Mumbai) and Mundra lead India's container traffic—not Visakhapatnam.",
    fact_breakdown: [
      {
        label: "Pair 1 (Kamarajar / Ennore Port)",
        status: "true",
        detail: "First major port in India registered as a public limited company (incorporated 1999, commissioned 2001).",
      },
      {
        label: "Pair 2 (Mundra Port)",
        status: "true",
        detail: "India's largest private/non-major commercial port in Kutch, Gujarat.",
      },
      {
        label: "Pair 3 (Visakhapatnam Port)",
        status: "false",
        detail: "Major bulk/iron-ore East Coast port, NOT the largest container port (JNPT / Mundra lead container TEUs).",
      },
    ],
    trap_type: "Infrastructure Superlative Swap",
    trap_analysis:
      "Visakhapatnam is famous as a deep-water natural East Coast port, leading candidates to misremember it as the largest container port instead of JNPT/Mundra.",
    citations: [
      {
        title: "Ministry of Ports, Shipping and Waterways — Annual Report & Port Profiles",
        reference: "Government of India (Kamarajar Port Ltd & JNPA Statistics)",
      },
    ],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "GS Paper I",
    question_number: null,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-WLD",
    question_style: "standard",
    stem: "The term 'Levant' often heard in the news roughly corresponds to which of the following regions?",
    options: {
      A: "Region along the eastern Mediterranean shores",
      B: "Region along North African shores stretching from Egypt to Morocco",
      C: "Region along Persian Gulf and Horn of Africa",
      D: "The entire coastal areas of Mediterranean Sea",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2022 Answer Key",
    explanation:
      "Historically and geopolitically, 'the Levant' refers to the eastern Mediterranean littoral—encompassing modern Syria, Lebanon, Israel, Palestine, and Jordan (sometimes extending to parts of southern Turkey/Sinai). North Africa west of Egypt is the Maghreb.",
    fact_breakdown: [
      {
        label: "Option A (Eastern Mediterranean shores)",
        status: "true",
        detail: "Covers Syria, Lebanon, Israel, Palestine, Jordan along the eastern Mediterranean coast.",
      },
      {
        label: "Option B (Egypt to Morocco)",
        status: "false",
        detail: "That region (Tunisia, Algeria, Morocco, Libya, Mauritania) is known as the Maghreb.",
      },
    ],
    trap_type: "World Mapping Geopolitical Region Confusion",
    trap_analysis:
      "Confusing Levant (Eastern Mediterranean) with Maghreb (North-West Africa) or the entire Mediterranean basin.",
    citations: [
      {
        title: "Encyclopedia Britannica — 'Levant' Geographic Region",
        reference: "Historical & Contemporary Middle East Geography",
      },
    ],
    is_verified: true,
  },
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "History & Culture",
    syllabus_code: "PRE-GS1-HIS-ANC",
    question_style: "standard",
    stem: "With reference to Chausath Yogini Temple situated near Morena, consider the following statements:\n1. It is a circular temple built during the reign of Kachchhapaghata Dynasty.\n2. It is the only circular temple built in India.\n3. It was meant to promote the Vaishnava cult in the region.\n4. Its design has given rise to a popular belief that it was the inspiration behind the Indian Parliament building.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2",
      B: "2 and 3 only",
      C: "1 and 4",
      D: "2, 3 and 4",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "Built in the 11th century by Kachchhapaghata ruler Devapala at Mitawali near Morena (MP), the Chausath Yogini temple is circular (Statement 1 correct) and famously cited as inspiring the circular design of the old Indian Parliament building (Statement 4 correct). However, other circular Yogini temples exist in Hirapur and Ranipur-Jharial (Odisha) and Bhedaghat (MP) (Statement 2 false), and Yogini temples belong to the Shakta/Tantric tradition, not Vaishnavism (Statement 3 false).",
    fact_breakdown: [
      {
        label: "Statement 1 (Kachchhapaghata Dynasty)",
        status: "true",
        detail: "1055-1075 CE inscription attributes construction to Kachchhapaghata king Devapala.",
      },
      {
        label: "Statement 2 ('Only circular temple')",
        status: "false",
        detail: "Hirapur (Khurda, Odisha), Ranipur-Jharial (Balangir, Odisha), and Bhedaghat (Jabalpur) are also circular Yogini temples.",
      },
      {
        label: "Statement 3 (Vaishnava cult)",
        status: "false",
        detail: "Dedicated to 64 Yoginis (Shakta / Tantric Shaiva-Shakta tradition), NOT Vaishnava.",
      },
      {
        label: "Statement 4 (Parliament inspiration)",
        status: "true",
        detail: "Widely documented architectural parallel cited in ASI and Parliamentary heritage records.",
      },
    ],
    trap_type: "Extreme Word ('Only') + Sectarian Swap",
    trap_analysis:
      "Statement 2 fails on the classic absolute qualifier 'only', while Statement 3 swaps Shakta/Tantric worship for Vaishnava.",
    citations: [
      {
        title: "Archaeological Survey of India (ASI) — Ekattarso Mahadeva / Chausath Yogini Temple, Mitawali",
        reference: "ASI Bhopal Circle Protected Monument Record",
      },
    ],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "GS Paper I",
    question_number: null,
    subject: "History & Culture",
    syllabus_code: "PRE-GS1-HIS-ANC",
    question_style: "standard",
    stem: "In medieval India, the term 'Fanam' referred to:",
    options: {
      A: "Clothing",
      B: "Coins",
      C: "Ornaments",
      D: "Weapons",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2022 Answer Key",
    explanation:
      "Fanam (from Tamil/Malayalam 'Panam') was a small gold (and later silver/copper) coin widely used in South India—especially in the Vijayanagara Empire, Travancore, Cochin, and Mysore—between the 9th and 19th centuries, noted by travellers such as Abdur Razzaq.",
    fact_breakdown: [
      {
        label: "Fanam = Gold/Silver Coin",
        status: "true",
        detail: "Derived from 'Panam'; standard small-denomination currency in medieval South India.",
      },
    ],
    trap_type: "Pure Historical Terminology Recall",
    trap_analysis:
      "Cannot be deduced by conceptual logic—requires explicit NCERT/numismatic glossary retention.",
    citations: [
      {
        title: "NCERT Themes in Indian History & South Indian Numismatics",
        reference: "Vijayanagara & Travancore Coinage Records (Abdur Razzaq Accounts)",
      },
    ],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "GS Paper I",
    question_number: null,
    subject: "Science & Technology",
    syllabus_code: "PRE-GS1-SNT",
    question_style: "standard",
    stem: "With reference to 'Web 3.0', consider the following statements:\n1. Web 3.0 technology enables people to control their own data.\n2. In Web 3.0 world, there can be blockchain based social networks.\n3. Web 3.0 is operated by users collectively rather than a corporation.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2022 Answer Key",
    explanation:
      "Web 3.0 envisions a decentralized internet built on blockchains and cryptographic ownership, allowing self-sovereign data control (1), decentralized/blockchain-based social platforms (2), and community/DAO-led governance operated by users collectively rather than centralized Big Tech corporations (3).",
    fact_breakdown: [
      {
        label: "Statements 1, 2, and 3",
        status: "true",
        detail: "All three describe the core architectural principles of decentralized Web 3.0.",
      },
    ],
    trap_type: "Over-Skepticism on 'All Three' Emerging Tech Statements",
    trap_analysis:
      "Veterans sometimes over-doubt Statement 3 ('collectively rather than a corporation') thinking 'maybe some corporations still host nodes'; in UPSC S&T conceptual stems, 'enables / can / architecture principle' generally holds true.",
    citations: [
      {
        title: "World Economic Forum — Defining Web3 & Decentralized Governance",
        reference: "WEF Digital Economy & Blockchain Primers",
      },
    ],
    is_verified: true,
  },
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "Science & Technology",
    syllabus_code: "PRE-GS1-SNT",
    question_style: "standard",
    stem: "The term 'ACE2' is talked about in the context of",
    options: {
      A: "genes introduced in the genetically modified plants",
      B: "development of India's own satellite navigation system",
      C: "radio collars for wildlife tracking",
      D: "spread of viral diseases",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "ACE2 (Angiotensin-Converting Enzyme 2) is a membrane-bound protein on human cells (especially lungs, heart, and kidneys) that acts as the functional host receptor to which the spike (S) protein of SARS-CoV-2 binds to enter human cells.",
    fact_breakdown: [
      {
        label: "ACE2 Receptor",
        status: "true",
        detail: "Cell-surface receptor exploited by coronaviruses (SARS-CoV and SARS-CoV-2) for viral entry.",
      },
    ],
    trap_type: "Acronym Mismatch",
    trap_analysis:
      "ACE2 sounds like an aerospace/GM-gene acronym if you didn't track basic Covid-19 virology terms in current science news.",
    citations: [
      {
        title: "ICMR & WHO Scientific Briefs on SARS-CoV-2 Pathogenesis",
        reference: "Role of ACE2 Receptor in Viral Entry (2020-2021)",
      },
    ],
    is_verified: true,
  },
];
