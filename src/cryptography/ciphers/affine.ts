import { ALPHABET_SIZE, LETTERS, removeNonLetters } from "../utils/alphabet";
import { gcd, mod, modInverse } from "../utils/maths";

function validateA(a: number): void {
    if (!Number.isInteger(a)) {
        throw new Error("a must be an integer");
    }

    if (gcd(a, ALPHABET_SIZE) !== 1) {
        throw new Error(
            `a must be coprime with the alphabet size ${ALPHABET_SIZE}`
        );
    }
}

export function affineEncrypt(
    plaintext: string,
    a: number,
    b: number
): string {
    validateA(a);

    const text = removeNonLetters(plaintext);

    return text
        .split("")
        .map((letter: string) => {
            const x = LETTERS.indexOf(letter);
            const y = mod(a * x + b, ALPHABET_SIZE);

            return LETTERS[y];
        })
        .join("");
}

export function affineDecrypt(
    ciphertext: string,
    a: number,
    b: number
): string {
    validateA(a);

    const text = removeNonLetters(ciphertext);
    const aInverse = modInverse(a, ALPHABET_SIZE);

    return text
        .split("")
        .map((letter: string) => {
            const y = LETTERS.indexOf(letter);
            const x = mod(aInverse * (y - b), ALPHABET_SIZE);

            return LETTERS[x];
        })
        .join("");
}