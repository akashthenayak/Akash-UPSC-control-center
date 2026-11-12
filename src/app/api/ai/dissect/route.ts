import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pyqId = Number(body.pyq_id);
    const userMistake = String(body.user_mistake || "");
    const apiKey = String(body.api_key || process.env.GEMINI_API_KEY || "").trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "No Gemini API key configured. Add GEMINI_API_KEY in .env.local or paste it in the Settings modal to enable optional AI trap dissection.",
        },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const q = db.prepare("SELECT * FROM pyq_questions WHERE id = ?").get(pyqId) as
      | Record<string, unknown>
      | undefined;

    if (!q) {
      return NextResponse.json({ error: "PYQ not found" }, { status: 404 });
    }

    const prompt = `You are a strict UPSC Civil Services Preliminary Exam mentor advising a 2-time Mains veteran (PSIR optional) who must eliminate factual blindspots and post-2022 pair-counting traps.

STRICT GROUNDING RULE:
The verified official UPSC answer key for this question is Option ${q.official_answer}. Do NOT contradict the official key. Only cite authoritative primary sources (Constitution Articles, bare Acts, NCERTs, RBI/MoEFCC/PIB reports).

Question (${q.year} ${q.paper}, ${q.subject}):
${q.stem}

Options:
A. ${q.option_a}
B. ${q.option_b}
C. ${q.option_c}
D. ${q.option_d}

Official Answer: ${q.official_answer}
Stored Trap Type: ${q.trap_type}
User's selected/confused reasoning: ${userMistake || "Requested deeper dissection"}

Provide a concise, high-signal breakdown in 4 short bullet sections:
1. Why Option ${q.official_answer} is strictly right (primary legal/NCERT fact).
2. Why each wrong option/statement fails (exact keyword trap).
3. Veteran's Blindspot Check (why a Mains/PSIR veteran falls for this + 1-line Trigger Cue for the Error Register).
4. Primary Source Reference to verify.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 700 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Gemini API returned ${response.status}: ${errText.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const analysis =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis returned from Gemini API.";

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("AI dissect POST error:", error);
    return NextResponse.json({ error: "Failed to run optional Gemini dissection" }, { status: 500 });
  }
}
