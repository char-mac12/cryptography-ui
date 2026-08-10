import { getEnglishLetterCounts, removeNonLetters } from "../utils/alphabet";
import { getLetterFrequencies } from "./characterFrequency";

export function calculateChiSquared(text: string): number {
    const letter_frequencies = getLetterFrequencies(text);
    const total_letters = removeNonLetters(text).length;

    if (total_letters === 0) {
        return 0;
    }

    const english_counts = getEnglishLetterCounts(total_letters);

    let chi_squared = 0;

    for (const letter in english_counts) {
        const observed_frequency = letter_frequencies[letter] || 0;
        const expected_frequency = english_counts[letter];
        
        chi_squared += ((observed_frequency - expected_frequency) ** 2) / expected_frequency;
    }
    
    return chi_squared;
}