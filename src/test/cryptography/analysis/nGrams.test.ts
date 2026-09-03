import { describe, expect, it } from 'vitest'
import { findRepeatedSequences, getNGrams, nGramFrequencies } from '../../../cryptography/analysis/nGrams'

describe('nGrams', () => {

    describe('getNGrams', () => {

        it('extracts correct sequential n-grams from standard text', () => {
            const text = 'HELLO'
            const trigrams = getNGrams(text, 3)

            expect(trigrams).toEqual(['HEL', 'ELL', 'LLO'])
        })

        it('extracts quadgrams correctly when n matches text length', () => {
            expect(getNGrams('CODE', 4)).toEqual(['CODE'])
        })

        it('returns an empty array when text length is smaller than n', () => {
            expect(getNGrams('HI', 3)).toEqual([])
        })

        it('returns an empty array when given an empty string', () => {
            expect(getNGrams('', 4)).toEqual([])
        })
    })

    describe('nGramFrequencies', () => {

        it('counts occurrences of repeating n-grams correctly', () => {
            const text = 'ANANAS'
            const bigrams = nGramFrequencies(text, 2)

            expect(bigrams).toEqual({
                AN: 2,
                NA: 2,
                AS: 1
            })
        })

        it('returns 1 for unique n-grams', () => {
            const text = 'ABCD'
            const quadgrams = nGramFrequencies(text, 4)

            expect(quadgrams).toEqual({ ABCD: 1 })
        })

        it('returns an empty object when input string is shorter than n', () => {
            expect(nGramFrequencies('CAT', 4)).toEqual({})
        })
    })

    describe('findRepeatedSequences', () => {

        it('identifies repeated sequences and records their starting index positions', () => {
            const text = 'THE_THE'
            const repeats = findRepeatedSequences(text, 3)

            expect(repeats).toContainEqual({
                sequence: 'THE',
                positions: [0, 4]
            })
        })

        it('ignores sequences that only appear once', () => {
            const text = 'ABCDEF'
            const repeats = findRepeatedSequences(text, 3)

            expect(repeats).toEqual([])
        })

        it('returns an empty array when text is shorter than sequence length', () => {
            expect(findRepeatedSequences('AB', 3)).toEqual([])
        })

        it('returns an empty array when given an empty string', () => {
            expect(findRepeatedSequences('', 3)).toEqual([])
        })
    })
})