import { normaliseText } from "../utils/textNormaliser";
import { getLetterFrequencies } from "./characterFrequency";

export interface IndexOfCoincidenceResult {
    score: number;
    letterCount: number;
    letterFrequencies: Record<string, number>;
}

export function calculateIndexOfCoincidence(
    text: string
): IndexOfCoincidenceResult {
    const cleanedText = normaliseText(text);
    const totalLetters = cleanedText.length;
    const letterFrequencies = getLetterFrequencies(cleanedText);

    // IC is undefined when there are fewer than two letters.
    if (totalLetters < 2) {
        return {
            score: 0,
            letterCount: totalLetters,
            letterFrequencies,
        };
    }

    const numerator = Object.values(letterFrequencies).reduce(
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