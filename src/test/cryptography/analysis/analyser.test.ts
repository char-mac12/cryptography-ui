import { describe, expect, it } from 'vitest'
import { analyseText } from '../../../cryptography/analysis/analyser'

describe('Text Analysis Orchestrator', () => {

    describe('analyseText', () => {

        it('aggregates complete statistical metadata for valid input text', () => {
            const input = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
            const result = analyseText(input)

            expect(result.original).toBe(input)
            expect(result.normalised).toBe('THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG')

            expect(result.coincidence.letterCount).toBe(35)
            expect(result.coincidence.indexOfCoincidence).toBeGreaterThan(0)
            expect(Object.keys(result.frequencies.letters)).toHaveLength(26)

            expect(result.entropy.overall).toBeGreaterThan(0)
            expect(result.entropy.lettersOnly).toBeGreaterThan(0)

            expect(Object.keys(result.ngrams.bigrams).length).toBeGreaterThan(0)
            expect(Object.keys(result.ngrams.trigrams).length).toBeGreaterThan(0)
            expect(Object.keys(result.ngrams.quadgrams).length).toBeGreaterThan(0)

            expect(result.language.vowelRatio).toBeGreaterThan(0)
            expect(typeof result.language.englishScore).toBe('number')

            expect(result.structure.length).toBe(input.length)
            expect(result.structure.hasSpaces).toBe(true)
        })

        it('correctly extracts repeated patterns and sequences', () => {
            // In raw text 'ABCXYZABC', normalised string is 'ABCXYZABC' -> indices [0, 6]
            const input = 'ABCXYZABC'
            const result = analyseText(input)

            const matchingPattern = result.patterns.repeatedSequences.find(
                (p) => p.sequence === 'ABC'
            )

            expect(matchingPattern).toBeDefined()
            expect(matchingPattern?.positions).toEqual([0, 6])
        })

        it('handles empty input gracefully across all sub-analyzers', () => {
            const result = analyseText('')

            expect(result.original).toBe('')
            expect(result.normalised).toBe('')
            expect(result.coincidence.indexOfCoincidence).toBe(0)
            expect(result.coincidence.letterCount).toBe(0)
            expect(result.entropy.overall).toBe(0)
            expect(result.entropy.lettersOnly).toBe(0)
            expect(result.language.vowelRatio).toBe(0)
            expect(result.patterns.repeatedSequences).toEqual([])
        })
    })
})