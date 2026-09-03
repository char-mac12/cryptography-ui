import { describe, expect, it } from 'vitest';
import { breakVigenere } from '../../../cryptography/ciphers/vigenereBreaker';
import { encryptVigenere } from '../../../cryptography/ciphers/vigenere';

describe('Vigenere Breaker', () => {

    it('successfully recovers the keyword and plaintext for a sufficiently long ciphertext', () => {
        const baseText = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG REPEATED TO PROVIDE ENOUGH STATISTICAL DATA FOR THE INDEX OF COINCIDENCE TO FIND THE KEY LENGTH ACCURATELY";
        const original = baseText.repeat(3);
        const keyword = "SECRET";
        const ciphertext = encryptVigenere(original, keyword);

        const result = breakVigenere(ciphertext, 10);

        expect(result.keyword).toBe(keyword);
        expect(result.plaintext).toBe(original);
        expect(typeof result.score).toBe('number');
    });

    it('handles empty or whitespace-only ciphertext gracefully', () => {
        const result = breakVigenere('', 10);

        expect(result.keyword).toBe('');
        expect(result.plaintext).toBe('');
        expect(result.score).toBe(0);
    });

    it('returns an object matching the expected return schema', () => {
        const result = breakVigenere('RIJVS', 5);

        expect(result).toHaveProperty('keyword');
        expect(result).toHaveProperty('plaintext');
        expect(result).toHaveProperty('score');
    });
});