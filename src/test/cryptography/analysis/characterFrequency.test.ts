import { describe, expect, it } from 'vitest'
import { getLetterFrequencies, getLetterProbabilities, getPercentageFrequencies } from '../../../cryptography/analysis/characterFrequency'

describe('Character Frequency', () => {

    describe('getLetterFrequencies', () => {

        it('counts letter occurrences accurately and normalizes text', () => {
            const result = getLetterFrequencies('AaBb')

            expect(result).toEqual({ A: 2, B: 2 })
        })

        it('strips non-letter characters and punctuation', () => {
            const result = getLetterFrequencies('Hello, World! 123')

            expect(result).toEqual({
                H: 1,
                E: 1,
                L: 3,
                O: 2,
                W: 1,
                R: 1,
                D: 1
            })
        })

        it('returns an empty object for strings without letters', () => {
            expect(getLetterFrequencies('12345!@#$%')).toEqual({})
            expect(getLetterFrequencies('')).toEqual({})
        })
    })

    describe('getPercentageFrequencies', () => {

        it('calculates exact percentage distribution of letters', () => {
            const result = getPercentageFrequencies('AABB')

            expect(result).toEqual({ A: 50, B: 50 })
        })

        it('sums up to 100 percent for valid non-empty text', () => {
            const text = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
            const percentages = getPercentageFrequencies(text)

            const totalPercentage = Object.values(percentages)
                .reduce((sum: number, value: number) => sum + value, 0)

            expect(totalPercentage).toBeCloseTo(100, 2)
        })

        it('handles empty input gracefully without returning NaN', () => {
            expect(getPercentageFrequencies('')).toEqual({})
            expect(getPercentageFrequencies('!!!')).toEqual({})
        })
    })

    describe('getLetterProbabilities', () => {

        it('calculates probability distribution normalized between 0.0 and 1.0', () => {
            const result = getLetterProbabilities('AAAB')

            expect(result).toEqual({ A: 0.75, B: 0.25 })
        })

        it('sums up to 1.0 for valid non-empty text', () => {
            const text = 'ATTACK AT DAWN'
            const probabilities = getLetterProbabilities(text)

            const totalProbability = Object.values(probabilities)
                .reduce((sum: number, value: number) => sum + value, 0)

            expect(totalProbability).toBeCloseTo(1.0, 4)
        })

        it('handles empty input gracefully without returning NaN', () => {
            expect(getLetterProbabilities('')).toEqual({})
            expect(getLetterProbabilities('12345')).toEqual({})
        })
    })
})