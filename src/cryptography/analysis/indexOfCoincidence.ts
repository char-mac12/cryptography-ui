import { removeNonLetters } from "../utils/alphabet";
import { getLetterFrequencies } from "./characterFrequency"

export function calculateIndexOfCoincidence(text: string): number {
    const letter_frequencies = getLetterFrequencies(text);
    const total_letters = removeNonLetters(text).length;

    const numerator = Object.values(letter_frequencies)
        .reduce((sum, frequency) => sum + frequency * (frequency - 1), 0);
    
    const denominator = total_letters * (total_letters - 1);
    
    const indexOfCoincidence = (numerator) / (denominator);
    return indexOfCoincidence;
}