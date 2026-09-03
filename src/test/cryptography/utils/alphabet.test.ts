import { describe, expect, it } from 'vitest'
import { ALPHABET_SIZE, ENGLISH_ALPHABET, ENGLISH_LETTER_PROBABILITIES, getEnglishLetterCounts, isLetter, LETTERS, removeNonLetters } from '../../../cryptography/utils/alphabet';

describe('Alphabet Utilities', () => {
    it('exports correct basic constants', () => {
        expect(ENGLISH_ALPHABET).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        expect(ALPHABET_SIZE).toBe(26);
        expect(LETTERS).toHaveLength(26);
        expect(LETTERS[0]).toBe('A');
        expect(LETTERS[25]).toBe('Z');
    });

    it('contains valid letter probabilities that sum to approximately 1.0', () => {
        expect(ENGLISH_LETTER_PROBABILITIES['E']).toBe(0.1202);
        expect(ENGLISH_LETTER_PROBABILITIES['Z']).toBe(0.0007);
        
        const totalProbability = Object.values(ENGLISH_LETTER_PROBABILITIES).reduce((sum, p) => sum + p, 0);
        expect(totalProbability).toBeCloseTo(1.0, 3);
    });

    describe('isLetter', () => {
        it('returns true for single uppercase and lowercase letters', () => {
            expect(isLetter('A')).toBe(true);
            expect(isLetter('z')).toBe(true);
        });

        it('returns false for numbers, symbols, and strings longer or shorter than 1 character', () => {
            expect(isLetter('5')).toBe(false);
            expect(isLetter('?')).toBe(false);
            expect(isLetter('AB')).toBe(false);
            expect(isLetter('')).toBe(false);
        });
    });

    describe('removeNonLetters', () => {
        it('strips spaces, punctuation, and numbers while preserving and uppercasing letters', () => {
            expect(removeNonLetters('Hello, Cryptography 2026!')).toBe('HELLOCRYPTOGRAPHY');
        });

        it('returns an empty string if text contains no valid letters', () => {
            expect(removeNonLetters('12345!@#$%')).toBe('');
        });

        it('handles empty strings', () => {
            expect(removeNonLetters('')).toBe('');
        });
    });

    describe('getEnglishLetterCounts', () => {
        it('scales letter probabilities correctly based on requested length', () => {
            const counts = getEnglishLetterCounts(1000);
            expect(counts['E']).toBe(120.2); // 0.1202 * 1000
            expect(counts['Z']).toBe(0.7);   // 0.0007 * 1000
        });

        it('returns zero or empty-like maps if length is zero', () => {
            const counts = getEnglishLetterCounts(0);
            expect(counts['A']).toBe(0);
        });
    });
});