import { describe, expect, it } from 'vitest'
import { friedmanTest, splitIntoColumns } from '../../../cryptography/analysis/friedman'

describe('Friedman Test', () => {

    describe('splitIntoColumns', () => {

        it('splits text into modular index columns based on key length', () => {
            // Index 0 -> Col 0 ('A'), Index 1 -> Col 1 ('B'), Index 2 -> Col 0 ('C'), Index 3 -> Col 1 ('D')
            const result = splitIntoColumns('ABCD', 2)

            expect(result).toEqual(['AC', 'BD'])
        })

        it('handles key length 1 by returning the entire text in a single column', () => {
            expect(splitIntoColumns('HELLO', 1)).toEqual(['HELLO'])
        })

        it('returns empty string entries when text length is less than key length', () => {
            const result = splitIntoColumns('AB', 4)

            expect(result).toEqual(['A', 'B', '', ''])
        })
    })

    describe('friedmanTest', () => {

        it('calculates average Index of Coincidence for candidate key lengths up to maxKeyLength', () => {
            const text = 'AABBAABBAABB'
            const results = friedmanTest(text, 3)

            expect(Object.keys(results)).toEqual(['1', '2', '3'])
            expect(results[1]).toBeGreaterThanOrEqual(0)
            expect(results[2]).toBeGreaterThanOrEqual(0)
            expect(results[3]).toBeGreaterThanOrEqual(0)
        })

        it('shows significantly higher IC at the true key length period', () => {
            // Construct text where every 2nd letter belongs to an identical alphabet
            // Col 0: "AAAAAA" (IC = 1.0), Col 1: "BBBBBB" (IC = 1.0) -> Average IC at keyLength 2 = 1.0
            const text = 'ABABABABABAB'
            const results = friedmanTest(text, 3)

            expect(results[2]).toBe(1)
            expect(results[3]).toBeLessThan(1)
        })

        it('cleans non-letter characters before evaluating periodic columns', () => {
            const text = 'A! B! A! B! A! B!'
            const results = friedmanTest(text, 2)

            expect(results[2]).toBe(1)
        })

        it('handles empty input gracefully by returning 0 for all key lengths', () => {
            const results = friedmanTest('', 3)

            expect(results).toEqual({
                1: 0,
                2: 0,
                3: 0
            })
        })
    })
})