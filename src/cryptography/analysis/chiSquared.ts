import { getEnglishLetterCounts, removeNonLetters } from "../utils/alphabet";
import { getLetterFrequencies } from "./characterFrequency";

export type ChiSquaredResult = {
    score: number;
    letterCount: number;
    observedCounts: Record<string, number>;
    expectedCounts: Record<string, number>;
};

export function analyseChiSquared(text: string): ChiSquaredResult {
    const observedCounts = getLetterFrequencies(text);
    const letterCount = removeNonLetters(text).length;

    if (letterCount === 0) {
        return {
            score: 0,
            letterCount: 0,
            observedCounts,
            expectedCounts: {},
        };
    }

    const expectedCounts = getEnglishLetterCounts(letterCount);

    let score = 0;

    for (const letter in expectedCounts) {
        const observed = observedCounts[letter] || 0;
        const expected = expectedCounts[letter];

        score += ((observed - expected) ** 2) / expected;
    }

    return {
        score,
        letterCount,
        observedCounts,
        expectedCounts,
    };
}

export function calculateChiSquared(text: string): number {
    return analyseChiSquared(text).score;
}