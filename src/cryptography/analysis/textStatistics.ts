import { normaliseText } from "../utils/textNormaliser";

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
        onlyLetters: letters === text.length
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

    return {
        length: stats.length,

        letterRatio: stats.letters / stats.length,
        digitRatio: stats.digits / stats.length,
        spaceRatio: stats.spaces / stats.length,
        punctuationRatio: stats.punctuation / stats.length,
        uppercaseRatio: stats.uppercase / stats.letters,
        lowercaseRatio: stats.lowercase / stats.letters,

        hasSpaces: stats.spaces > 0,
        hasNumbers: stats.digits > 0,
        hasSymbols: stats.punctuation > 0,
        characterSet: [...new Set(text)].join("")
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

import { removeNonLetters } from "../utils/alphabet";

export function countRepeatedCharacters(text: string): Record<string, number> {
    const cleanText = removeNonLetters(text);
    const counts: Record<string, number> = {};

    for (const char of cleanText) {
        counts[char] = (counts[char] || 0) + 1;
    }

    return Object.fromEntries(
        Object.entries(counts).filter(([_, count]) => count > 1)
    );
}