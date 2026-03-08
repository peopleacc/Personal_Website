// src/lib/chatbot.ts
// Mesin pencari jawaban - menggantikan logika ChatterBot di JavaScript

export interface ChatEntry {
    q: string;
    a: string;
}

export interface ChatbotData {
    version: string;
    language: string;
    total: number;
    data: ChatEntry[];
}

// Normalisasi teks: lowercase, hapus tanda baca, trim
function normalize(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Hitung similarity score antara dua string (Jaccard similarity pada kata)
function similarity(a: string, b: string): number {
    const setA = new Set(normalize(a).split(' '));
    const setB = new Set(normalize(b).split(' '));

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    if (union.size === 0) return 0;
    return intersection.size / union.size;
}

// Cek apakah teks B terkandung dalam teks A (substring matching)
function containsKeywords(input: string, pattern: string): boolean {
    const inputNorm = normalize(input);
    const patternWords = normalize(pattern).split(' ');
    return patternWords.every(word => inputNorm.includes(word));
}

// Fungsi utama: cari jawaban terbaik
export function getBotResponse(
    userInput: string,
    data: ChatEntry[],
    threshold = 0.3
): string {
    if (!userInput.trim()) return 'Pesan tidak boleh kosong!';

    const fallback = data.find(d => d.q === '__fallback__');
    const fallbackAnswer = fallback?.a ?? 'Maaf, saya tidak mengerti. Coba tanyakan dengan cara lain!';

    // Filter data (exclude fallback)
    const entries = data.filter(d => d.q !== '__fallback__');

    let bestScore = 0;
    let bestAnswer = fallbackAnswer;

    for (const entry of entries) {
        // Cek exact match dulu
        if (normalize(userInput) === normalize(entry.q)) {
            return entry.a;
        }

        // Cek keyword containment
        if (containsKeywords(userInput, entry.q)) {
            const score = similarity(userInput, entry.q) + 0.3; // bonus untuk keyword match
            if (score > bestScore) {
                bestScore = score;
                bestAnswer = entry.a;
            }
            continue;
        }

        // Jaccard similarity
        const score = similarity(userInput, entry.q);
        if (score > bestScore) {
            bestScore = score;
            bestAnswer = entry.a;
        }
    }

    return bestScore >= threshold ? bestAnswer : fallbackAnswer;
}