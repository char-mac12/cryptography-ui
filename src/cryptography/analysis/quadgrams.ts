import rawQuadgrams from "./rawQuadgrams.txt";

export const ENGLISH_QUADGRAMS: Record<string, number> = {};

const counts: Record<string, number> = {};

for (const line of rawQuadgrams.trim().split("\n")) {
    const [gram, count] = line.split(/\s+/);
    counts[gram] = Number(count);
}

const total = Object.values(counts)
    .reduce((sum, count) => sum + count, 0);

for (const gram in counts) {
    ENGLISH_QUADGRAMS[gram] = Math.log10(counts[gram] / total);
}