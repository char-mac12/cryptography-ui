import { describe, expect, it } from 'vitest'
import { gcd, mod, modInverse } from '../../../cryptography/utils/maths';

describe('Math Utilities for Cryptography', () => {
    describe('gcd', () => {
        it('calculates the greatest common divisor of positive numbers', () => {
            expect(gcd(48, 18)).toBe(6);
            expect(gcd(17, 31)).toBe(1); // coprime
        });

        it('handles negative inputs by using absolute values', () => {
            expect(gcd(-48, 18)).toBe(6);
            expect(gcd(48, -18)).toBe(6);
            expect(gcd(-48, -18)).toBe(6);
        });

        it('handles zero inputs correctly', () => {
            expect(gcd(0, 5)).toBe(5);
            expect(gcd(5, 0)).toBe(5);
            expect(gcd(0, 0)).toBe(0);
        });
    });

    describe('mod', () => {
        it('computes correct positive remainders', () => {
            expect(mod(5, 3)).toBe(2);
            expect(mod(10, 5)).toBe(0);
        });

        it('correctly handles negative dividends for modulo arithmetic', () => {
            expect(mod(-1, 26)).toBe(25);
            expect(mod(-27, 26)).toBe(25);
        });
    });

    describe('modInverse', () => {
        it('finds the correct modular inverse', () => {
            // 3 * 9 = 27 ≡ 1 (mod 26)
            expect(modInverse(3, 26)).toBe(9);
            // 5 * 7 = 35 ≡ 1 (mod 11)
            expect(modInverse(5, 11)).toBe(7);
        });

        it('throws an error if no modular inverse exists', () => {
            // gcd(2, 26) = 2 != 1, so no inverse exists mod 26
            expect(() => modInverse(2, 26)).toThrow();
        });
    });
});