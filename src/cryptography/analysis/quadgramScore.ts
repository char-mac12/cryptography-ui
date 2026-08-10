import { getNGrams } from "./nGrams";
import { removeNonLetters } from "../utils/alphabet";
import { ENGLISH_QUADGRAMS } from "./quadgrams";

export function quadgramScore(text: string): number {
    const cleanText = removeNonLetters(text);
    const grams = getNGrams(cleanText, 4);

    let score = 0;

    for (const gram of grams) {
        score += ENGLISH_QUADGRAMS[gram] ?? -10;
    }

    return score;
}