import { removeNonLetters } from "./alphabet";

export function normaliseText(text: string): string {
    return removeNonLetters(text).toUpperCase();
}

export function normaliseSpaces(text: string): string {
    return text.replace(/\s+/g, ' ');
}