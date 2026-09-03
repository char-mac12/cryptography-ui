import rawQuadgrams from "./rawQuadgrams.txt?raw";

export const ENGLISH_QUADGRAMS: Record<string, number> = {};

const counts: Record<string, number> = {};

for (const line of rawQuadgrams.trim().split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue; 

    const [gram, countStr] = trimmed.split(/\s+/);
    const count = Number(countStr)

    if (gram && !isNaN(count)) {
        counts[gram.toUpperCase()] = count;
    }
}

const total = Object.values(counts)
    .reduce((sum, count) => sum + count, 0) || 1;

for (const gram in counts) {
    ENGLISH_QUADGRAMS[gram] = Math.log10(counts[gram] / total);
}