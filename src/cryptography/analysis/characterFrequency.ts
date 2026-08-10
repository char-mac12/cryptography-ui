import { removeNonLetters } from "../utils/alphabet";

export function getLetterFrequencies(text: string): Record<string, number> {
    const letters = removeNonLetters(text);

    const frequencies: Record<string, number> = {};

    for (const letter of letters) {
        frequencies[letter] = (frequencies[letter] || 0) + 1;
    }

    return frequencies;
}

export function getPercentageFrequencies(text: string): Record<string, number> {
    const frequencies = getLetterFrequencies(text);
    const total = Object.values(frequencies).reduce((sum, count) => sum + count, 0);

    const percentages: Record<string, number> = {};

    for (const letter in frequencies) {
        percentages[letter] = (frequencies[letter] / total) * 100;
    }

    return percentages
}

export function getLetterProbabilities(text: string): Record<string, number> {
    const letter_frequencies = getLetterFrequencies(text);
    const total_letters = removeNonLetters(text).length;

    const probabilities: Record<string, number> = {};

    for (const letter in letter_frequencies) {
        probabilities[letter] = letter_frequencies[letter] / total_letters;
    }

    return probabilities;
}