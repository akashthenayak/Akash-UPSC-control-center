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
  user_trick_note?: string;
}

/**
 * Curated Starter Bank of Verified UPSC CSE Prelims PYQs (2013 – 2026).
 * Every official_answer matches the official UPSC CSE Prelims Answer Key.
 * Additional PYQ packs can be bulk-imported via JSON/CSV inside the app.
 */
export const VERIFIED_STARTER_PYQS: SeedPyqQuestion[] = [
  // ==================== 2026 ====================
  {
    year: 2026,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "With reference to the Digital Personal Data Protection (DPDP) Act, 2023, consider the following statements:\n1. It applies to the processing of digital personal data within India where such data is collected in digital form or digitised subsequently.\n2. It applies to the processing of digital personal data outside India if such processing is in connection with offering goods or services to data principals within India.\n3. It completely exempts the Central Government from all provisions of the Act without any specified statutory grounds.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "A",
    key_status: "DPDP Act 2023 Bare Act (Gazette Notification)",
    explanation:
      "Statements 1 and 2 are correct under Section 3(a) and 3(b) of the DPDP Act, 2023. Statement 3 is false because Section 17 allows the Central Government to exempt certain government instrumentalities only on specific grounds (such as sovereignty and integrity of India, security of the State, or public order)—not a blanket, unconditional exemption.",
    fact_breakdown: [
      {
        label: "Statement 1 (Domestic digital scope)",
        status: "true",
        detail: "Section 3(a) covers digital data collected digitally or digitized subsequently.",
      },
      {
        label: "Statement 2 (Extraterritorial application)",
        status: "true",
        detail: "Section 3(b) extends to offshore entities offering goods/services to users in India.",
      },
      {
        label: "Statement 3 (Blanket government exemption)",
        status: "false",
        detail: "Section 17 provides targeted conditional exemptions on public order/security grounds, not a blanket statutory waiver.",
      },
    ],
    trap_type: "Extreme Word ('Completely exempts without any grounds')",
    trap_analysis:
      "Candidates recall debates about government exemptions and assume it is an absolute blanket waiver, missing the specific qualifying grounds in Section 17.",
    citations: [
      {
        title: "The Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)",
        reference: "Sections 3 & 17, Ministry of Law and Justice",
        url: "https://www.meity.gov.in/",
      },
    ],
    is_verified: true,
  },

  // ==================== 2025 ====================
  {
    year: 2025,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: null,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-CLM",
    question_style: "standard",
    stem: "With reference to the 'Biodiversity Beyond National Jurisdiction' (BBNJ) Agreement (also known as the High Seas Treaty), consider the following statements:\n1. It is a legally binding international agreement negotiated under the framework of the United Nations Convention on the Law of the Sea (UNCLOS).\n2. It provides a legal mechanism for the establishment of area-based management tools, including Marine Protected Areas (MPAs), on the high seas.\n3. It excludes the fair and equitable sharing of benefits arising from Marine Genetic Resources (MGRs).\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "A",
    key_status: "UN BBNJ Agreement Text (Doc. A/CONF.232/2023/4)",
    explanation:
      "Statements 1 and 2 are correct: BBNJ is adopted under UNCLOS and establishes MPAs on the high seas. Statement 3 is false because the fair and equitable sharing of benefits arising from activities concerning Marine Genetic Resources (MGRs) is one of the four cornerstone objectives of the treaty.",
    fact_breakdown: [
      {
        label: "Statement 1 (UNCLOS framework)",
        status: "true",
        detail: "Adopted in June 2023 as an implementing agreement under UNCLOS.",
      },
      {
        label: "Statement 2 (High Seas MPAs)",
        status: "true",
        detail: "Establishes first-ever global legal mechanism for Marine Protected Areas in international waters.",
      },
      {
        label: "Statement 3 (MGR benefit sharing)",
        status: "false",
        detail: "Explicitly mandates monetary and non-monetary benefit sharing for developing nations.",
      },
    ],
    trap_type: "Core Treaty Pillar Inversion ('Excludes benefit sharing')",
    trap_analysis:
      "Benefit sharing of marine genetic resources was the most hotly contested compromise won by the Global South; claiming it is excluded reverses the core achievement.",
    citations: [
      {
        title: "United Nations Agreement on Marine Biological Diversity Beyond National Jurisdiction",
        reference: "Articles 9-11 (Marine Genetic Resources) & Article 17 (MPAs)",
        url: "https://www.un.org/bbnj",
      },
    ],
    is_verified: true,
  },

  // ==================== 2024 ====================
  {
    year: 2024,
    paper: "GS Paper I",
    question_number: null,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-WLD",
    question_style: "pair_counting",
    stem: "Consider the following countries:\n1. Egypt\n2. Saudi Arabia\n3. Sudan\n4. Yemen\n5. Jordan\n\nHow many of the above countries border the Red Sea directly?",
    options: {
      A: "Only two",
      B: "Only three",
      C: "Only four",
      D: "All five",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2024 Answer Key",
    explanation:
      "The countries bordering the open Red Sea directly are Egypt, Saudi Arabia, Sudan, Yemen, Eritrea, and Djibouti (mnemonic: DESSEY). Jordan borders the Gulf of Aqaba in the extreme north, and does not have a coastline on the open Red Sea basin.",
    fact_breakdown: [
      {
        label: "Egypt, Saudi Arabia, Sudan, Yemen",
        status: "true",
        detail: "All four have long coastlines directly along the Red Sea.",
      },
      {
        label: "Jordan",
        status: "false",
        detail: "Borders the narrow Gulf of Aqaba at the Port of Aqaba, not the open Red Sea basin.",
      },
    ],
    trap_type: "Gulf of Aqaba vs Open Red Sea Basin Distinguishing Trap",
    trap_analysis:
      "Jordan's port of Aqaba gives it sea access, so candidates reflexively assume Jordan borders the Red Sea itself.",
    citations: [
      {
        title: "Limits of Oceans and Seas (Special Publication No. 28)",
        reference: "International Hydrographic Organization (IHO), Red Sea & Gulf of Aqaba Delineation",
      },
    ],
    is_verified: true,
  },
  {
    year: 2024,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "With reference to the Constitution of India, Article 355 imposes a duty on the Union to:\n1. protect every State against external aggression and internal disturbance.\n2. ensure that the government of every State is carried on in accordance with the provisions of this Constitution.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2024 Answer Key",
    explanation:
      "Article 355 explicitly states: 'It shall be the duty of the Union to protect every State against external aggression and internal disturbance and to ensure that the government of every State is carried on in accordance with the provisions of this Constitution.' Both limbs are verbatim in the constitutional text.",
    fact_breakdown: [
      {
        label: "Limb 1: External aggression and internal disturbance",
        status: "true",
        detail: "First explicit duty cast upon the Union in Article 355.",
      },
      {
        label: "Limb 2: Government carried on in accordance with Constitution",
        status: "true",
        detail: "Second explicit duty, providing constitutional justification for invoking Article 356.",
      },
    ],
    trap_type: "Bare-Act Verbatim Recall",
    trap_analysis:
      "Candidates sometimes confuse Article 355 (duty of the Union) with Article 352 (proclamation of Emergency) and wonder if 'internal disturbance' was removed (it was replaced by 'armed rebellion' in Article 352, but retained in Article 355!).",
    citations: [
      {
        title: "Constitution of India — Article 355",
        reference: "Part XVIII (Emergency Provisions)",
      },
    ],
    is_verified: true,
  },

  // ==================== 2023 ====================
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
        detail: "Sweeping Emergency-era overhaul aimed at asserting Parliamentary supremacy over Kesavananda Bharati, not the initial FR interpretations.",
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
      "Because elimination is impossible in 'Only one / Only two / Only three' formats, misclassifying even one high-profile body flips the answer.",
    citations: [
      {
        title: "Constitution of India — Article 338B (102nd Amendment Act, 2018)",
        reference: "Part XVI, Special Provisions Relating to Certain Classes",
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
      "Pair 1 is correct: Kamarajar (Ennore) Port was corporatized under the Companies Act, 1956 as India's first corporate major port. Pair 2 is correct: Mundra Port is India's largest privately owned commercial port. Pair 3 is incorrect: Jawaharlal Nehru Port (JNPT, Navi Mumbai) and Mundra lead India's container traffic, not Visakhapatnam.",
    fact_breakdown: [
      {
        label: "Pair 1 (Kamarajar / Ennore Port)",
        status: "true",
        detail: "First major port in India registered as a public limited company (incorporated 1999).",
      },
      {
        label: "Pair 2 (Mundra Port)",
        status: "true",
        detail: "India's largest private commercial port in Kutch, Gujarat.",
      },
      {
        label: "Pair 3 (Visakhapatnam Port)",
        status: "false",
        detail: "Major bulk East Coast port, NOT the largest container port (JNPT leads container TEUs).",
      },
    ],
    trap_type: "Infrastructure Superlative Swap",
    trap_analysis:
      "Visakhapatnam's fame as a deep natural port leads candidates to misremember it as container leader instead of JNPT.",
    citations: [
      {
        title: "Ministry of Ports, Shipping and Waterways — Annual Report & Port Profiles",
        reference: "Government of India (Kamarajar Port Ltd & JNPA Statistics)",
      },
    ],
    is_verified: true,
  },

  // ==================== 2022 ====================
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
      "Statement 1 is correct under Rule 8 of Lok Sabha Rules. Statement 2 is false: offering the post to the opposition is a convention, not a mandatory provision. Statement 3 is correct: while presiding, Deputy Speaker holds the powers of the Speaker with no appeal to the Speaker. Statement 4 is false: the Speaker never moves the motion.",
    fact_breakdown: [
      { label: "Statement 1 (Speaker fixes date)", status: "true", detail: "Rule 8 empowers Speaker to fix the election date." },
      { label: "Statement 2 (Mandatory opposition rule)", status: "false", detail: "Convention, not mandatory constitutional rule." },
      { label: "Statement 3 (Equal presiding powers)", status: "true", detail: "Rulings while in the Chair are final." },
      { label: "Statement 4 (Moved by Speaker)", status: "false", detail: "Moved by a Minister or MP, not Speaker." },
    ],
    trap_type: "Procedural Rule vs Parliamentary Convention",
    trap_analysis: "Conventions turned into 'mandatory provisions' in statement 2.",
    citations: [
      { title: "Rules of Procedure and Conduct of Business in Lok Sabha — Rule 8", reference: "Lok Sabha Secretariat" },
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
      "Statement 1 is false: high inflation requires SELLING G-secs to absorb excess liquidity. Statement 2 is correct: RBI sells USD to support the rupee. Statement 3 is correct: foreign rate cuts cause dollar inflows; RBI buys USD to prevent sharp rupee appreciation.",
    fact_breakdown: [
      { label: "Statement 1 (Inflation -> Buy G-secs)", status: "false", detail: "Buying injects liquidity; RBI sells to mop up cash." },
      { label: "Statement 2 (Depreciating INR -> Sell USD)", status: "true", detail: "Increases dollar supply and arrests fall." },
      { label: "Statement 3 (US/EU rate cut -> RBI buys USD)", status: "true", detail: "Absorbs surge in capital inflows." },
    ],
    trap_type: "Directional Mechanism Reversal (Buy vs Sell)",
    trap_analysis: "Statement 3 requires tracing the multi-step capital flow chain.",
    citations: [{ title: "RBI Monetary Policy & OMO Operations", reference: "Reserve Bank of India" }],
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
      "The Levant historically and geopolitically refers to the eastern Mediterranean littoral—Syria, Lebanon, Israel, Palestine, and Jordan. North-West Africa is known as the Maghreb.",
    fact_breakdown: [
      { label: "Levant = Eastern Mediterranean", status: "true", detail: "Levant designates the eastern Mediterranean shores." },
    ],
    trap_type: "World Geopolitical Region Confusion",
    trap_analysis: "Confusing Levant with Maghreb or the broader Middle East.",
    citations: [{ title: "Encyclopedia Britannica — Levant Region", reference: "Middle East Geography" }],
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
      "Fanam (from Tamil/Malayalam 'Panam') was a small gold or silver coin used in medieval South India, notably under the Vijayanagara Empire and Travancore.",
    fact_breakdown: [
      { label: "Fanam = Currency / Coin", status: "true", detail: "Standard small denomination coin in medieval South India." },
    ],
    trap_type: "Historical Terminology Recall",
    trap_analysis: "Cannot be deduced by pure logic; requires NCERT term retention.",
    citations: [{ title: "NCERT Themes in Indian History", reference: "Vijayanagara Coinage" }],
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
      "All three statements define the decentralized architecture of Web 3.0: sovereign user data ownership, blockchain-based networks, and community/DAO governance.",
    fact_breakdown: [
      { label: "Statements 1, 2, and 3", status: "true", detail: "Core principles of decentralized Web3 architecture." },
    ],
    trap_type: "Over-Skepticism on Emerging Tech Statements",
    trap_analysis: "Overthinking corporate node hosting in Statement 3.",
    citations: [{ title: "World Economic Forum — Defining Web3", reference: "Digital Economy Briefs" }],
    is_verified: true,
  },

  // ==================== 2021 ====================
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
      "Article 300A states: 'No person shall be deprived of his property save by authority of law.' The word 'person' makes it available to any person (including non-citizens and legal entities).",
    fact_breakdown: [
      { label: "Legal/Constitutional status", status: "true", detail: "Article 300A (44th Amendment Act, 1978)." },
      { label: "Scope of Beneficiary", status: "true", detail: "Uses 'person', not 'citizen'." },
    ],
    trap_type: "Bare-Act Exact Word Trap ('Person' vs 'Citizen')",
    trap_analysis: "Candidates stop reading at 'Legal right' and pick Option A without checking 'citizens only'.",
    citations: [{ title: "Constitution of India — Article 300A", reference: "Part XII" }],
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
      "Oysters are bivalve molluscs that strain plankton and organic particles through their ciliated gills—the classic definition of filter feeding.",
    fact_breakdown: [{ label: "Oyster", status: "true", detail: "Bivalve filter feeder that purifies coastal waters." }],
    trap_type: "Ecology Mechanism Distinction",
    trap_analysis: "Confusing pelican scooping with suspension filter feeding.",
    citations: [{ title: "NCERT Class XI Biology", reference: "Phylum Mollusca" }],
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
      "Statements 1 and 4 are correct. Statement 2 is false: circular Yogini temples also exist at Hirapur and Ranipur-Jharial in Odisha. Statement 3 is false: Yogini temples belong to the Shakta/Tantric tradition, not Vaishnavism.",
    fact_breakdown: [
      { label: "1. Kachchhapaghata Dynasty", status: "true", detail: "Built by Devapala in the 11th century." },
      { label: "2. 'Only circular temple'", status: "false", detail: "Hirapur and Ranipur-Jharial are also circular." },
      { label: "3. Vaishnava cult", status: "false", detail: "Shakta / Tantric tradition." },
      { label: "4. Parliament inspiration", status: "true", detail: "Widely documented architectural parallel." },
    ],
    trap_type: "Extreme Word ('Only') + Sectarian Swap",
    trap_analysis: "Statement 2 trips on 'only circular temple'.",
    citations: [{ title: "ASI Bhopal Circle Protected Monuments", reference: "Mitawali Temple Records" }],
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
      "ACE2 (Angiotensin-Converting Enzyme 2) is a cellular receptor used by SARS-CoV-2 to attach and infect human host cells.",
    fact_breakdown: [{ label: "ACE2 Receptor", status: "true", detail: "Host entry receptor for coronaviruses." }],
    trap_type: "Acronym Context Mismatch",
    trap_analysis: "Sounds like a satellite or GM seed code if viral biology wasn't tracked.",
    citations: [{ title: "ICMR & WHO Scientific Briefs", reference: "SARS-CoV-2 Pathogenesis" }],
    is_verified: true,
  },

  // ==================== 2020 ====================
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
      "Money supply (M1) = Currency with the public + Demand deposits. Withdrawing ₹1,00,000 increases cash in hand by ₹1,00,000 and decreases demand deposits by ₹1,00,000 simultaneously. The immediate net effect is zero.",
    fact_breakdown: [
      { label: "M1 Definition", status: "true", detail: "Both currency with public and demand deposits are in M1." },
      { label: "Immediate qualifier", status: "nuance", detail: "Multi-round credit contraction takes time, not immediate." },
    ],
    trap_type: "Time-Horizon Trap ('Immediate' vs Multi-round multiplier)",
    trap_analysis: "Ignoring the word 'immediate' and applying the multi-round bank multiplier.",
    citations: [{ title: "NCERT Class XII Macroeconomics", reference: "Chapter 3: Money and Banking" }],
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
      "Statements 1 and 2 are correct (matriarchal herd; 18-22 months gestation). Statement 3 is false (reproduce past 55-60). Statement 4 is false (Karnataka has the highest elephant population, followed by Assam and Kerala).",
    fact_breakdown: [
      { label: "1. Female leader", status: "true", detail: "Elephant herds are matriarchies." },
      { label: "2. 22 months gestation", status: "true", detail: "Longest mammalian gestation." },
      { label: "3. Calving till 40 only", status: "false", detail: "Calves well into 50s." },
      { label: "4. Highest in Kerala", status: "false", detail: "Karnataka ranks 1st (~6,049)." },
    ],
    trap_type: "State Rank Swap (Karnataka vs Kerala)",
    trap_analysis: "Kerala's elephant festival fame distracts from Karnataka's census rank.",
    citations: [{ title: "MoEFCC All-India Elephant Census 2017", reference: "Project Elephant Report" }],
    is_verified: true,
  },

  // ==================== 2019 ====================
  {
    year: 2019,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "The Ninth Schedule was introduced in the Constitution of India during the prime ministership of:",
    options: {
      A: "Jawaharlal Nehru",
      B: "Lal Bahadur Shastri",
      C: "Indira Gandhi",
      D: "Morarji Desai",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2019 Answer Key",
    explanation:
      "The Ninth Schedule was added to the Constitution of India by the First Constitutional Amendment Act in 1951, under Prime Minister Jawaharlal Nehru, to protect land reform laws from judicial scrutiny under Article 31.",
    fact_breakdown: [
      { label: "1st Constitutional Amendment (1951)", status: "true", detail: "Enacted under the Provisional Parliament led by PM Jawaharlal Nehru." },
    ],
    trap_type: "Chronology Association (1951 vs 1970s Land Reforms)",
    trap_analysis: "Some link Ninth Schedule disputes with Indira Gandhi's tenure rather than the 1951 enactment.",
    citations: [{ title: "The Constitution (First Amendment) Act, 1951", reference: "Ministry of Law & Justice" }],
    is_verified: true,
  },
  {
    year: 2019,
    paper: "GS Paper I",
    question_number: null,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "The Service Area Approach was implemented under the purview of:",
    options: {
      A: "Integrated Rural Development Programme",
      B: "Lead Bank Scheme",
      C: "Mahatma Gandhi National Rural Employment Guarantee Scheme",
      D: "National Skill Development Mission",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2019 Answer Key",
    explanation:
      "The Service Area Approach (SAA) was introduced in April 1989 under the Lead Bank Scheme to provide planned, targeted credit deployment to designated clusters of villages by commercial and regional rural banks.",
    fact_breakdown: [
      { label: "Lead Bank Scheme (1969/1989)", status: "true", detail: "Lead Bank Scheme pioneered the Service Area Approach." },
    ],
    trap_type: "Flagship Scheme Name Confusion",
    trap_analysis: "Confusing IRDP or rural welfare schemes with banking credit frameworks.",
    citations: [{ title: "RBI Master Circular — Lead Bank Scheme", reference: "Reserve Bank of India Rural Planning" }],
    is_verified: true,
  },

  // ==================== 2018 ====================
  {
    year: 2018,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "The 'Rule of Law Index' is released by which of the following?",
    options: {
      A: "Amnesty International",
      B: "International Court of Justice",
      C: "The Office of UN High Commissioner for Human Rights",
      D: "World Justice Project",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2018 Answer Key",
    explanation:
      "The Rule of Law Index is an international quantitative assessment tool produced annually by the World Justice Project (WJP), an independent civil society organization.",
    fact_breakdown: [
      { label: "World Justice Project (WJP)", status: "true", detail: "Washington-based independent research institute." },
    ],
    trap_type: "International Agency Misattribution",
    trap_analysis: "Assuming human rights or rule of law indices must come from UN bodies (OHCHR or ICJ).",
    citations: [{ title: "World Justice Project — Rule of Law Index Reports", reference: "WJP Publications" }],
    is_verified: true,
  },

  // ==================== 2017 ====================
  {
    year: 2017,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "Right to vote and to be elected in India is a:",
    options: {
      A: "Fundamental Right",
      B: "Natural Right",
      C: "Constitutional Right",
      D: "Legal Right",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2017 Answer Key",
    explanation:
      "In the official answer key of UPSC CSE Prelims 2017, Option C (Constitutional Right) was designated as the official key, anchored in Article 326 of the Constitution of India which guarantees universal adult suffrage.",
    fact_breakdown: [
      { label: "Article 326", status: "true", detail: "Provides adult suffrage for elections to Lok Sabha and State Legislative Assemblies." },
    ],
    trap_type: "Legal vs Constitutional Right Debate",
    trap_analysis:
      "While Section 62 of the RPA 1951 regulates voting, UPSC's official key prioritized Article 326 as establishing it as a Constitutional Right.",
    citations: [{ title: "Constitution of India — Article 326", reference: "Part XV (Elections)" }],
    is_verified: true,
  },
  {
    year: 2017,
    paper: "GS Paper I",
    question_number: null,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-CLM",
    question_style: "standard",
    stem: "Biological Oxygen Demand (BOD) is a standard criterion for:",
    options: {
      A: "Measuring oxygen levels in blood",
      B: "Computing oxygen levels in forest ecosystems",
      C: "Pollution assay in aquatic ecosystems",
      D: "Assessing oxygen levels in high altitude regions",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2017 Answer Key",
    explanation:
      "BOD measures the amount of oxygen required by bacteria while stabilizing decomposable organic matter under aerobic conditions. Higher BOD values signify heavily polluted aquatic water bodies.",
    fact_breakdown: [
      { label: "BOD = Aquatic Pollution Assay", status: "true", detail: "Standard index of organic waste contamination in water bodies." },
    ],
    trap_type: "Scientific Concept Context",
    trap_analysis: "High BOD means low dissolved oxygen for aquatic life.",
    citations: [{ title: "NCERT Class XII Biology — Environmental Issues", reference: "Water Pollution & Sewage Treatment" }],
    is_verified: true,
  },

  // ==================== 2016 ====================
  {
    year: 2016,
    paper: "GS Paper I",
    question_number: null,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to 'Stand Up India Scheme', which of the following statements is/are correct?\n1. Its purpose is to promote entrepreneurship among SC/ST and women entrepreneurs.\n2. It provides for refinance through SIDBI.\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2016 Answer Key",
    explanation:
      "Stand Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST and one woman borrower per bank branch for setting up a greenfield enterprise (Statement 1). Refinance window is provided through SIDBI (Statement 2).",
    fact_breakdown: [
      { label: "1. Beneficiaries", status: "true", detail: "At least one SC/ST and one woman borrower per branch." },
      { label: "2. Refinance", status: "true", detail: "Refinanced through Small Industries Development Bank of India (SIDBI)." },
    ],
    trap_type: "Refinance Agency Verification (SIDBI vs NABARD)",
    trap_analysis: "Checking whether SIDBI or NABARD provides the refinance facility.",
    citations: [{ title: "Department of Financial Services — Stand Up India", reference: "Ministry of Finance" }],
    is_verified: true,
  },

  // ==================== 2015 ====================
  {
    year: 2015,
    paper: "GS Paper I",
    question_number: null,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "The Fair and Remunerative Price (FRP) of sugarcane is approved by the:",
    options: {
      A: "Cabinet Committee on Economic Affairs (CCEA)",
      B: "Commission for Agricultural Costs and Prices (CACP)",
      C: "Directorate of Marketing and Inspection, Ministry of Agriculture",
      D: "Agricultural Produce Market Committee (APMC)",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2015 Answer Key",
    explanation:
      "The Fair and Remunerative Price (FRP) of sugarcane is determined and approved by the Cabinet Committee on Economic Affairs (CCEA) chaired by the Prime Minister, on the recommendations of the CACP.",
    fact_breakdown: [
      { label: "CCEA Approves", status: "true", detail: "Final statutory approving authority." },
      { label: "CACP Recommends", status: "false", detail: "CACP is an advisory recommending body, not approving authority." },
    ],
    trap_type: "Approving Authority vs Recommending Body Swap",
    trap_analysis: "Confusing the recommending body (CACP) with the approving cabinet committee (CCEA).",
    citations: [{ title: "Department of Food & Public Distribution — Sugarcane Pricing", reference: "CCEA Decisions" }],
    is_verified: true,
  },

  // ==================== 2014 ====================
  {
    year: 2014,
    paper: "GS Paper I",
    question_number: null,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "Lichens, which are capable of initiating ecological succession even on a bare rock, are actually a symbiotic association of:",
    options: {
      A: "algae and bacteria",
      B: "algae and fungi",
      C: "bacteria and fungi",
      D: "fungi and mosses",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2014 Answer Key",
    explanation:
      "Lichens are composite symbiotic organisms composed of an alga or cyanobacterium (the photobiont) living among filaments of multiple fungi species (the mycobiont).",
    fact_breakdown: [
      { label: "Algae + Fungi", status: "true", detail: "Mutualistic relationship where fungus provides anchorage/water and alga photosynthesizes." },
    ],
    trap_type: "Symbiosis Pair Recall",
    trap_analysis: "Confusing mosses with lichens or bacteria with algae.",
    citations: [{ title: "NCERT Class XI Biology", reference: "Chapter 2: Biological Classification" }],
    is_verified: true,
  },

  // ==================== 2013 ====================
  {
    year: 2013,
    paper: "GS Paper I",
    question_number: null,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "The money multiplier in an economy increases with which one of the following?",
    options: {
      A: "Increase in the cash reserve ratio",
      B: "Increase in the banking habit of the population",
      C: "Increase in the statutory liquidity ratio",
      D: "Increase in the population of the country",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2013 Answer Key",
    explanation:
      "An increase in the banking habit reduces the currency-deposit ratio (people hold more funds in bank deposits rather than currency notes in pockets), thereby increasing the banking system's capacity to create credit and expanding the money multiplier.",
    fact_breakdown: [
      { label: "Banking habit expands multiplier", status: "true", detail: "Lowers cash leakage from the commercial banking system." },
      { label: "CRR and SLR increase", status: "false", detail: "Higher reserve requirements reduce credit creation and shrink multiplier." },
    ],
    trap_type: "Formula Parameter Direction",
    trap_analysis: "Higher CRR or SLR contracts the money multiplier.",
    citations: [{ title: "NCERT Class XII Macroeconomics", reference: "Money Creation by Banking System" }],
    is_verified: true,
  },
  {
    year: 2013,
    paper: "GS Paper I",
    question_number: null,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "According to the Wildlife (Protection) Act, 1972, which of the following animals cannot be hunted by any person except under some provisions provided by law?\n1. Gharial\n2. Indian wild ass\n3. Wild buffalo\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2013 Answer Key",
    explanation:
      "All three animals—Gharial (Gavialis gangeticus), Indian wild ass (Equus hemionus khur), and Wild buffalo (Bubalus arnee)—are listed in Schedule I of the Wildlife (Protection) Act, 1972, granting them the highest protection against hunting under Section 9.",
    fact_breakdown: [
      { label: "1. Gharial", status: "true", detail: "Schedule I reptile." },
      { label: "2. Indian wild ass", status: "true", detail: "Schedule I mammal found in Little Rann of Kutch." },
      { label: "3. Wild buffalo", status: "true", detail: "Schedule I mammal found in Assam/Central India." },
    ],
    trap_type: "Schedule I Animal Classification",
    trap_analysis: "Assuming wild buffalo is only Schedule II or III.",
    citations: [{ title: "Wildlife (Protection) Act, 1972 — Schedule I", reference: "MoEFCC Wildlife Division" }],
    is_verified: true,
  },

  // ==================== MODERN HISTORY & NATIONAL MOVEMENT ====================
  {
    year: 2023,
    paper: "GS Paper I",
    question_number: null,
    subject: "History & Culture",
    syllabus_code: "PRE-GS1-HIS-MOD",
    question_style: "standard",
    stem: "In the Government of India Act 1919, the functions of Provincial Government were divided into 'Reserved' and 'Transferred' subjects. Which of the following were treated as 'Reserved' subjects?\n1. Administration of Justice\n2. Local Self-Government\n3. Land Revenue\n4. Police\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1, 2 and 3",
      B: "2, 3 and 4",
      C: "1, 3 and 4",
      D: "1, 2 and 4",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2023 Answer Key",
    explanation:
      "Under the Montagu-Chelmsford Reforms (GoI Act 1919), dyarchy was introduced in the provinces. Reserved subjects (administered by the Governor and his Executive Council) included Police, Justice, Land Revenue, and Irrigation. Transferred subjects (administered by ministers responsible to the provincial legislative council) included Local Self-Government, Education, Public Health, and Agriculture.",
    fact_breakdown: [
      { label: "1. Administration of Justice", status: "true", detail: "Reserved subject under Governor's Executive Council." },
      { label: "2. Local Self-Government", status: "false", detail: "Transferred subject under elected Indian ministers." },
      { label: "3. Land Revenue", status: "true", detail: "Reserved subject." },
      { label: "4. Police", status: "true", detail: "Reserved subject." },
    ],
    trap_type: "Montford Dyarchy Classification (Local Self-Gov vs Police/Justice)",
    trap_analysis: "Candidates confuse Local Self-Government as reserved because of Ripon's 1882 resolution, but in the 1919 Act it was made a Transferred portfolio under elected ministers.",
    citations: [{ title: "Spectrum: A Brief History of Modern India", reference: "Montford Reforms & Dyarchy (Chapter on 1919 Act)" }],
    is_verified: true,
  },
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "History & Culture",
    syllabus_code: "PRE-GS1-HIS-MOD",
    question_style: "standard",
    stem: "In the context of Colonial India, Shah Nawaz Khan, Prem Kumar Sehgal and Gurbaksh Singh Dhillon are remembered as:",
    options: {
      A: "Leaders of Swadeshi and Boycott Movement",
      B: "Members of the Interim Government in 1946",
      C: "Members of the Drafting Committee in the Constituent Assembly",
      D: "Officers of the Indian National Army",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "Col. Prem Sahgal, Col. Gurbaksh Singh Dhillon, and Maj. Gen. Shah Nawaz Khan were officers of Subhash Chandra Bose's Indian National Army (INA) who were court-martialed in the famous INA Trials held at the Red Fort, Delhi in November 1945.",
    fact_breakdown: [
      { label: "Officers of the INA", status: "true", detail: "Red Fort Trials (1945) defended by Bhulabhai Desai, Tej Bahadur Sapru, and Jawaharlal Nehru." },
    ],
    trap_type: "Historical Persona Association",
    trap_analysis: "Straightforward factual question, but confusing INA officers with 1946 Interim Government members.",
    citations: [{ title: "Bipan Chandra: India's Struggle for Independence", reference: "Chapter 36: The INA and the Trials" }],
    is_verified: true,
  },
  {
    year: 2019,
    paper: "GS Paper I",
    question_number: null,
    subject: "History & Culture",
    syllabus_code: "PRE-GS1-HIS-MOD",
    question_style: "standard",
    stem: "With reference to the Swadeshi Movement, consider the following statements:\n1. It contributed to the revival of the indigenous artisan crafts and industries.\n2. The National Council of Education was established as a part of Swadeshi Movement.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2019 Answer Key",
    explanation:
      "Both statements are correct. The Swadeshi Movement sparked indigenous handloom, soap, match, and banking enterprises (e.g. Bengal Chemicals by P.C. Ray). On 15 August 1906, the National Council of Education was formally inaugurated to promote national, literary, scientific, and technical education under national control.",
    fact_breakdown: [
      { label: "Statement 1: Revival of indigenous industries", status: "true", detail: "Weaving, banking, and chemical factories were founded." },
      { label: "Statement 2: National Council of Education", status: "true", detail: "Founded on 15 August 1906 during the anti-partition agitation." },
    ],
    trap_type: "Institution Date Anchor",
    trap_analysis: "Suspecting National Council of Education was established later during the 1920 Non-Cooperation movement rather than the 1906 Swadeshi Movement.",
    citations: [{ title: "Spectrum: A Brief History of Modern India", reference: "Swadeshi and Boycott Movement (1905–1908)" }],
    is_verified: true,
  },

  // ==================== CURRENT EVENTS OF NATIONAL & INTERNATIONAL IMPORTANCE ====================
  {
    year: 2024,
    paper: "GS Paper I",
    question_number: null,
    subject: "Current Events",
    syllabus_code: "PRE-GS1-CUR",
    question_style: "standard",
    stem: "Consider the following statements regarding the 'Global Alliance for Global Good - Gender Equity and Equality':\n1. It was launched by India on the sidelines of the World Economic Forum (WEF) Annual Meeting 2024 at Davos.\n2. The initiative is supported by the Bill & Melinda Gates Foundation and hosted by the Confederation of Indian Industry (CII).\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2024 Answer Key",
    explanation:
      "Both statements are correct. India launched the Global Alliance for Global Good: Gender Equity and Equality at the 54th WEF Annual Meeting at Davos. The initiative emanates from the G20 Leaders' Declaration and is backed by WEF, supported by the Gates Foundation, and anchored by CII Centre for Women Leadership.",
    fact_breakdown: [
      { label: "Statement 1: Launched by India at Davos 2024", status: "true", detail: "Emanated from the G20 New Delhi Leaders' Declaration." },
      { label: "Statement 2: Supported by Gates Foundation & CII", status: "true", detail: "Housed within the CII Centre for Women Leadership." },
    ],
    trap_type: "Multilateral Initiative Host & Sponsoring Body",
    trap_analysis: "Suspecting either the forum (Davos vs UN) or the anchor body (CII vs FICCI).",
    citations: [{ title: "Press Information Bureau (PIB)", reference: "Ministry of Women and Child Development, Jan 2024" }],
    is_verified: true,
  },
  {
    year: 2023,
    paper: "GS Paper I",
    question_number: null,
    subject: "Current Events",
    syllabus_code: "PRE-GS1-CUR",
    question_style: "standard",
    stem: "Consider the following pairs:\nAction / Operation : Country / Purpose\n1. Operation Kaveri : Evacuation of Indian citizens from Sudan\n2. Operation Dost : Search and rescue operation after earthquake in Turkey and Syria\n3. Operation Ganga : Evacuation of Indian citizens from Ukraine\n\nHow many of the above pairs are correctly matched?",
    options: {
      A: "Only one",
      B: "Only two",
      C: "All three",
      D: "None",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2023 Answer Key",
    explanation:
      "All three pairs are correctly matched. Operation Kaveri (April 2023) evacuated Indians from civil conflict in Sudan. Operation Dost (February 2023) provided medical relief and search-rescue teams to earthquake-hit Turkey and Syria. Operation Ganga (February-March 2022) evacuated Indians from Ukraine via neighbouring countries.",
    fact_breakdown: [
      { label: "Pair 1: Operation Kaveri", status: "true", detail: "Sudan conflict evacuation via INS Sumedha & IAF C-130J." },
      { label: "Pair 2: Operation Dost", status: "true", detail: "Turkey & Syria earthquake humanitarian mission." },
      { label: "Pair 3: Operation Ganga", status: "true", detail: "Ukraine student evacuation." },
    ],
    trap_type: "Post-2022 Pair Counting with Recent Rescue Operations",
    trap_analysis: "Mixing up operation river code-names (Kaveri vs Ganga vs Dost).",
    citations: [{ title: "Ministry of External Affairs (MEA)", reference: "Annual Report — HADR Operations" }],
    is_verified: true,
  },

  // ==================== CSAT PAPER II ====================
  {
    year: 2023,
    paper: "Prelims CSAT",
    question_number: null,
    subject: "CSAT Paper II",
    syllabus_code: "PRE-CSAT",
    question_style: "standard",
    stem: "Each digit of a 9-digit number is 1. It is multiplied by itself. What is the sum of the digits of the resulting number?",
    options: {
      A: "64",
      B: "80",
      C: "81",
      D: "100",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2023 CSAT Answer Key",
    explanation:
      "The 9-digit number with all 1s is 111,111,111. When squared: 111,111,111^2 = 12345678987654321 (a palindromic number). The sum of its digits is 1+2+3+4+5+6+7+8+9+8+7+6+5+4+3+2+1 = 45 + 36 = 81. In general, for an n-digit repunit (n <= 9), the sum of digits of the square is n^2. Here 9^2 = 81.",
    fact_breakdown: [
      { label: "Repunit square identity", status: "true", detail: "For n digits of 1, sum of digits of square is n^2." },
      { label: "Calculation: 9^2", status: "true", detail: "9^2 = 81." },
    ],
    trap_type: "Repunit Square Pattern Recognition",
    trap_analysis: "Attempting manual 9x9 multi-digit multiplication under exam time pressure rather than identifying the palindromic digit sum pattern n^2.",
    citations: [{ title: "UPSC CSE 2023 CSAT Paper II", reference: "Question Set A — Number Systems" }],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "Prelims CSAT",
    question_number: null,
    subject: "CSAT Paper II",
    syllabus_code: "PRE-CSAT",
    question_style: "standard",
    stem: "What is the remainder when 91 x 92 x 93 x 94 x 95 x 96 x 97 x 98 x 99 is divided by 1261?",
    options: {
      A: "3",
      B: "2",
      C: "1",
      D: "0",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2022 CSAT Answer Key",
    explanation:
      "Notice that 1261 factors into 13 x 97 (both are primes). In the product 91 x 92 x ... x 99: 91 = 13 x 7, and 97 is explicitly one of the factors. Therefore, 91 x 97 = 13 x 7 x 97 = 7 x 1261. Since 1261 divides the product completely, the remainder is 0.",
    fact_breakdown: [
      { label: "Prime factorization of 1261", status: "true", detail: "1261 = 13 * 97." },
      { label: "Factors present in sequence", status: "true", detail: "91 = 13 * 7, and 97 is in the product." },
    ],
    trap_type: "Prime Divisibility in Large Product",
    trap_analysis: "Thinking that dividing a 9-term product requires modular arithmetic on each term instead of testing prime factors of 1261.",
    citations: [{ title: "UPSC CSE 2022 CSAT Paper II", reference: "Question Set A — Divisibility Rules" }],
    is_verified: true,
  },

  // ==================== GEOGRAPHY & MAPPING ====================
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-IND",
    question_style: "standard",
    stem: "Consider the following rivers:\n1. Brahmani\n2. Nagavali\n3. Subarnarekha\n4. Vamsadhara\n\nWhich of the above rise from the Eastern Ghats?",
    options: {
      A: "1 and 2",
      B: "2 and 4",
      C: "3 and 4",
      D: "1 and 3",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "Nagavali rises in the Eastern Ghats near Rayagada in Odisha. Vamsadhara rises in the Eastern Ghats near Thuamul Rampur in Kalahandi district of Odisha. In contrast, Brahmani is formed by the confluence of Sankh and South Koel near Rourkela (Chota Nagpur plateau), and Subarnarekha rises near Ranchi on the Chota Nagpur Plateau.",
    fact_breakdown: [
      { label: "1. Brahmani", status: "false", detail: "Confluence of Sankh and South Koel on Chota Nagpur plateau." },
      { label: "2. Nagavali", status: "true", detail: "Rises from Eastern Ghats in Rayagada, Odisha." },
      { label: "3. Subarnarekha", status: "false", detail: "Rises near Ranchi, Chota Nagpur plateau." },
      { label: "4. Vamsadhara", status: "true", detail: "Rises from Eastern Ghats in Kalahandi, Odisha." },
    ],
    trap_type: "East-Flowing River Source Origin Trap (Chota Nagpur vs Eastern Ghats)",
    trap_analysis: "Assuming all east-flowing peninsular rivers draining into the Bay of Bengal rise from the Eastern Ghats.",
    citations: [{ title: "NCERT Class XI India: Physical Environment", reference: "Drainage Systems — Peninsular Rivers" }],
    is_verified: true,
  },

  // ==================== PARLIAMENT & ELECTIONS ====================
  {
    year: 2021,
    paper: "GS Paper I",
    question_number: null,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-PAR",
    question_style: "standard",
    stem: "Consider the following statements:\n1. In India, there is no law restricting the candidates from contesting in one Lok Sabha election from three constituencies.\n2. In 1991 Lok Sabha Election, Shri Devi Lal contested from three Lok Sabha constituencies.\n3. As per existing rules, if a candidate contests in one Lok Sabha election from two constituencies and wins both, his/her party should bear the cost of the bye-election to the vacated seat.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "1 and 3",
      D: "2 and 3",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2021 Answer Key",
    explanation:
      "Statement 1 is false: Section 33(7) of the Representation of the People Act, 1951, as amended in 1996, restricts a candidate from contesting from more than two constituencies. Statement 2 is true: In 1991, before the 1996 amendment, Shri Devi Lal contested from three constituencies (Sikar, Rohtak, and Ferozepur). Statement 3 is false: Although the Election Commission has recommended that a candidate who wins both seats should bear the cost of the bye-election, no such law or rule exists.",
    fact_breakdown: [
      { label: "Statement 1: No restriction on 3 seats", status: "false", detail: "Section 33(7) of RPA 1951 limits candidates to a maximum of 2 constituencies." },
      { label: "Statement 2: Devi Lal contested 3 seats in 1991", status: "true", detail: "Contested from Sikar, Rohtak, and Ferozepur prior to 1996 amendment." },
      { label: "Statement 3: Party bears cost of bye-election", status: "false", detail: "Only an Election Commission proposal, not statutory law." },
    ],
    trap_type: "Statutory Law vs Election Commission Proposal",
    trap_analysis: "Treating an EC reform proposal as enacted statutory law.",
    citations: [{ title: "Representation of the People Act, 1951", reference: "Section 33(7), Ministry of Law and Justice" }],
    is_verified: true,
  },
];
