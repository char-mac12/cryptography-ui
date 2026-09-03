import { describe, expect, it } from 'vitest'
import { analyseStructure, calculateVowelRatio, countRepeatedCharacters, countRepeatedLetters, getTextStatistics } from '../../../cryptography/analysis/textStatistics'

describe('Text Statistics', () => {

    describe('getTextStatistics', () => {
        
        it('calculates statistics for standard mixed text', () => {
            const text = 'Hello 123!'

            const result = getTextStatistics(text)

            expect(result).toEqual({
                length: 10,
                letters: 5,
                digits: 3,
                spaces: 1,
                punctuation: 1,
                uppercase: 1,
                lowercase: 4,
                uniqueLetters: ['H', 'E', 'L', 'O'],
                onlyLetters: false
            })
        })

        it('handles empty string input', () => {
            expect(getTextStatistics('')).toEqual({
                length: 0,
                letters: 0,
                digits: 0,
                spaces: 0,
                punctuation: 0,
                uppercase: 0,
                lowercase: 0,
                uniqueLetters: [],
                onlyLetters: false
            })
        })

        it('identifies when the text only contains letters', () => {
            const letterOnlyText = 'TextOnly'

            const result = getTextStatistics(letterOnlyText)

            expect(result.onlyLetters).toBe(true)
        })

        it('correctly categorises uppercase and lowercase letters', () => {
            const text = 'TestTEST'

            const result = getTextStatistics(text)

            expect(result.letters).toBe(8)
            expect(result.uppercase).toBe(5)
            expect(result.lowercase).toBe(3)
        })

        it('ensures unique letters only contains uppercase letters and no duplicates', () => {
            const text = 'AaBbbCc'

            const result = getTextStatistics(text)

            expect(result.uniqueLetters).toEqual(['A', 'B', 'C'])
        })

        it('correctly categorises digits, spaces and punctuation', () => {
            const text = '42\t\n.,!? () '

            const result = getTextStatistics(text)

            expect(result.letters).toBe(0)
            expect(result.digits).toBe(2)
            expect(result.spaces).toBe(4)
            expect(result.punctuation).toBe(6)
        })
    })

    describe('analyseStructure', () => {
        
        it('calculates character ratios and structural flags correctly', () => {
            const text = 'A1 !b'

            const result = analyseStructure(text)

            expect(result).toEqual({
                length: 5,

                letterRatio: 0.4,
                digitRatio: 0.2,
                spaceRatio: 0.2,
                punctuationRatio: 0.2,
                uppercaseRatio: 0.5,
                lowercaseRatio: 0.5,

                hasSpaces: true,
                hasNumbers: true,
                hasSymbols: true,
                characterSet: 'A1 !b'
            })
        })

        it('handles ratios with large decimal places', () => {
            const text = 'a234567'

            const result = analyseStructure(text)
            
            expect(result.length).toBe(7)
            expect(result.letterRatio).toBeCloseTo(1 / 7)
            expect(result.digitRatio).toBeCloseTo(6 / 7)
        })

        it('handles empty text', () => {
            expect(analyseStructure('')).toEqual({
                length: 0,

                letterRatio: 0,
                digitRatio: 0,
                spaceRatio: 0,
                punctuationRatio: 0,
                uppercaseRatio: 0,
                lowercaseRatio: 0,

                hasSpaces: false,
                hasNumbers: false,
                hasSymbols: false,
                characterSet: ''
            })
        })
        

        it('deduplicates character set correctly', () => {
            const text = 'AABBCCDd  ??'

            const result = analyseStructure(text)

            expect(result.characterSet).toBe('ABCDd ?')
        })

        it('includes a single space in characterSet when given whitespace-only input', () => {
            const result = analyseStructure('   \u00A0\t')

            expect(result.hasSpaces).toBe(true)
            expect(result.characterSet).toBe(' ')
        })
    })

    describe('calculateVowelRatio', () => {
        
        it('calculates vowel ratio correctly', () => {
            expect(calculateVowelRatio('ABCDE')).toBe(0.4)
        })

        it('handles empty text', () => {
            expect(calculateVowelRatio('')).toBe(0)
        })

        it('ignores non-letters', () => {
            expect(calculateVowelRatio('123!() ?')).toBe(0)
        })

        it('includes both lowercase and uppercase letters', () => {
            expect(calculateVowelRatio('aABC')).toBe(0.5)
        })

        it('handles ratios with large decimal places', () => {
            expect(calculateVowelRatio('ABCDBCD')).toBeCloseTo(1 / 7)
        })
    })

    describe('countRepeatedCharacters', () => {
        
        it('counts repeated characters including digits, spaces and symbols', () => {
            const text = 'a a!! 112 '

            const result = countRepeatedCharacters(text)

            expect(result).toEqual({
                'a': 2,
                ' ': 3,
                '!': 2,
                '1': 2
            })
            expect(result['2']).toBeUndefined()
        })

        it('treats uppercase and lowercase separately', () => {
            const text = 'AaA'

            const result = countRepeatedCharacters(text)

            expect(result).toEqual({
                'A': 2
            })
            expect(result['a']).toBeUndefined()
        })

        it('returns empty object for empty text', () => {
            expect(countRepeatedCharacters('')).toEqual({})
        })

        it('returns empty object when no characters repeat', () => {
            expect(countRepeatedCharacters('abc123')).toEqual({})
        })
    })

    describe('countRepeatedLetters', () => {
        it('counts repeated letters case-insensitively', () => {
            const text = 'Hello, World!'

            const result = countRepeatedLetters(text)

            expect(result).toEqual({
                'L': 3,
                'O': 2
            })
        })

        it('ignores non-letter characters', () => {
            const text = 'A1A!@A'

            const result = countRepeatedLetters(text)

            expect(result).toEqual({
                'A': 3
            })
            expect(result['1']).toBeUndefined()
            expect(result['!']).toBeUndefined()
            expect(result['@']).toBeUndefined()
        })

        it('returns empty object for empty text', () => {
            expect(countRepeatedLetters('')).toEqual({})
        })

        it('returns empty object when no letters repeat', () => {
            expect(countRepeatedLetters('abc!!')).toEqual({})
        })
    })
})