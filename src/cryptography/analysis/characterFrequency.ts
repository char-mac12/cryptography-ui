import { normaliseText } from "../utils/textNormaliser";

export function getLetterFrequencies(text: string): Record<string, number> {
    const letters = normaliseText(text);
    const frequencies: Record<string, number> = {};

    for (const letter of letters) {
        frequencies[letter] = (frequencies[letter] || 0) + 1;
    }

    return frequencies;
}

export function getPercentageFrequencies(text: string): Record<string, number> {
    const frequencies = getLetterFrequencies(text);
    const total = Object.values(frequencies).reduce<number>((sum, count) => sum + count, 0);

    if (total === 0) return {};

    const percentages: Record<string, number> = {};

    for (const letter in frequencies) {
        percentages[letter] = (frequencies[letter] / total) * 100;
    }

    return percentages;
}

export function getLetterProbabilities(text: string): Record<string, number> {
    const frequencies = getLetterFrequencies(text);
    const total = Object.values(frequencies).reduce<number>((sum, count) => sum + count, 0);

    if (total === 0) return {};

    const probabilities: Record<string, number> = {};

    for (const letter in frequencies) {
        probabilities[letter] = frequencies[letter] / total;
    }

    return probabilities;
}