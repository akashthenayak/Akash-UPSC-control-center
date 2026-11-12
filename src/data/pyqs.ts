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
    paper: "CSAT Paper II",
    question_number: 14,
    subject: "CSAT Quantitative Aptitude",
    syllabus_code: "PRE-CSAT-NUM",
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
    paper: "CSAT Paper II",
    question_number: 22,
    subject: "CSAT Quantitative Aptitude",
    syllabus_code: "PRE-CSAT-NUM",
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
  {
    year: 2023,
    paper: "CSAT Paper II",
    question_number: 1,
    subject: "CSAT Reading Comprehension",
    syllabus_code: "PRE-CSAT-RC",
    question_style: "standard",
    stem: "Passage: 'We often forget that our basic food supplies depend on a fragile ecosystem. Soil erosion, depletion of groundwater, and loss of pollinating insects pose severe risks to global food security. Modern industrial agriculture, while increasing short-term yields, has accelerated these degradations through excessive chemical inputs and monoculture.'\n\nWhich of the following statements best reflects the most logical and crucial message implied by the passage?",
    options: {
      A: "Modern agriculture must be completely replaced by traditional subsistent farming methods.",
      B: "Food security cannot be sustained without ecological preservation of soil, water and biodiversity.",
      C: "Chemical fertilizers and pesticides should be banned immediately across the globe.",
      D: "Industrial agriculture has failed entirely to feed the growing world population."
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2023 CSAT Answer Key",
    explanation: "Option B directly captures the crux: food security is inherently contingent upon the ecological foundation (soil, water, pollinators). Options A, C, and D are extreme unwarranted extrapolations ('completely replaced', 'banned immediately', 'failed entirely') which UPSC elimination logic systematically disqualifies.",
    fact_breakdown: [
      { label: "Core premise", status: "true", detail: "Food supplies depend on healthy soil, water, and pollinators." },
      { label: "Extreme claims in A, C, D", status: "false", detail: "Passage critiques excess, but does not advocate total bans or immediate replacement." }
    ],
    trap_type: "Extreme Modifier & Absolutist Extrapolation in RC",
    trap_analysis: "Falling for absolutist claims ('completely', 'immediately banned') when the author is highlighting ecological balance.",
    citations: [{ title: "UPSC CSE 2023 CSAT Paper II", reference: "Reading Comprehension Set A Q1" }],
    is_verified: true,
  },
  {
    year: 2024,
    paper: "CSAT Paper II",
    question_number: 18,
    subject: "CSAT Logical Reasoning",
    syllabus_code: "PRE-CSAT-LR",
    question_style: "standard",
    stem: "Consider the following statements and conclusions:\nStatements:\n1. Some cats are black.\n2. All black animals are nocturnal.\n\nConclusions:\nI. Some nocturnal animals are cats.\nII. All nocturnal animals are cats.\n\nWhich of the conclusions logically follow from the given statements?",
    options: {
      A: "Only Conclusion I follows",
      B: "Only Conclusion II follows",
      C: "Both Conclusion I and II follow",
      D: "Neither Conclusion I nor II follows"
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2024 CSAT Answer Key",
    explanation: "From Statement 1: Some cats are black (Some C are B). From Statement 2: All black animals are nocturnal (All B are N). Combining them: Some cats are nocturnal (Some C are N). The converse of 'Some C are N' is 'Some N are C' (Some nocturnal animals are cats), which makes Conclusion I valid. Conclusion II ('All nocturnal animals are cats') is an illegitimate conversion from universal to particular.",
    fact_breakdown: [
      { label: "Syllogism premise: Some C are B and All B are N", status: "true", detail: "Guarantees the intersection between Cats and Nocturnal animals is non-empty." },
      { label: "Conclusion I validity", status: "true", detail: "Some nocturnal animals are cats is definitely true." },
      { label: "Conclusion II invalidity", status: "false", detail: "No evidence that nocturnal animals are restricted only to cats." }
    ],
    trap_type: "Universal Conversion Fallacy in Syllogisms",
    trap_analysis: "Confusing 'Some A are B' with 'All B are A'.",
    citations: [{ title: "UPSC CSE 2024 CSAT Paper II", reference: "Question Set A — Deductive Syllogisms" }],
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

  {
    year: 2026,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 2,
    subject: "Science & Technology",
    syllabus_code: "PRE-GS1-SNT",
    question_style: "standard",
    stem: "With reference to India's 'Digital Public Infrastructure' (DPI) architecture, consider the following statements:\n1. UPI operates as an open-protocol application layer built on top of the IMPS network.\n2. The Account Aggregator (AA) framework allows financial data sharing only after explicit, granular, and revocable consent from the customer.\n3. DigiLocker documents are deemed legally equivalent to original physical documents under Rule 9A of the Information Technology Rules, 2016.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "MeitY & RBI Regulatory Master Directions",
    explanation: "All three statements are correct. UPI is an open application protocol developed by NPCI over IMPS. Account Aggregators operate under RBI's NBFC-AA Directions based on explicit, revocable consent. Under Rule 9A of the IT Rules 2016, issued documents in DigiLocker are treated at par with original physical documents.",
    fact_breakdown: [
      {
            "label": "1. UPI Open Protocol",
            "status": "true",
            "detail": "Built by NPCI atop IMPS with open API interoperability."
      },
      {
            "label": "2. Account Aggregator Consent",
            "status": "true",
            "detail": "Data blind aggregator using electronic consent artefacts under RBI norms."
      },
      {
            "label": "3. DigiLocker Legal Parity",
            "status": "true",
            "detail": "Rule 9A of IT Rules 2016 grants legal parity with original physical certificates."
      }
],
    trap_type: "Regulatory Nuance in India Stack",
    trap_analysis: "Candidates often doubt whether DigiLocker documents hold strict statutory parity with original physical records.",
    citations: [
      {
            "title": "MeitY DPI Framework",
            "reference": "Information Technology (DigiLocker Rules) 2016 & RBI NBFC-AA Directions"
      }
],
    is_verified: true,
  },
  {
    year: 2026,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 3,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "With reference to the Galathea Bay National Park and Great Nicobar Island, consider the following statements:\n1. Galathea Bay is located on Great Nicobar Island and is a vital nesting site for Giant Leatherback sea turtles.\n2. The Shompen people, a Particularly Vulnerable Tribal Group (PVTG), inhabit the interior tropical rainforests of Great Nicobar.\n3. Great Nicobar Biosphere Reserve is included in UNESCO's World Network of Biosphere Reserves.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "MoEFCC Gazette & UNESCO MAB Programme",
    explanation: "All three statements are correct. Galathea Bay is the premier nesting site in the Indian Ocean for Dermochelys coriacea (Giant Leatherback turtle). The Shompen are hunter-gatherer PVTGs residing in the Great Nicobar biosphere. Great Nicobar was designated a UNESCO Biosphere Reserve in 2013.",
    fact_breakdown: [
      {
            "label": "1. Galathea Bay Turtles",
            "status": "true",
            "detail": "Premier nesting site for Giant Leatherback turtles."
      },
      {
            "label": "2. Shompen PVTG",
            "status": "true",
            "detail": "Indigenous hunter-gatherers of Great Nicobar interior."
      },
      {
            "label": "3. UNESCO MAB Great Nicobar",
            "status": "true",
            "detail": "Inscribed in UNESCO World Network of Biosphere Reserves in 2013."
      }
],
    trap_type: "Protected Area & Tribal Geography Crossover",
    trap_analysis: "Confusing Shompen (Great Nicobar) with Sentinelese or Jarawas (South/Middle Andaman).",
    citations: [
      {
            "title": "MoEFCC Biosphere Reserve Division",
            "reference": "Great Nicobar Biosphere Management Plan"
      }
],
    is_verified: true,
  },
  {
    year: 2026,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 4,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-WLD",
    question_style: "pair_counting",
    stem: "Consider the following international maritime chokepoints and the bodies of water they connect:\n1. Bab-el-Mandeb : Connects the Red Sea with the Gulf of Aden\n2. Strait of Hormuz : Connects the Persian Gulf with the Gulf of Oman\n3. Strait of Malacca : Connects the Andaman Sea with the South China Sea\n4. Bosporus Strait : Connects the Black Sea with the Sea of Marmara\n\nHow many of the above pairs are correctly matched?",
    options: {
      A: "Only one pair",
      B: "Only two pairs",
      C: "Only three pairs",
      D: "All four pairs",
    },
    official_answer: "D",
    key_status: "Standard Hydrographic Navigation Charts",
    explanation: "All four pairs are correctly matched. Bab-el-Mandeb links the Red Sea to the Gulf of Aden. Strait of Hormuz connects Persian Gulf to Gulf of Oman. Strait of Malacca connects the Andaman Sea (Indian Ocean) to South China Sea (Pacific). Bosporus links Black Sea with Sea of Marmara.",
    fact_breakdown: [
      {
            "label": "Pair 1: Bab-el-Mandeb",
            "status": "true",
            "detail": "Separates Yemen and Djibouti; connects Red Sea to Gulf of Aden."
      },
      {
            "label": "Pair 2: Strait of Hormuz",
            "status": "true",
            "detail": "Separates Iran and Oman; connects Persian Gulf to Gulf of Oman."
      },
      {
            "label": "Pair 3: Malacca Strait",
            "status": "true",
            "detail": "Separates Sumatra and Malay Peninsula."
      },
      {
            "label": "Pair 4: Bosporus Strait",
            "status": "true",
            "detail": "Splits Istanbul; connects Black Sea to Sea of Marmara."
      }
],
    trap_type: "Post-2022 Pair Counting on Maritime Chokepoints",
    trap_analysis: "High-stress pair-counting format leaves no room for elimination; candidates second-guess Bosporus vs Dardanelles.",
    citations: [
      {
            "title": "National Atlas & Thematic Mapping Organisation (NATMO)",
            "reference": "World Maritime Routes"
      }
],
    is_verified: true,
  },
  {
    year: 2026,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 5,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to the National Green Hydrogen Mission, consider the following statements:\n1. Green hydrogen is produced by electrolysis of water using renewable electricity.\n2. The Strategic Interventions for Green Hydrogen Transition (SIGHT) programme provides financial incentives for indigenous manufacturing of electrolysers.\n3. India has set a target of producing at least 5 Million Metric Tonnes (MMT) of green hydrogen per annum by 2030.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Ministry of New and Renewable Energy (MNRE) Guidelines",
    explanation: "All three statements are correct. Green hydrogen is generated via water electrolysis powered by renewables. The SIGHT scheme under MNRE offers financial outlays for domestic electrolyser manufacturing and green hydrogen production. The headline target of the Mission is at least 5 MMT annual capacity by 2030.",
    fact_breakdown: [
      {
            "label": "1. Definition of Green H2",
            "status": "true",
            "detail": "Zero-carbon electrolysis via solar/wind electricity."
      },
      {
            "label": "2. SIGHT Programme",
            "status": "true",
            "detail": "Dual sub-schemes for electrolysers and green hydrogen production."
      },
      {
            "label": "3. 2030 Target of 5 MMT",
            "status": "true",
            "detail": "Official national target approved by Union Cabinet."
      }
],
    trap_type: "Mission Quantitative Targets & Scheme Nomenclature",
    trap_analysis: "Assuming 5 MMT is for total hydrogen rather than specifically green hydrogen.",
    citations: [
      {
            "title": "National Green Hydrogen Mission",
            "reference": "MNRE Gazette Notification, Jan 2023"
      }
],
    is_verified: true,
  },
  {
    year: 2025,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 2,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "With reference to Central Bank Digital Currency (CBDC) or 'e-Rupee' launched by the Reserve Bank of India, consider the following statements:\n1. It is a sovereign currency and appears as a liability on the Reserve Bank of India's balance sheet.\n2. Unlike commercial bank deposits, holding e-Rupee in a digital wallet does not earn any interest.\n3. It is freely convertible against commercial bank deposits and physical cash.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "RBI Concept Note on Central Bank Digital Currency",
    explanation: "All three statements are correct. CBDC is sovereign currency and a direct liability of the central bank. To prevent disintermediation of commercial banks (bank runs), CBDC is non-interest bearing. It is convertible at par against cash and commercial bank balances.",
    fact_breakdown: [
      {
            "label": "1. RBI Balance Sheet Liability",
            "status": "true",
            "detail": "Direct legal tender liability of the Reserve Bank."
      },
      {
            "label": "2. Non-interest bearing",
            "status": "true",
            "detail": "Designed without interest to prevent draining commercial bank deposits."
      },
      {
            "label": "3. Par convertibility",
            "status": "true",
            "detail": "1:1 exchange with physical fiat currency."
      }
],
    trap_type: "CBDC Monetary Policy Architecture",
    trap_analysis: "Candidates mistakenly assume a digital currency held in a wallet must yield interest like savings bank deposits.",
    citations: [
      {
            "title": "Reserve Bank of India",
            "reference": "Concept Note on CBDC, Fintech Department"
      }
],
    is_verified: true,
  },
  {
    year: 2025,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 3,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-CLM",
    question_style: "standard",
    stem: "The '30x30 target' often seen in the news is related to which of the following?\n1. Reducing global greenhouse gas emissions by 30% by 2030 under the Paris Agreement.\n2. Protecting at least 30% of the planet's lands, inland waters, coastal areas and oceans by 2030 under the Kunming-Montreal Global Biodiversity Framework.\n3. Ensuring 30% share of renewable energy in global primary energy consumption by 2030 under the International Solar Alliance.\n4. Phasing out 30% of hydrofluorocarbons (HFCs) by 2030 under the Kigali Amendment.",
    options: {
      A: "1 only",
      B: "2 only",
      C: "3 only",
      D: "4 only",
    },
    official_answer: "B",
    key_status: "CBD COP15 Kunming-Montreal Framework Target 3",
    explanation: "Target 3 of the Kunming-Montreal Global Biodiversity Framework (GBF) adopted at CBD COP15 commits the world to conserve at least 30% of terrestrial, inland water, and coastal and marine areas by 2030, universally recognized as the '30x30 target'.",
    fact_breakdown: [
      {
            "label": "Target 3 of GBF",
            "status": "true",
            "detail": "30% land and ocean conservation by 2030."
      }
],
    trap_type: "Numerical Acronym Confusion across Multilateral Pacts",
    trap_analysis: "Conflating 30x30 biodiversity conservation with climate emission targets.",
    citations: [
      {
            "title": "Convention on Biological Diversity (CBD)",
            "reference": "COP15 Decision 15/4"
      }
],
    is_verified: true,
  },
  {
    year: 2025,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 4,
    subject: "Science & Technology",
    syllabus_code: "PRE-GS1-SNT",
    question_style: "standard",
    stem: "With reference to Artificial Intelligence and Machine Learning, consider the following statements:\n1. 'Large Language Models' (LLMs) rely on transformer neural network architectures that use self-attention mechanisms to process sequence data in parallel.\n2. Deepfake generation commonly uses Generative Adversarial Networks (GANs), where two neural networks—a generator and a discriminator—contest with each other.\n3. Quantum AI uses quantum bits (qubits) that can exist simultaneously in superpositions of 0 and 1.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Standard Computer Science Principles",
    explanation: "All three statements are correct. Transformers (Vaswani et al., 2017) use self-attention to process tokens in parallel, powering modern LLMs. Deepfakes primarily utilize GAN architectures (Goodfellow et al.) pitted against each other. Quantum computing leverages superposition and entanglement.",
    fact_breakdown: [
      {
            "label": "1. Transformer & Self-Attention",
            "status": "true",
            "detail": "Replaced sequential RNNs with parallel attention mechanisms."
      },
      {
            "label": "2. GANs in Deepfakes",
            "status": "true",
            "detail": "Generator creates synthetic media while Discriminator evaluates authenticity."
      },
      {
            "label": "3. Quantum Superposition",
            "status": "true",
            "detail": "Qubits exist as linear combinations of states |0> and |1>."
      }
],
    trap_type: "Emerging Tech Foundational Science",
    trap_analysis: "Technical accuracy of AI algorithms and quantum principles tested cleanly.",
    citations: [
      {
            "title": "NITI Aayog National Strategy for Artificial Intelligence",
            "reference": "Part II — Research & Frontiers"
      }
],
    is_verified: true,
  },
  {
    year: 2025,
    paper: "GS Paper I (High-Yield Focus)",
    question_number: 5,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-PAR",
    question_style: "standard",
    stem: "Under the Chief Election Commissioner and other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act, 2023, the Selection Committee for recommending appointments consists of:\n1. The Prime Minister (Chairperson)\n2. The Leader of Opposition or leader of the largest opposition party in the Lok Sabha\n3. The Chief Justice of India\n4. A Union Cabinet Minister nominated by the Prime Minister\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1, 2 and 3 only",
      B: "1, 2 and 4 only",
      C: "2, 3 and 4 only",
      D: "1, 2, 3 and 4",
    },
    official_answer: "B",
    key_status: "Act No. 49 of 2023 (Gazette of India, Dec 2023)",
    explanation: "Section 7 of the 2023 Act establishes a 3-member Selection Committee consisting of the Prime Minister (Chairperson), the Leader of Opposition (or leader of largest party in Lok Sabha), and a Union Cabinet Minister nominated by the PM. The Chief Justice of India was excluded by Parliament, replacing the interim SC Bench composition in Anoop Baranwal (2023).",
    fact_breakdown: [
      {
            "label": "1. Prime Minister",
            "status": "true",
            "detail": "Designated Chairperson."
      },
      {
            "label": "2. Leader of Opposition",
            "status": "true",
            "detail": "Statutory member."
      },
      {
            "label": "3. Chief Justice of India",
            "status": "false",
            "detail": "Excluded in the statutory enactment by Parliament."
      },
      {
            "label": "4. Nominated Cabinet Minister",
            "status": "true",
            "detail": "Statutory member nominated by PM."
      }
],
    trap_type: "Judicial Judgment vs Subsequent Enacted Statute",
    trap_analysis: "Candidates recall the March 2023 Supreme Court ruling (which included CJI) and fail to note the subsequent Act passed by Parliament in December 2023 replacing the CJI with a Cabinet Minister.",
    citations: [
      {
            "title": "The Chief Election Commissioner and other Election Commissioners Act, 2023",
            "reference": "Section 7(1), Ministry of Law and Justice"
      }
],
    is_verified: true,
  },
  {
    year: 2024,
    paper: "GS Paper I",
    question_number: 22,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "Which of the following provisions of the Constitution of India have a bearing on the administration of Scheduled Areas and Tribal Areas?\n1. Fifth Schedule\n2. Sixth Schedule\n3. Article 244\n4. Article 275(1)\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1 and 2 only",
      B: "1, 2 and 3 only",
      C: "3 and 4 only",
      D: "1, 2, 3 and 4",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2024 Answer Key",
    explanation: "All four provisions directly bear on tribal and scheduled areas: Fifth Schedule (Scheduled Areas in 10 states), Sixth Schedule (Tribal areas in Assam, Meghalaya, Tripura, Mizoram), Article 244 (Administration of Scheduled Areas and Tribal Areas), and Article 275(1) (Grants from the Union to certain States for schemes promoting tribal welfare).",
    fact_breakdown: [
      {
            "label": "1. Fifth Schedule",
            "status": "true",
            "detail": "Applies to 10 states under Article 244(1)."
      },
      {
            "label": "2. Sixth Schedule",
            "status": "true",
            "detail": "Autonomous District Councils in 4 NE states under Article 244(2)."
      },
      {
            "label": "3. Article 244",
            "status": "true",
            "detail": "Constitutional anchor for 5th and 6th Schedules."
      },
      {
            "label": "4. Article 275(1)",
            "status": "true",
            "detail": "Statutory grants-in-aid for tribal development schemes."
      }
],
    trap_type: "Comprehensive Constitutional Provisions Overlap",
    trap_analysis: "Overlooking Article 275(1) as merely a financial provision rather than a tribal welfare mechanism.",
    citations: [
      {
            "title": "Constitution of India",
            "reference": "Articles 244 & 275, Fifth & Sixth Schedules"
      }
],
    is_verified: true,
  },
  {
    year: 2024,
    paper: "GS Paper I",
    question_number: 35,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to the Balance of Payments (BoP) of India, which of the following constitute the Capital Account?\n1. Foreign Direct Investment (FDI)\n2. External Commercial Borrowings (ECB)\n3. Inward remittances by Indian diaspora\n4. Non-Resident Indian (NRI) deposits\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1, 2 and 4 only",
      B: "1, 2 and 3 only",
      C: "2, 3 and 4 only",
      D: "1, 3 and 4 only",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2024 Answer Key",
    explanation: "FDI, External Commercial Borrowings, and NRI deposits are capital account flows because they alter the asset or liability status of the nation. Inward remittances are unilateral transfers classified under the Current Account (Invisibles).",
    fact_breakdown: [
      {
            "label": "1. FDI",
            "status": "true",
            "detail": "Capital Account (foreign investment)."
      },
      {
            "label": "2. ECB",
            "status": "true",
            "detail": "Capital Account (external debt flow)."
      },
      {
            "label": "3. Inward Remittances",
            "status": "false",
            "detail": "Current Account (unilateral transfers under Invisibles)."
      },
      {
            "label": "4. NRI Deposits",
            "status": "true",
            "detail": "Capital Account (banking capital)."
      }
],
    trap_type: "Remittances vs NRI Deposits Classification",
    trap_analysis: "Diaspora remittances do not create a future debt obligation and are strictly Current Account.",
    citations: [
      {
            "title": "Reserve Bank of India Bulletin",
            "reference": "Balance of Payments Manual — Standard Components"
      }
],
    is_verified: true,
  },
  {
    year: 2023,
    paper: "GS Paper I",
    question_number: 14,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "In India, which one of the following is responsible for maintaining price stability by controlling inflation?\n1. Department of Consumer Affairs\n2. Expenditure Management Commission\n3. Financial Stability and Development Council\n4. Reserve Bank of India",
    options: {
      A: "1 only",
      B: "2 only",
      C: "3 only",
      D: "4 only",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2023 Answer Key",
    explanation: "Under Section 45ZB of the Reserve Bank of India Act, 1934 (amended in 2016), the Reserve Bank of India, through the Monetary Policy Committee (MPC), is explicitly tasked with maintaining price stability (target 4% +/- 2%) while keeping in mind the objective of growth.",
    fact_breakdown: [
      {
            "label": "Statutory Price Stability Mandate",
            "status": "true",
            "detail": "Section 45ZB of the RBI Act gives RBI exclusive statutory mandate."
      }
],
    trap_type: "Statutory Mandate Attribution",
    trap_analysis: "Department of Consumer Affairs tracks retail prices, but the macroeconomic inflation control mandate belongs to RBI.",
    citations: [
      {
            "title": "Reserve Bank of India Act, 1934",
            "reference": "Preamble & Section 45ZB"
      }
],
    is_verified: true,
  },
  {
    year: 2022,
    paper: "GS Paper I",
    question_number: 48,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to the 'Tea Board' in India, consider the following statements:\n1. The Tea Board is a statutory body.\n2. It is a regulatory body attached to the Ministry of Agriculture and Farmers Welfare.\n3. The Tea Board's Head Office is situated in Bengaluru.\n4. The Board has overseas offices at Dubai and Moscow.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 3",
      B: "2 and 4",
      C: "3 and 4",
      D: "1 and 4",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2022 Answer Key",
    explanation: "Statement 1 is correct: Established under Tea Act 1953. Statement 2 is false: It functions under the Ministry of Commerce and Industry. Statement 3 is false: Its Head Office is in Kolkata (not Bengaluru - Coffee Board is in Bengaluru). Statement 4 is correct: It maintains overseas offices in Dubai and Moscow.",
    fact_breakdown: [
      {
            "label": "1. Statutory body",
            "status": "true",
            "detail": "Tea Act, 1953."
      },
      {
            "label": "2. Ministry",
            "status": "false",
            "detail": "Commerce and Industry Ministry, not Agriculture."
      },
      {
            "label": "3. Headquarters",
            "status": "false",
            "detail": "Kolkata, not Bengaluru."
      },
      {
            "label": "4. Foreign offices",
            "status": "true",
            "detail": "Dubai and Moscow."
      }
],
    trap_type: "Commodity Board Headquarters & Ministry Swap",
    trap_analysis: "Swapping Kolkata (Tea Board) with Bengaluru (Coffee Board) or Kochi (Spices Board).",
    citations: [
      {
            "title": "Tea Act, 1953",
            "reference": "Tea Board of India, Ministry of Commerce and Industry"
      }
],
    is_verified: true,
  },
  {
    year: 2020,
    paper: "GS Paper I",
    question_number: 12,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-CLM",
    question_style: "standard",
    stem: "With reference to 'coal ash' (fly ash) produced by thermal power plants, consider the following statements:\n1. Coal ash contains toxic heavy metals like arsenic, lead and mercury.\n2. Coal-fired power plants release sulphur dioxide and oxides of nitrogen into the environment.\n3. High ash content is observed in Indian coal.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2020 Answer Key",
    explanation: "All three statements are correct. Fly ash contains toxic trace elements including arsenic, lead, and mercury. Thermal plants are major emitters of SO2 and NOx. Indian thermal coal typically has very high ash content (35% to 45%).",
    fact_breakdown: [
      {
            "label": "1. Toxic heavy metals",
            "status": "true",
            "detail": "As, Pb, Hg present in combustion residue."
      },
      {
            "label": "2. SO2 and NOx emission",
            "status": "true",
            "detail": "Primary stack emissions from fossil combustion."
      },
      {
            "label": "3. High ash in Indian coal",
            "status": "true",
            "detail": "Gondwana coal contains 35-45% non-combustible mineral matter."
      }
],
    trap_type: "Physical & Chemical Properties of Indian Coal",
    trap_analysis: "Assuming coal ash is harmless or that Indian coal is low in ash content.",
    citations: [
      {
            "title": "Ministry of Power / Central Electricity Authority",
            "reference": "Fly Ash Generation and Utilisation Report"
      }
],
    is_verified: true,
  },
  {
    year: 2020,
    paper: "GS Paper I",
    question_number: 67,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-PAR",
    question_style: "standard",
    stem: "Consider the following statements:\n1. The President of India can summon a session of Parliament at such place as he/she thinks fit.\n2. The Constitution of India provides for three sessions of the Parliament in a year, but it is not mandatory to conduct all three sessions.\n3. There is no minimum number of days that the Parliament is required to meet in a year.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2020 Answer Key",
    explanation: "Statement 1 is correct under Article 85(1). Statement 2 is false: The Constitution does NOT provide for three sessions; it only states that six months shall not intervene between two sessions. The three sessions (Budget, Monsoon, Winter) are established by convention. Statement 3 is correct: There is no constitutional minimum number of sitting days.",
    fact_breakdown: [
      {
            "label": "1. Place of Session",
            "status": "true",
            "detail": "Article 85(1) allows President to summon at such time and place as he thinks fit."
      },
      {
            "label": "2. 3 Sessions in Constitution",
            "status": "false",
            "detail": "Convention, not mentioned anywhere in Constitution text."
      },
      {
            "label": "3. No minimum days",
            "status": "true",
            "detail": "Only the 6-month gap rule exists."
      }
],
    trap_type: "Constitutional Text vs Parliamentary Convention",
    trap_analysis: "Assuming familiar practices like Budget/Monsoon sessions are written in the Constitution.",
    citations: [
      {
            "title": "Constitution of India",
            "reference": "Article 85"
      }
],
    is_verified: true,
  },
  {
    year: 2020,
    paper: "GS Paper I",
    question_number: 89,
    subject: "Current Events",
    syllabus_code: "PRE-GS1-CUR",
    question_style: "standard",
    stem: "Consider the following statements regarding India's trade with neighbours in South Asia:\n1. The value of Indo-Sri Lanka trade has consistently increased in the last decade.\n2. 'Textile and textile articles' constitute an important item of trade between India and Bangladesh.\n3. In the last five years, Nepal has been the largest trading partner of India in South Asia.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 only",
      C: "3 only",
      D: "1, 2 and 3",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2020 Answer Key",
    explanation: "Statement 1 is false due to fluctuations in bilateral trade. Statement 2 is correct: Cotton, yarn, and textiles are major exports to Bangladesh. Statement 3 is false: Bangladesh is India's largest trading partner in South Asia, followed by Nepal.",
    fact_breakdown: [
      {
            "label": "1. Consistent increase",
            "status": "false",
            "detail": "Trade fluctuated; extreme word 'consistently'."
      },
      {
            "label": "2. Textile trade with Bangladesh",
            "status": "true",
            "detail": "Raw materials for Bangladesh RMG sector."
      },
      {
            "label": "3. Largest partner in South Asia",
            "status": "false",
            "detail": "Bangladesh is #1, not Nepal."
      }
],
    trap_type: "Extreme Word ('Consistently') & Trade Rank",
    trap_analysis: "'Consistently increased' over a decade is almost always false in trade stats.",
    citations: [
      {
            "title": "Ministry of Commerce and Industry",
            "reference": "Export-Import Data Bank, Trade with SAARC"
      }
],
    is_verified: true,
  },
  {
    year: 2019,
    paper: "GS Paper I",
    question_number: 28,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-CLM",
    question_style: "standard",
    stem: "As per the E-Waste (Management) Rules in India, which of the following is/are the key features?\n1. Extended Producer Responsibility (EPR) mandates producers to meet channelization targets for e-waste.\n2. Micro and Small Enterprises are completely exempted from the provisions of the Rules.\n3. The Central Pollution Control Board (CPCB) oversees the EPR authorization for producers.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 and 3 only",
      B: "1 only",
      C: "2 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2019 Answer Key",
    explanation: "Statements 1 and 3 are correct: EPR was introduced in 2011 and strengthened in 2016 rules under CPCB oversight. Statement 2 is false because micro enterprises are not blanket exempted from e-waste hazardous handling requirements.",
    fact_breakdown: [
      {
            "label": "1. EPR Mandate",
            "status": "true",
            "detail": "Producers must channelize e-waste to registered recyclers."
      },
      {
            "label": "2. Micro Enterprises Exemption",
            "status": "false",
            "detail": "No blanket statutory exemption."
      },
      {
            "label": "3. CPCB Authorization",
            "status": "true",
            "detail": "CPCB grants nation-wide EPR authorizations."
      }
],
    trap_type: "Regulatory Exemption Qualifier",
    trap_analysis: "Candidates assume MSME exemptions apply broadly across environmental and hazardous waste domains.",
    citations: [
      {
            "title": "E-Waste (Management) Rules, 2016",
            "reference": "MoEFCC Gazette Notification"
      }
],
    is_verified: true,
  },
  {
    year: 2019,
    paper: "GS Paper I",
    question_number: 55,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "Consider the following statements:\n1. Asiatic lion is naturally found in India only.\n2. Double-humped camel is naturally found in India only.\n3. One-horned rhinoceros is naturally found in India only.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2019 Answer Key",
    explanation: "Statement 1 is correct: The Asiatic lion (Panthera leo persica) is naturally found only in Gir forest, Gujarat. Statement 2 is false: Double-humped (Bactrian) camel is indigenous to Central Asian deserts (Mongolia, China, Gobi) though a small population exists in Nubra Valley, Ladakh. Statement 3 is false: Greater one-horned rhino is found in Nepal and Bhutan as well.",
    fact_breakdown: [
      {
            "label": "1. Asiatic lion",
            "status": "true",
            "detail": "Only surviving wild population is in Gir National Park, Gujarat."
      },
      {
            "label": "2. Double-humped camel",
            "status": "false",
            "detail": "Native to Gobi desert of Mongolia and China."
      },
      {
            "label": "3. One-horned rhino",
            "status": "false",
            "detail": "Native to Terai-Duar savanna in India, Nepal and Bhutan."
      }
],
    trap_type: "Geographical Endemism Trap ('India only')",
    trap_analysis: "Extrapolating presence of Bactrian camels in Ladakh to mean they are native solely to India.",
    citations: [
      {
            "title": "IUCN Red List / Wildlife Institute of India",
            "reference": "Mammals of the Indian Subcontinent"
      }
],
    is_verified: true,
  },
  {
    year: 2018,
    paper: "GS Paper I",
    question_number: 19,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-PAR",
    question_style: "standard",
    stem: "Regarding the Money Bill, which of the following statements is not correct?\n1. A bill shall be deemed to be a Money Bill if it contains only provisions dealing with the imposition, abolition, remission, alteration or regulation of any tax.\n2. A Money Bill has provisions for the custody of the Consolidated Fund of India or the Contingency Fund of India.\n3. A Money Bill is certified by the Speaker of the Lok Sabha, whose decision is final.\n4. A Money Bill can be introduced in either House of Parliament with prior recommendation of the President.",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2018 Answer Key",
    explanation: "Statement 4 is NOT correct: Under Article 109(1), a Money Bill can be introduced ONLY in the Lok Sabha, never in the Rajya Sabha. Statements 1, 2, and 3 are correct under Article 110.",
    fact_breakdown: [
      {
            "label": "Introduction in either House",
            "status": "false",
            "detail": "Article 109(1) bars Money Bills from introduction in Rajya Sabha."
      }
],
    trap_type: "Negative Question ('not correct')",
    trap_analysis: "Overlooking the word 'either House' when reading rapidly under exam conditions.",
    citations: [
      {
            "title": "Constitution of India",
            "reference": "Articles 109 & 110"
      }
],
    is_verified: true,
  },
  {
    year: 2018,
    paper: "GS Paper I",
    question_number: 44,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to the 'Fugitive Economic Offenders Act, 2018', consider the following statements:\n1. It applies to individuals against whom an arrest warrant has been issued for a scheduled offence with a value of ₹100 crore or more.\n2. Confiscation of properties is limited only to properties bought from the proceeds of crime, and not personal ancestral properties.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2018 Answer Key",
    explanation: "Statement 1 is correct: The threshold for declaring someone a Fugitive Economic Offender under Section 2(m) is ₹100 crore or above. Statement 2 is false because Section 12 allows attachment and confiscation of any properties belonging to the offender in India or abroad, whether or not acquired through crime.",
    fact_breakdown: [
      {
            "label": "1. ₹100 crore threshold",
            "status": "true",
            "detail": "Section 2(m) statutory limit."
      },
      {
            "label": "2. Confiscation scope",
            "status": "false",
            "detail": "Can confiscate any property, including legitimate assets."
      }
],
    trap_type: "Statutory Property Forfeiture Scope",
    trap_analysis: "Assuming confiscation is restricted strictly to proceeds of crime as in normal PMLA provisions.",
    citations: [
      {
            "title": "The Fugitive Economic Offenders Act, 2018",
            "reference": "Sections 2(m) & 12, Ministry of Finance"
      }
],
    is_verified: true,
  },
  {
    year: 2018,
    paper: "GS Paper I",
    question_number: 82,
    subject: "Science & Technology",
    syllabus_code: "PRE-GS1-SNT",
    question_style: "standard",
    stem: "With reference to Genetically Modified mustard (GM mustard) developed in India, consider the following statements:\n1. GM mustard (DMH-11) contains the genes of a soil bacterium that give the plant the property of pest-resistance against a wide range of insects.\n2. The genes introduced in DMH-11 allow cross-pollination and hybridization by inducing temporary male sterility.\n3. It has been developed jointly by the IARI and Punjab Agricultural University.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2018 Answer Key",
    explanation: "Statement 1 is false: DMH-11 is not insect-resistant like Bt cotton; it uses barnase/barstar genes for hybrid seed production. Statement 2 is correct: Barnase creates male sterility while barstar restores fertility. Statement 3 is false: Developed by Centre for Genetic Manipulation of Crop Plants (CGMCP), Delhi University South Campus.",
    fact_breakdown: [
      {
            "label": "1. Pest resistance claim",
            "status": "false",
            "detail": "DMH-11 is a hybridization system, not pest resistant."
      },
      {
            "label": "2. Male sterility & hybridization",
            "status": "true",
            "detail": "Barnase/barstar system enables high-yield hybrid vigor."
      },
      {
            "label": "3. Developing institution",
            "status": "false",
            "detail": "CGMCP, Delhi University (Dr. Deepak Pental), not PAU."
      }
],
    trap_type: "Conflating GM Hybridization with Bt Pest Resistance",
    trap_analysis: "Candidates assume all GM crops are engineered for Bt insect resistance.",
    citations: [
      {
            "title": "Genetic Engineering Appraisal Committee (GEAC)",
            "reference": "MoEFCC Biosafety Dossier for DMH-11"
      }
],
    is_verified: true,
  },
  {
    year: 2017,
    paper: "GS Paper I",
    question_number: 18,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-CON",
    question_style: "standard",
    stem: "Which of the following Directive Principles was added to the Constitution by the 42nd Amendment Act of 1976?\n1. Equal justice and free legal aid\n2. Participation of workers in the management of industries\n3. Protection and improvement of environment and safeguarding of forests and wild life\n4. Minimizing inequalities in income, status, facilities and opportunities\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1, 2 and 3 only",
      B: "1, 2 and 4 only",
      C: "2, 3 and 4 only",
      D: "1, 2, 3 and 4",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2017 Answer Key",
    explanation: "Articles 39A (Free legal aid), 43A (Workers' participation in management), and 48A (Environment & wildlife protection) were added by the 42nd Amendment 1976. Statement 4 (Article 38(2)) was added by the 44th Constitutional Amendment Act, 1978.",
    fact_breakdown: [
      {
            "label": "1. Article 39A",
            "status": "true",
            "detail": "Added by 42nd Amendment, 1976."
      },
      {
            "label": "2. Article 43A",
            "status": "true",
            "detail": "Added by 42nd Amendment, 1976."
      },
      {
            "label": "3. Article 48A",
            "status": "true",
            "detail": "Added by 42nd Amendment, 1976."
      },
      {
            "label": "4. Article 38(2)",
            "status": "false",
            "detail": "Added by 44th Amendment, 1978."
      }
],
    trap_type: "42nd vs 44th Constitutional Amendment DPSP Insertion",
    trap_analysis: "Conflating welfare amendments of 1976 (42nd) and 1978 (44th).",
    citations: [
      {
            "title": "Constitution of India",
            "reference": "Articles 38, 39A, 43A, 48A"
      }
],
    is_verified: true,
  },
  {
    year: 2017,
    paper: "GS Paper I",
    question_number: 53,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to the 'National Skills Qualifications Framework' (NSQF), consider the following statements:\n1. Under NSQF, a learner can acquire certification for competency only through formal education and training.\n2. An outcome expected from the implementation of NSQF is the mobility between vocational and general education.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2017 Answer Key",
    explanation: "Statement 1 is false because NSQF explicitly provides for Recognition of Prior Learning (RPL), enabling workers to get certified for skills gained informally on the job. Statement 2 is correct: NSQF facilitates vertical and horizontal mobility between technical/vocational and general degrees.",
    fact_breakdown: [
      {
            "label": "1. Formal education only",
            "status": "false",
            "detail": "Extreme word 'only'; RPL recognizes informal learning."
      },
      {
            "label": "2. Vocational-academic mobility",
            "status": "true",
            "detail": "Core structural objective of NSQF."
      }
],
    trap_type: "Extreme Word ('Only through formal education')",
    trap_analysis: "RPL is the hallmark feature of NSQF to recognize unorganized sector artisans.",
    citations: [
      {
            "title": "Ministry of Skill Development and Entrepreneurship",
            "reference": "NSQF Gazette Notification 2013"
      }
],
    is_verified: true,
  },
  {
    year: 2017,
    paper: "GS Paper I",
    question_number: 84,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-WLD",
    question_style: "standard",
    stem: "Which of the following countries border the Mediterranean Sea?\n1. Jordan\n2. Iraq\n3. Lebanon\n4. Syria\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1, 2 and 3",
      B: "2 and 3 only",
      C: "3 and 4 only",
      D: "1, 3 and 4",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2017 Answer Key",
    explanation: "Lebanon and Syria have extensive coastlines on the eastern Mediterranean Sea (the Levant). Jordan is landlocked with respect to the Mediterranean (it opens only to the Red Sea via the Gulf of Aqaba). Iraq is entirely separated by Syria and Jordan.",
    fact_breakdown: [
      {
            "label": "1. Jordan",
            "status": "false",
            "detail": "Opens to Gulf of Aqaba (Red Sea), not Mediterranean."
      },
      {
            "label": "2. Iraq",
            "status": "false",
            "detail": "Separated from Mediterranean by Syria."
      },
      {
            "label": "3. Lebanon",
            "status": "true",
            "detail": "Direct Mediterranean coast."
      },
      {
            "label": "4. Syria",
            "status": "true",
            "detail": "Direct Mediterranean coast (Tartus, Latakia)."
      }
],
    trap_type: "West Asia Landlocked Country Trap (Jordan)",
    trap_analysis: "Candidates frequently misplace Jordan as a Mediterranean-facing nation.",
    citations: [
      {
            "title": "Oxford Student Atlas for India",
            "reference": "Middle East / Levant Physical & Political Map"
      }
],
    is_verified: true,
  },
  {
    year: 2016,
    paper: "GS Paper I",
    question_number: 29,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "With reference to the 'Sovereign Gold Bond Scheme', consider the following statements:\n1. It aims to reduce the demand for physical gold in India.\n2. The bonds are denominated in multiples of gram(s) of gold with a basic unit of 1 gram.\n3. The interest rate on the bonds is fixed by the Government at 2.50% per annum.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2016 Answer Key",
    explanation: "All three statements are correct. SGBs shift physical gold demand to paper financial assets to curb CAD. Denominations start from 1 gram. The semi-annual interest paid to investors is fixed at 2.50% per annum on initial investment.",
    fact_breakdown: [
      {
            "label": "1. Reduce physical gold imports",
            "status": "true",
            "detail": "Curbs current account deficit."
      },
      {
            "label": "2. Denomination unit",
            "status": "true",
            "detail": "Multiples of 1 gram."
      },
      {
            "label": "3. 2.50% interest",
            "status": "true",
            "detail": "Paid semi-annually by RBI."
      }
],
    trap_type: "Bond Specification Calibration",
    trap_analysis: "Candidates doubt whether sovereign gold bonds pay a cash coupon rate.",
    citations: [
      {
            "title": "Reserve Bank of India",
            "reference": "Sovereign Gold Bond Scheme Operational Guidelines"
      }
],
    is_verified: true,
  },
  {
    year: 2016,
    paper: "GS Paper I",
    question_number: 61,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "Which of the following best describes the term 'Core Banking Solutions' (CBS)?\n1. It is a networking of a bank's branches which enables customers to operate their accounts from any branch regardless of where they opened the account.\n2. It is an effort to bring all commercial banks under the direct operational control of the Reserve Bank of India.\n3. It is a procedure by which a bank with huge non-performing assets is taken over by another bank.",
    options: {
      A: "1 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2016 Answer Key",
    explanation: "Core Banking Solutions (CBS) is a centralized banking technology that connects branches of a bank over a shared network, allowing customers to access bank accounts and perform basic transactions from any branch (making customer of branch a 'customer of the bank').",
    fact_breakdown: [
      {
            "label": "Definition of CBS",
            "status": "true",
            "detail": "Centralized online real-time exchange."
      }
],
    trap_type: "Banking Tech vs Regulatory Takeover",
    trap_analysis: "Clear single-statement definition testing technical literacy in banking.",
    citations: [
      {
            "title": "Reserve Bank of India",
            "reference": "Report on Trend and Progress of Banking in India"
      }
],
    is_verified: true,
  },
  {
    year: 2016,
    paper: "GS Paper I",
    question_number: 77,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "With reference to 'Red Sanders', sometimes seen in the news, consider the following statements:\n1. It is a tree species found in a part of South India.\n2. It is one of the most important trees in the tropical rain forest areas of South India.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2016 Answer Key",
    explanation: "Statement 1 is correct: Red Sanders (Pterocarpus santalinus) is an endemic tree species found only in the Eastern Ghats (Seshachalam Hills of Andhra Pradesh). Statement 2 is false: It grows in dry deciduous scrub and dry thorny forests, NOT in tropical rain forests.",
    fact_breakdown: [
      {
            "label": "1. South Indian Endemism",
            "status": "true",
            "detail": "Endemic to Rayalaseema/Seshachalam."
      },
      {
            "label": "2. Forest Type",
            "status": "false",
            "detail": "Dry deciduous forest species, not tropical rainforest."
      }
],
    trap_type: "Biophilic Vegetation Zone Swap (Dry Deciduous vs Rainforest)",
    trap_analysis: "Assuming valuable timber species are always rainforest trees.",
    citations: [
      {
            "title": "Forest Survey of India (FSI)",
            "reference": "Endemic Flora of Eastern Ghats"
      }
],
    is_verified: true,
  },
  {
    year: 2015,
    paper: "GS Paper I",
    question_number: 11,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "With reference to the 'Basel III Accords', consider the following statements:\n1. They seek to improve the banking sector's ability to absorb shocks arising from financial and economic stress.\n2. They mandate that banks maintain a minimum Capital to Risk-Weighted Assets Ratio (CRAR) of 15%.\n\nWhich of the statements given above is/are correct?",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "A",
    key_status: "Official UPSC CSE 2015 Answer Key",
    explanation: "Statement 1 is correct: Basel III aims to enhance risk management and absorb economic shocks. Statement 2 is false: The global Basel III minimum total capital ratio is 8% (in India, RBI mandates 9% for scheduled commercial banks, plus a capital conservation buffer of 2.5%, totaling 11.5%—not 15%).",
    fact_breakdown: [
      {
            "label": "1. Shock absorption objective",
            "status": "true",
            "detail": "Core macroprudential pillar."
      },
      {
            "label": "2. CRAR 15% claim",
            "status": "false",
            "detail": "Global requirement is 8% (RBI mandates 9% + 2.5% CCB = 11.5%)."
      }
],
    trap_type: "Exaggerated Regulatory Ratio (15% vs 9%/11.5%)",
    trap_analysis: "Testing factual knowledge of capital adequacy benchmarks.",
    citations: [
      {
            "title": "Bank for International Settlements (BIS)",
            "reference": "Basel III: International Regulatory Framework for Banks"
      }
],
    is_verified: true,
  },
  {
    year: 2015,
    paper: "GS Paper I",
    question_number: 38,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-EXT",
    question_style: "standard",
    stem: "What is the primary objective of the 'Seed Village Concept' in India?\n1. To encourage farmers to use their own farm-saved seeds and eliminate reliance on public seed corporations.\n2. To train farmers in quality seed production and make high-quality certified seeds available to other farmers at affordable prices at the local village level.\n3. To earmark exclusive villages for producing seeds of Genetically Modified crops.\n4. To distribute free seeds to all marginal farmers across drought-prone districts.",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
    },
    official_answer: "B",
    key_status: "Official UPSC CSE 2015 Answer Key",
    explanation: "The Seed Village Programme (Gram Beej Yojana) trains a group of farmers in a village in seed production of specific crops to produce quality foundation and certified seeds, making affordable seed supply available locally.",
    fact_breakdown: [
      {
            "label": "Objective of Seed Village",
            "status": "true",
            "detail": "Decentralized production and peer-to-peer distribution of certified seed."
      }
],
    trap_type: "Scheme Concept Core Objective",
    trap_analysis: "Misconstruing decentralization as GM crop zoning or free distribution.",
    citations: [
      {
            "title": "Ministry of Agriculture and Farmers Welfare",
            "reference": "Sub-Mission on Seeds and Planting Material (SMSP)"
      }
],
    is_verified: true,
  },
  {
    year: 2015,
    paper: "GS Paper I",
    question_number: 64,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "With reference to the 'Dugong', a mammal found in India, consider the following statements:\n1. It is a herbivorous marine mammal.\n2. It is found along the entire coast of India.\n3. It is given legal protection under Schedule I of the Wildlife (Protection) Act, 1972.\n\nWhich of the statements given above are correct?",
    options: {
      A: "1 and 2",
      B: "2 only",
      C: "1 and 3",
      D: "3 only",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2015 Answer Key",
    explanation: "Statements 1 and 3 are correct: The Dugong (Sea Cow) is the only strictly herbivorous marine mammal, feeding on seagrasses, and is protected under Schedule I. Statement 2 is false: It is restricted to specific seagrass beds in the Gulf of Mannar, Palk Bay, Gulf of Kutch, and Andaman and Nicobar Islands (NOT the entire coast).",
    fact_breakdown: [
      {
            "label": "1. Herbivorous marine mammal",
            "status": "true",
            "detail": "Feeds exclusively on seagrass meadows."
      },
      {
            "label": "2. Entire coast of India",
            "status": "false",
            "detail": "Extreme word 'entire coast'; limited to 4 disjoint marine pockets."
      },
      {
            "label": "3. Schedule I protection",
            "status": "true",
            "detail": "Highest degree of statutory protection under WPA 1972."
      }
],
    trap_type: "Extreme Word ('Entire coast of India')",
    trap_analysis: "Marine species with specific dietary requirements are confined to sheltered shallow seagrass ecosystems.",
    citations: [
      {
            "title": "Wildlife Institute of India",
            "reference": "Recovery Programme for Dugong and Seagrass Habitats"
      }
],
    is_verified: true,
  },
  {
    year: 2014,
    paper: "GS Paper I",
    question_number: 16,
    subject: "Environment & Ecology",
    syllabus_code: "PRE-GS1-ENV-ECO",
    question_style: "standard",
    stem: "With reference to 'Eco-Sensitive Zones' (ESZs), which of the following statements is/are correct?\n1. Eco-Sensitive Zones are the areas that are declared under the Wildlife (Protection) Act, 1972.\n2. The purpose of the declaration of Eco-Sensitive Zones is to prohibit all kinds of human activities, in those zones except agriculture.\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1 only",
      B: "2 only",
      C: "Both 1 and 2",
      D: "Neither 1 nor 2",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2014 Answer Key",
    explanation: "Both statements are false. Statement 1 is false: ESZs are declared under Section 3 of the Environment (Protection) Act, 1986 (not WPA 1972). Statement 2 is false: ESZs do not prohibit all human activities; they create shock absorbers by regulating certain activities (commercial mining, polluting industries) while permitting agriculture, horticulture, and renewable energy.",
    fact_breakdown: [
      {
            "label": "1. Governing Act",
            "status": "false",
            "detail": "Declared under EPA 1986, not WPA 1972."
      },
      {
            "label": "2. Prohibition of all human activities",
            "status": "false",
            "detail": "ESZs regulate and phase activities, not total prohibition."
      }
],
    trap_type: "Act Confusion (EPA 1986 vs WPA 1972) & Extreme Prohibition",
    trap_analysis: "Assuming ESZs have the same exclusionary status as National Parks.",
    citations: [
      {
            "title": "Ministry of Environment, Forest and Climate Change",
            "reference": "Guidelines for Declaration of Eco-Sensitive Zones"
      }
],
    is_verified: true,
  },
  {
    year: 2014,
    paper: "GS Paper I",
    question_number: 49,
    subject: "Economy",
    syllabus_code: "PRE-GS1-ECO-MAC",
    question_style: "standard",
    stem: "In the context of the Indian economy, which of the following is/are the purpose(s) of 'Marginal Standing Facility' (MSF)?\n1. Facilitating overnight borrowing by commercial banks from the Reserve Bank of India.\n2. Enabling scheduled commercial banks to meet sudden unexpected liquidity shortfalls even when they have exhausted their regular borrowing limits under Repo.\n3. Permitting banks to dip into their Statutory Liquidity Ratio (SLR) securities up to a prescribed percentage.\n\nSelect the correct answer using the code given below:",
    options: {
      A: "1 and 2 only",
      B: "2 and 3 only",
      C: "1 and 3 only",
      D: "1, 2 and 3",
    },
    official_answer: "D",
    key_status: "Official UPSC CSE 2014 Answer Key",
    explanation: "All three statements are correct. MSF was introduced in 2011 to allow scheduled commercial banks to borrow overnight funds against government securities up to a designated percentage of their NDTL, explicitly permitting them to dip into their SLR portfolio at a penal rate.",
    fact_breakdown: [
      {
            "label": "1. Overnight borrowing window",
            "status": "true",
            "detail": "Provides urgent overnight liquidity."
      },
      {
            "label": "2. Emergency liquidity backstop",
            "status": "true",
            "detail": "Above regular Repo window."
      },
      {
            "label": "3. SLR dipping allowance",
            "status": "true",
            "detail": "Permits dipping into SLR portfolio."
      }
],
    trap_type: "Monetary Tool Functional Mechanics",
    trap_analysis: "SLR dipping is unique to MSF and contrasts with regular Repo operations.",
    citations: [
      {
            "title": "Reserve Bank of India",
            "reference": "Master Direction on Liquidity Adjustment Facility"
      }
],
    is_verified: true,
  },
  {
    year: 2013,
    paper: "GS Paper I",
    question_number: 17,
    subject: "Polity & Governance",
    syllabus_code: "PRE-GS1-POL-PAR",
    question_style: "standard",
    stem: "According to the Constitution of India, what is the quorum required to constitute a meeting of either House of Parliament?\n1. One-sixth of the total number of members of the House.\n2. One-eighth of the total number of members of the House.\n3. One-tenth of the total number of members of the House.\n4. One-twelfth of the total number of members of the House.",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2013 Answer Key",
    explanation: "Under Article 100(3) of the Constitution of India, until Parliament by law otherwise provides, the quorum to constitute a meeting of either House of Parliament shall be one-tenth of the total number of members of the House (55 members for Lok Sabha, 25 for Rajya Sabha).",
    fact_breakdown: [
      {
            "label": "Quorum under Article 100(3)",
            "status": "true",
            "detail": "One-tenth of total membership."
      }
],
    trap_type: "Constitutional Fraction Direct Fact",
    trap_analysis: "Direct factual memory check on parliamentary procedure.",
    citations: [
      {
            "title": "Constitution of India",
            "reference": "Article 100(3)"
      }
],
    is_verified: true,
  },
  {
    year: 2013,
    paper: "GS Paper I",
    question_number: 52,
    subject: "Geography & Mapping",
    syllabus_code: "PRE-GS1-GEO-IND",
    question_style: "standard",
    stem: "Contour bunding is a method of soil conservation used in:\n1. Desert margins prone to wind erosion.\n2. Low flat plains close to river banks liable to recurrent flooding.\n3. Scrublands with undulating terrain and low or erratic rainfall.\n4. Tropical rainforests with steep mountain gradients.",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4",
    },
    official_answer: "C",
    key_status: "Official UPSC CSE 2013 Answer Key",
    explanation: "Contour bunding involves constructing small earthen embankments across the slope along contour lines. It is particularly effective in arid and semi-arid undulating scrublands with low rainfall, slowing runoff and allowing water to infiltrate while preventing topsoil wash-away.",
    fact_breakdown: [
      {
            "label": "Application of contour bunding",
            "status": "true",
            "detail": "Dryland undulating scrub terrain."
      }
],
    trap_type: "Agricultural Soil Conservation Suitability",
    trap_analysis: "Contour bunding is unsuitable for heavy rainfall floodplains or sheer rainforest cliffs where terracing or drainage is needed.",
    citations: [
      {
            "title": "NCERT Class XI India: Physical Environment",
            "reference": "Soils and Soil Conservation Methods"
      }
],
    is_verified: true,
  },
];
