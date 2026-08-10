import { removeNonLetters } from "./alphabet";

export function normaliseText(text: string): string {
    return removeNonLetters(text).toUpperCase();
}