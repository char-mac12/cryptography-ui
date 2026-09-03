import { describe, expect, it } from 'vitest'
import { findRepeatedNGrams, getDistances, getFactors, kasiskiExamination } from '../../../cryptography/analysis//kasiski'

describe('kasiski', () => {

    describe('findRepeatedNGrams', () => {

        it('identifies repeated n-grams and maps them to their index positions', () => {
            const text = 'ABCDABC'
            const result = findRepeatedNGrams(text, 3)

            expect(result).toEqual({
                ABC: [0, 4]
            })
        })

        it('ignores n-grams that only occur once', () => {
            const text = 'ABCDEF'
            const result = findRepeatedNGrams(text, 3)

            expect(result).toEqual({})
        })

        it('returns an empty object when input string is shorter than n', () => {
            expect(findRepeatedNGrams('AB', 3)).toEqual({})
        })

        it('returns an empty object when given an empty string', () => {
            expect(findRepeatedNGrams('', 3)).toEqual({})
        })
    })

    describe('getDistances', () => {

        it('calculates all pairwise index differences for multiple occurrences', () => {
            const positions = [0, 4, 10]
            const distances = getDistances(positions)

            expect(distances).toEqual([4, 10, 6])
        })

        it('returns a single distance for two positions', () => {
            expect(getDistances([2, 8])).toEqual([6])
        })

        it('returns an empty array when given fewer than 2 positions', () => {
            expect(getDistances([5])).toEqual([])
            expect(getDistances([])).toEqual([])
        })
    })

    describe('getFactors', () => {

        it('returns all factors of a positive integer excluding 1 up to maxFactor', () => {
            expect(getFactors(12)).toEqual([2, 3, 4, 6, 12])
        })

        it('respects the maxFactor ceiling parameter', () => {
            expect(getFactors(100, 10)).toEqual([2, 4, 5, 10])
        })

        it('returns only the number itself for a prime number', () => {
            expect(getFactors(7)).toEqual([7])
        })

        it('returns an empty array for numbers less than 2', () => {
            expect(getFactors(1)).toEqual([])
            expect(getFactors(0)).toEqual([])
            expect(getFactors(-5)).toEqual([])
        })
    })

    describe('kasiskiExamination', () => {

        it('aggregates factor frequencies across repeated sequence distance gaps', () => {
            // String structure:
            // Index  0..2: 'ABC'
            // Index  3..5: '123' (unique padding)
            // Index  6..8: 'ABC' -> Distance = 6 - 0 = 6  (Factors: 2, 3, 6)
            // Index  9..11: '456' (unique padding)
            // Index 12..14: 'XYZ'
            // Index 15..17: '789' (unique padding)
            // Index 18..20: 'XYZ' -> Distance = 18 - 12 = 6 (Factors: 2, 3, 6)
            const text = 'ABC123ABC456XYZ789XYZ'
            
            const factorCounts = kasiskiExamination(text, 3)

            expect(factorCounts).toEqual({
                2: 2,
                3: 2,
                6: 2
            })
        })

        it('returns an empty object when no repeating n-grams exist', () => {
            const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            expect(kasiskiExamination(text, 3)).toEqual({})
        })

        it('returns an empty object when text is shorter than n', () => {
            expect(kasiskiExamination('AB', 3)).toEqual({})
        })
    })
})