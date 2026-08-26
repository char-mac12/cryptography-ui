import { removeNonLetters } from "../utils/alphabet";
import { getLetterFrequencies } from "./characterFrequency";

export interface IndexOfCoincidenceResult {
    score: number;
    letterCount: number;
    letterFrequencies: Record<string, number>;
}

export function calculateIndexOfCoincidence(
    text: string
): IndexOfCoincidenceResult {
    const letterFrequencies = getLetterFrequencies(text);
    const totalLetters = removeNonLetters(text).length;

    // IC is undefined when there are fewer than two letters.
    if (totalLetters < 2) {
        return {
            score: 0,
            letterCount: totalLetters,
            letterFrequencies,
        };
    }

    const numerator = Object.values(letterFrequencies)
        .reduce(
            (sum, frequency) => sum + frequency * (frequency - 1),
            0
        );

    const denominator = totalLetters * (totalLetters - 1);

    const score = numerator / denominator;

    return {
        score,
        letterCount: totalLetters,
        letterFrequencies,
    };
}