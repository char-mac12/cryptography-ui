import { calculateIndexOfCoincidence } from "./indexOfCoincidence";
import { removeNonLetters } from "../utils/alphabet";

export function splitIntoColumns(text: string, keyLength: number): string[] {
    const columns: string[] = Array(keyLength).fill("");

    for (let i = 0; i < text.length; i++) {
        columns[i % keyLength] += text[i];
    }

    return columns;
}

export function friedmanTest(text: string, maxKeyLength: number): Record<number, number> {
    const cleanText = removeNonLetters(text);
    const results: Record<number, number> = {};

    for (let keyLength = 1; keyLength <= maxKeyLength; keyLength++) {
        const columns = splitIntoColumns(cleanText, keyLength);

        const averageIC =
            columns.reduce(
                (sum, column) => sum + calculateIndexOfCoincidence(column).score,
                0
            ) / columns.length;

        results[keyLength] = averageIC;
    }

    return results;
}