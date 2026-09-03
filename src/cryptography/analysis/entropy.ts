import { removeNonLetters } from '../utils/alphabet';
import { getLetterProbabilities } from './characterFrequency';

export function calculateEntropy(text: string): number {
    const cleanText = removeNonLetters(text);

    if (cleanText.length === 0) {
        return 0;
    }

    const letterProbabilities = getLetterProbabilities(cleanText);
    let entropy = 0;

    for (const letter in letterProbabilities) {
        const probability = letterProbabilities[letter];
        entropy -= probability * Math.log2(probability);
    }

    return entropy;
}