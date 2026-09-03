import { normaliseSpaces, normaliseText } from "../utils/textNormaliser";

export function getTextStatistics(text: string): TextStatistics {
    let letters = 0;
    let digits = 0;
    let spaces = 0;
    let punctuation = 0;
    let uppercase = 0;
    let lowercase = 0;

    const uniqueLetters = new Set<string>();

    for (const char of text) {
        if (/[A-Za-z]/.test(char)) {
            letters++;

            const upperChar = char.toUpperCase();
            uniqueLetters.add(upperChar);

            if (char === upperChar) {
                uppercase++;
            } else {
                lowercase++;
            }
        } else if (/[0-9]/.test(char)) {
            digits++;
        } else if (/\s/.test(char)) {
            spaces++;
        } else {
            punctuation++;
        }
    }

    return {
        length: text.length,
        letters,
        digits,
        spaces,
        punctuation,
        uppercase,
        lowercase,
        uniqueLetters: [...uniqueLetters],
        onlyLetters: text.length > 0 && letters === text.length
    };
}

export interface TextStatistics {
    length: number;
    letters: number;
    digits: number;
    spaces: number;
    punctuation: number;
    uppercase: number;
    lowercase: number;
    uniqueLetters: string[];
    onlyLetters: boolean;
}

export function analyseStructure(text: string) {
    const stats = getTextStatistics(text);
    const normalisedText = normaliseSpaces(text);

    const length = stats.length || 1;
    const letters = stats.letters || 1;

    return {
        length: stats.length,

        letterRatio: stats.letters / length,
        digitRatio: stats.digits / length,
        spaceRatio: stats.spaces / length,
        punctuationRatio: stats.punctuation / length,
        uppercaseRatio: stats.uppercase / letters,
        lowercaseRatio: stats.lowercase / letters,

        hasSpaces: stats.spaces > 0,
        hasNumbers: stats.digits > 0,
        hasSymbols: stats.punctuation > 0,
        characterSet: [...new Set(normalisedText)].join("")
    };
}

export function calculateVowelRatio(text: string): number {
    const cleanText = normaliseText(text);

    if (cleanText.length === 0) {
        return 0;
    }

    const vowels = cleanText.match(/[AEIOU]/g)?.length || 0;

    return vowels / cleanText.length;
}

export function countRepeatedCharacters(text: string): Record<string, number> {
    const counts: Record<string, number> = {};

    for (const char of text) {
        counts[char] = (counts[char] || 0) + 1;
    }

    return Object.fromEntries(
        Object.entries(counts).filter(([, count]) => count > 1)
    );
}

export function countRepeatedLetters(text: string): Record<string, number> {
    const cleanText = normaliseText(text);
    const counts: Record<string, number> = {};

    for (const char of cleanText) {
        counts[char] = (counts[char] || 0) + 1;
    }

    return Object.fromEntries(
        Object.entries(counts).filter(([, count]) => count > 1)
    );
}