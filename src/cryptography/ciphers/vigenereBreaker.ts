import { calculateEnglishScore } from "../analysis/englishScore";
import { calculateIndexOfCoincidence } from "../analysis/indexOfCoincidence";
import { ALPHABET_SIZE, LETTERS } from "../utils/alphabet";
import { normaliseText } from "../utils/textNormaliser";
import { decryptVigenere } from "./vigenere";

export function breakVigenere(ciphertext: string, maxKeyLength = 10): { keyword: string; plaintext: string; score: number } {
    const cleanCiphertext = normaliseText(ciphertext);
    if (!cleanCiphertext) {
        return { keyword: '', plaintext: ciphertext, score: 0 };
    }

    const estimatedKeyLength = estimateKeyLength(cleanCiphertext, maxKeyLength)
    const columns = splitIntoColumns(cleanCiphertext, estimatedKeyLength);

    let keyword = '';
    for (const column of columns) {
        const { bestShiftChar } = solveColumn(column);
        keyword += bestShiftChar;
    }

    const plaintext = decryptVigenere(ciphertext, keyword);
    const score = calculateEnglishScore(plaintext);

    return { keyword, plaintext, score };
}

function estimateKeyLength(ciphertext: string, maxKeyLength = 10): number {
    const cleanText = normaliseText(ciphertext);
    let bestLength = 1;
    let highestIoC = -1

    const possibleKeyLengths = Math.min(maxKeyLength, cleanText.length);

    for (let keyLength = 1; keyLength <= possibleKeyLengths; keyLength++) {
        const columns = splitIntoColumns(cleanText, keyLength);

        const totalIoC = columns.reduce((sum, col) => {
            return sum + calculateIndexOfCoincidence(col).score;
        }, 0);

        const averageIoC = totalIoC / keyLength;

        if (averageIoC > highestIoC) {
            highestIoC = averageIoC;
            bestLength = keyLength;
        }
    }

    return bestLength;
}

function splitIntoColumns(text: string, keyLength: number): string[] {
    const columns: string[] = Array.from({ length: keyLength }, () => '');
    for (let i = 0; i < text.length; i++) {
        columns[i % keyLength] += text[i];
    }

    return columns;
}

function solveColumn(column: string): { bestShiftChar: string; score: number } {
    let bestScore = -Infinity;
    let bestShiftChar = 'A';

    for (let shift = 0; shift < ALPHABET_SIZE; shift++) {
        const decryptedColumn = column.split('').map(char => {
            const position = LETTERS.indexOf(char);
            return position === -1 ? char : LETTERS[(position - shift + ALPHABET_SIZE) % ALPHABET_SIZE]
        }).join('');

        const score = calculateEnglishScore(decryptedColumn);
        if (score > bestScore) {
            bestScore = score;
            bestShiftChar = LETTERS[shift];
        }
    }

    return { bestShiftChar, score: bestScore }
}