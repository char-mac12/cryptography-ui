import { normaliseText } from "../utils/textNormaliser";

const BACON_ALPHABET: Record<string, string> = {
    A: "AAAAA",
    B: "AAAAB",
    C: "AAABA",
    D: "AAABB",
    E: "AABAA",
    F: "AABAB",
    G: "AABBA",
    H: "AABBB",
    I: "ABAAA",
    J: "ABAAB",
    K: "ABABA",
    L: "ABABB",
    M: "ABBAA",
    N: "ABBAB",
    O: "ABBBA",
    P: "ABBBB",
    Q: "BAAAA",
    R: "BAAAB",
    S: "BAABA",
    T: "BAABB",
    U: "BABAA",
    V: "BABAB",
    W: "BABBA",
    X: "BABBB",
    Y: "BBAAA",
    Z: "BBAAB",
};

export function encryptBacon(text: string): string {
    const normalisedText = normaliseText(text);

    return normalisedText
        .split("")
        .map(char => BACON_ALPHABET[char])
        .join(" ");
}

export function decryptBacon(text: string): string {
    const reverseAlphabet = Object.fromEntries(
        Object.entries(BACON_ALPHABET).map(([letter, code]) => [
            code,
            letter
        ])
    );

    return text
        .toUpperCase()
        .split(/\s+/)
        .map(code => reverseAlphabet[code] ?? code)
        .join("");
}