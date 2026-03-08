// app/api/chat/route.ts
//
// Letakkan file ini di:
// my-app/app/api/chat/route.ts
//
// Dan letakkan chatbot_data.json di:
// my-app/public/chatbot_data.json

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatEntry {
    q: string;
    a: string;
}

interface ChatbotData {
    version: string;
    language: string;
    total: number;
    data: ChatEntry[];
}

// ─── Cache ────────────────────────────────────────────────────────────────────

let cachedData: ChatbotData | null = null;

async function loadData(): Promise<ChatbotData> {
    if (cachedData) return cachedData;
    const filePath = path.join(process.cwd(), "public", "chatbot_data.json");
    const raw = await fs.readFile(filePath, "utf-8");
    cachedData = JSON.parse(raw) as ChatbotData;
    return cachedData;
}

// ─── Matching engine ──────────────────────────────────────────────────────────

function normalize(text: string): string {
    return text.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

function similarity(a: string, b: string): number {
    const setA = new Set(normalize(a).split(" "));
    const setB = new Set(normalize(b).split(" "));
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return union.size === 0 ? 0 : intersection.size / union.size;
}

function containsKeywords(input: string, pattern: string): boolean {
    const inputNorm = normalize(input);
    return normalize(pattern).split(" ").every((word) => inputNorm.includes(word));
}

function getBotResponse(userInput: string, data: ChatEntry[], threshold = 0.3): string {
    if (!userInput.trim()) return "Pesan tidak boleh kosong!";

    const fallback = data.find((d) => d.q === "__fallback__");
    const fallbackAnswer = fallback?.a ?? "Maaf, saya tidak mengerti. Coba tanyakan dengan cara lain! 🙏";
    const entries = data.filter((d) => d.q !== "__fallback__");

    let bestScore = 0;
    let bestAnswer = fallbackAnswer;

    for (const entry of entries) {
        // Exact match
        if (normalize(userInput) === normalize(entry.q)) return entry.a;

        // Keyword containment (bonus score)
        if (containsKeywords(userInput, entry.q)) {
            const score = similarity(userInput, entry.q) + 0.3;
            if (score > bestScore) { bestScore = score; bestAnswer = entry.a; }
            continue;
        }

        // Jaccard similarity
        const score = similarity(userInput, entry.q);
        if (score > bestScore) { bestScore = score; bestAnswer = entry.a; }
    }

    return bestScore >= threshold ? bestAnswer : fallbackAnswer;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userMessage: string = body.message ?? "";

        if (!userMessage.trim()) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const data = await loadData();
        const response = getBotResponse(userMessage, data.data);

        return NextResponse.json({ response });
    } catch (err) {
        console.error("Chat API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}