import { describe, expect, it } from 'vitest'
import { calculateEntropy } from '../../../cryptography/analysis/entropy'

describe('Entropy', () => {

    describe('calculateEntropy', () => {

        it('returns 0 for a string with a single repeating character', () => {
            // P('A') = 1.0 -> -1.0 * log2(1.0) = 0 bits
            expect(calculateEntropy('AAAAAA')).toBe(0)
        })

        it('returns 1.0 bit for a uniform binary distribution', () => {
            // P('A') = 0.5, P('B') = 0.5 -> -(0.5 * -1 + 0.5 * -1) = 1.0 bit
            expect(calculateEntropy('AABB')).toBe(1)
        })

        it('calculates exact theoretical entropy for maximum 26-letter uniform randomness', () => {
            // 26 unique characters with equal probability (1/26) -> log2(26) ≈ 4.7004 bits
            const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            const expectedEntropy = Math.log2(26)

            expect(calculateEntropy(text)).toBeCloseTo(expectedEntropy, 5)
        })

        it('calculates correct entropy for non-uniform character distributions', () => {
            // Text: "AAAB" -> P('A') = 0.75, P('B') = 0.25
            // Entropy = -(0.75 * log2(0.75) + 0.25 * log2(0.25)) ≈ 0.81128 bits
            const expected = -(0.75 * Math.log2(0.75) + 0.25 * Math.log2(0.25))

            expect(calculateEntropy('AAAB')).toBeCloseTo(expected, 5)
        })

        it('ignores non-letter characters and normalizes case', () => {
            // "A! A? B. B" reduces to "AABB" -> 1.0 bit
            expect(calculateEntropy('A! A? B. B')).toBe(1)
        })

        it('returns 0 for empty strings or inputs without letters', () => {
            expect(calculateEntropy('')).toBe(0)
            expect(calculateEntropy('12345!@#$%')).toBe(0)
        })
    })
})