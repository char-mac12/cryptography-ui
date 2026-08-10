export const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const ALPHABET_SIZE = 26;

export const LETTERS = [
    "A", "B", "C", "D", "E", "F", "G", 
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"
];

export const ENGLISH_LETTER_PROBABILITIES: Record<string, number> = {
  A: 0.0812,
  B: 0.0149,
  C: 0.0271,
  D: 0.0432,
  E: 0.1202,
  F: 0.0230,
  G: 0.0203,
  H: 0.0592,
  I: 0.0731,
  J: 0.0010,
  K: 0.0069,
  L: 0.0398,
  M: 0.0261,
  N: 0.0695,
  O: 0.0768,
  P: 0.0182,
  Q: 0.0011,
  R: 0.0602,
  S: 0.0628,
  T: 0.0910,
  U: 0.0288,
  V: 0.0111,
  W: 0.0209,
  X: 0.0017,
  Y: 0.0211,
  Z: 0.0007
};

export function isLetter(letter: string): boolean {
    return letter.length == 1 && ENGLISH_ALPHABET.includes(letter.toUpperCase());
}

export function removeNonLetters(text: string): string {
    return text.split("")
        .filter(isLetter)
        .join("")
        .toUpperCase()
}

export function getEnglishLetterCounts(length: number): Record<string, number> {
    const counts: Record<string, number> = {};

    for (const letter in ENGLISH_LETTER_PROBABILITIES) {
        counts[letter] = ENGLISH_LETTER_PROBABILITIES[letter] * length;
    }

    return counts;
}