import { removeNonLetters } from '../utils/alphabet';
import { getLetterProbabilities } from './characterFrequency';

export function calculateEntropy(text: string): number {
    const letter_probabilities = getLetterProbabilities(text);

    if (removeNonLetters(text).length === 0) {
        return 0;
    }

    let entropy = 0;

    for (const letter in letter_probabilities) {
        const probability = letter_probabilities[letter];
        entropy -= probability * Math.log2(probability);
    }

    return entropy;
}