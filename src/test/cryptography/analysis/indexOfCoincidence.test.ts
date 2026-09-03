import { describe, expect, it } from 'vitest'
import { calculateIndexOfCoincidence } from '../../../cryptography/analysis/indexOfCoincidence'

describe('calculateIndexOfCoincidence', () => {

    it('calculates the exact Index of Coincidence for standard text', () => {
        // Text: "AABB" -> N = 4, N*(N-1) = 12
        // Counts: A=2, B=2 -> sum(f * (f-1)) = 2*(1) + 2*(1) = 4
        // Expected IC = 4 / 12 = 0.3333333333333333
        const result = calculateIndexOfCoincidence('AABB')

        expect(result.score).toBeCloseTo(0.33333, 4)
        expect(result.letterCount).toBe(4)
        expect(result.letterFrequencies).toEqual({ A: 2, B: 2 })
    })

    it('returns 1.0 for a string where all characters are identical', () => {
        // Text: "AAAA" -> N = 4, N*(N-1) = 12
        // Counts: A=4 -> sum(f * (f-1)) = 4*3 = 12
        // Expected IC = 12 / 12 = 1.0
        const result = calculateIndexOfCoincidence('AAAA')

        expect(result.score).toBe(1)
        expect(result.letterCount).toBe(4)
        expect(result.letterFrequencies).toEqual({ A: 4 })
    })

    it('yields lower IC for uniform random-like distributions', () => {
        // Text with equal distribution across many unique letters yields low IC
        const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const result = calculateIndexOfCoincidence(text)

        expect(result.score).toBe(0)
        expect(result.letterCount).toBe(26)
    })

    it('strips non-letter characters and normalizes case appropriately', () => {
        // "A a! B b?" -> same letter distribution as "AABB"
        const result = calculateIndexOfCoincidence('A a! B b?')

        expect(result.score).toBeCloseTo(0.33333, 4)
        expect(result.letterCount).toBe(4)
    })

    it('returns score 0 when text has fewer than 2 letters', () => {
        const singleCharResult = calculateIndexOfCoincidence('A!')
        expect(singleCharResult.score).toBe(0)
        expect(singleCharResult.letterCount).toBe(1)

        const emptyResult = calculateIndexOfCoincidence('!!!')
        expect(emptyResult.score).toBe(0)
        expect(emptyResult.letterCount).toBe(0)
    })
})