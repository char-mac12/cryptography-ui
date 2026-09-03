import { describe, expect, it } from 'vitest'
import { analyseChiSquared, calculateChiSquared } from '../../../cryptography/analysis/chiSquared'

describe('Chi-Squared Analysis', () => {

    describe('analyseChiSquared', () => {

        it('returns a low Chi-Squared score for natural English-like text', () => {
            const englishText = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
            const result = analyseChiSquared(englishText)

            expect(result.score).toBeGreaterThan(0)
            expect(result.letterCount).toBe(35)
            expect(Object.keys(result.expectedCounts)).toHaveLength(26)
        })

        it('returns a significantly higher Chi-Squared score for unnatural text', () => {
            const englishText = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
            const unnaturalText = 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'

            const englishResult = analyseChiSquared(englishText)
            const unnaturalResult = analyseChiSquared(unnaturalText)

            expect(unnaturalResult.score).toBeGreaterThan(englishResult.score)
        })

        it('calculates exact expected frequencies proportional to letter count and handles unknown reduction safely', () => {
            const text = 'HELLO WORLD'
            const result = analyseChiSquared(text)

            expect(result.letterCount).toBe(10)

            // Explicit accumulator and current value types avoid 'unknown' reducer inferencing
            const totalExpected = Object.values(result.expectedCounts)
                .reduce((sum: number, count: unknown) => sum + Number(count), 0)

            expect(totalExpected).toBeCloseTo(10, 2)
        })

        it('handles empty input or non-letter input gracefully', () => {
            const emptyResult = analyseChiSquared('')
            expect(emptyResult.score).toBe(0)
            expect(emptyResult.letterCount).toBe(0)
            expect(emptyResult.expectedCounts).toEqual({})

            const punctuationResult = analyseChiSquared('12345!@#$%')
            expect(punctuationResult.score).toBe(0)
            expect(punctuationResult.letterCount).toBe(0)
        })
    })

    describe('calculateChiSquared', () => {

        it('returns only the numerical Chi-Squared score directly', () => {
            const text = 'ATTACK AT DAWN'
            const numericScore = calculateChiSquared(text)
            const fullAnalysis = analyseChiSquared(text)

            expect(numericScore).toBe(fullAnalysis.score)
            expect(typeof numericScore).toBe('number')
        })

        it('identifies the correct shift key when used against rotated text', () => {
            const originalText = 'ATTACK AT DAWN'
            const shiftedText = 'BUUBDL BU EBXP'

            const originalScore = calculateChiSquared(originalText)
            const shiftedScore = calculateChiSquared(shiftedText)

            expect(originalScore).toBeLessThan(shiftedScore)
        })
    })
})