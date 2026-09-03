import { getNGrams } from "./nGrams";
import { normaliseText } from "../utils/textNormaliser";
import { ENGLISH_QUADGRAMS } from "./quadgrams";

export function quadgramScore(text: string): number {
    const cleanText = normaliseText(text);
    
    if (cleanText.length < 4) {
        return -Infinity;
    }

    const grams = getNGrams(cleanText, 4);

    let score = 0;

    for (const gram of grams) {
        score += ENGLISH_QUADGRAMS[gram] ?? -10;
    }

    return score / grams.length; // divide to prevent length bias
}