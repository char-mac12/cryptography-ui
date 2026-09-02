import { ALPHABET_SIZE, LETTERS } from "../utils/alphabet";
import { normaliseText } from "../utils/textNormaliser";

export function encryptVigenere(text: string, keyword: string): string {
    const cleanKey = normaliseText(keyword);

    if (!cleanKey) {
        throw new Error("Keyword must not be empty");
    }

    let keywordIndex = 0;

    return text
        .toUpperCase()
        .split("")
        .map((char) => {
            const textPosition = LETTERS.indexOf(char);

            if (textPosition === -1) return char;

            const keywordPosition = LETTERS.indexOf(
                cleanKey[keywordIndex % cleanKey.length]
            );

            keywordIndex++;

            const shifted =
                (textPosition + keywordPosition) % ALPHABET_SIZE;

            return LETTERS[shifted];
        })
        .join("");
}

export function decryptVigenere(text: string, keyword: string): string {
    const cleanKey = normaliseText(keyword);

    if (!cleanKey) {
        throw new Error("Keyword must not be empty");
    }

    let keywordIndex = 0;

    return text
        .toUpperCase()
        .split("")
        .map((char) => {
            const textPosition = LETTERS.indexOf(char);

            if (textPosition === -1) return char;

            const keywordPosition = LETTERS.indexOf(
                cleanKey[keywordIndex % cleanKey.length]
            );

            keywordIndex++;

            const shifted =
                (textPosition - keywordPosition + ALPHABET_SIZE) %
                ALPHABET_SIZE;

            return LETTERS[shifted];
        })
        .join("");
}