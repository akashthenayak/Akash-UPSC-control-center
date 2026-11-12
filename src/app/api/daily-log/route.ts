import { NextRequest, NextResponse } from "next/server";
import { buildDailySuggestion } from "@/lib/study-plan";

export async function GET(req: NextRequest) {
  const dateStr = req.nextUrl.searchParams.get("date") || new Date().toISOString().slice(0, 10);
  const suggestion = buildDailySuggestion(dateStr);
  return NextResponse.json({ ok: true, suggestion });
}

export async function POST(req: NextRequest) {
  try {
    await req.json();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
