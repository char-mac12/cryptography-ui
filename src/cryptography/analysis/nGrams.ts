export function getNGrams(text: string, n: number): string[] {
    const grams: string[] = [];

    for (let i = 0; i <= text.length - n; i++) {
        grams.push(text.slice(i, i + n));
    }

    return grams;
}

export function nGramFrequencies(text: string, n: number): Record<string, number> {
    const grams = getNGrams(text, n);
    const frequencies: Record<string, number> = {};

    for (const gram of grams) {
        frequencies[gram] = (frequencies[gram] || 0) + 1;
    }

    return frequencies;
}

export function findRepeatedSequences(
    text: string,
    length: number
): { sequence: string; positions: number[] }[] {
    const repeats: Record<string, number[]> = {};

    for (let i = 0; i <= text.length - length; i++) {
        const gram = text.slice(i, i + length);

        if (!repeats[gram]) {
            repeats[gram] = [];
        }

        repeats[gram].push(i);
    }

    return Object.entries(repeats)
        .filter(([, positions]) => positions.length > 1)
        .map(([sequence, positions]) => ({
            sequence,
            positions
        }));
}