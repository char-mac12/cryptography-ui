// could combine quadgram, dictionary, chi squared and vowel ratio
import { quadgramScore } from "./quadgramScore";

export function calculateEnglishScore(text: string): number {
    return quadgramScore(text);
}