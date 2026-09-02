import { describe, expect, it } from 'vitest'
import {
    prepareKeyword,
    generateKeywordSquare,
    preparePlaintext,
    prepareCiphertext,
    encryptPlayfair,
    decryptPlayfair,
    playfairEncryptionSteps,
    playfairDecryptionSteps,
    getDigraphFrequencies
} from '../../../cryptography/ciphers/playfair'

describe('Playfair Cipher', () => {

    describe('prepareKeyword', () => {

        it('removes non-letter characters from the keyword', () => {
            expect(prepareKeyword('MONARCHY! 123')).toEqual({
                cleanedKeyword: 'MONARCHY',
                uniqueKeyword: 'MONARCHY',
                preparedKeyword: 'MONARCHYBDEFGIKLPQSTUVWXZ'
            })
        })

        it('converts J to I', () => {
            expect(prepareKeyword('JIG')).toEqual({
                cleanedKeyword: 'IIG',
                uniqueKeyword: 'IG',
                preparedKeyword: 'IGABCDEFHKLMNOPQRSTUVWXYZ'
            })
        })

        it('removes duplicate letters from the keyword', () => {
            expect(prepareKeyword('BALLOON')).toEqual({
                cleanedKeyword: 'BALLOON',
                uniqueKeyword: 'BALON',
                preparedKeyword: 'BALONCDEFGHIKMPQRSTUVWXYZ'
            })
        })

        it('creates a complete 25-letter alphabet', () => {
            const result = prepareKeyword('')

            expect(result.preparedKeyword).toHaveLength(25)
            expect(result.preparedKeyword).toBe(
                'ABCDEFGHIKLMNOPQRSTUVWXYZ'
            )
        })
    })

    describe('generateKeywordSquare', () => {

        it('generates a 5 by 5 keyword square', () => {
            expect(generateKeywordSquare('MONARCHY')).toEqual([
                ['M', 'O', 'N', 'A', 'R'],
                ['C', 'H', 'Y', 'B', 'D'],
                ['E', 'F', 'G', 'I', 'K'],
                ['L', 'P', 'Q', 'S', 'T'],
                ['U', 'V', 'W', 'X', 'Z']
            ])
        })

        it('does not include J in the square', () => {
            const square = generateKeywordSquare('KEYWORD')

            expect(square.flat()).not.toContain('J')
        })
    })

    describe('preparePlaintext', () => {

        it('removes spaces and punctuation', () => {
            expect(preparePlaintext('HELLO WORLD!')).toEqual([
                'HE',
                'LX',
                'LO',
                'WO',
                'RL',
                'DX'
            ])
        })

        it('converts lowercase input to uppercase', () => {
            expect(preparePlaintext('hello')).toEqual([
                'HE',
                'LX',
                'LO'
            ])
        })

        it('converts J to I', () => {
            expect(preparePlaintext('JIG')).toEqual([
                'IX',
                'IG'
            ])
        })

        it('separates repeated letters with X', () => {
            expect(preparePlaintext('BALLOON')).toEqual([
                'BA',
                'LX',
                'LO',
                'ON'
            ])
        })

        it('pads an odd-length message with X', () => {
            expect(preparePlaintext('HELLOX')).toEqual([
                'HE',
                'LX',
                'LO',
                'XX'
            ])
        })

        it('returns an empty array for empty input', () => {
            expect(preparePlaintext('')).toEqual([])
        })
    })

    describe('prepareCiphertext', () => {

        it('splits ciphertext into pairs', () => {
            expect(prepareCiphertext('GATLMZCLRQXA')).toEqual([
                'GA',
                'TL',
                'MZ',
                'CL',
                'RQ',
                'XA'
            ])
        })

        it('removes spaces and punctuation', () => {
            expect(prepareCiphertext('GA TL-MZ!')).toEqual([
                'GA',
                'TL',
                'MZ'
            ])
        })

        it('converts lowercase input to uppercase', () => {
            expect(prepareCiphertext('gatlmz')).toEqual([
                'GA',
                'TL',
                'MZ'
            ])
        })

        it('converts J to I', () => {
            expect(prepareCiphertext('JA')).toEqual([
                'IA'
            ])
        })

        it('returns an empty array for empty input', () => {
            expect(prepareCiphertext('')).toEqual([])
        })
    })

    describe('playfairEncrypt', () => {

        it('encrypts text using the keyword square', () => {
            expect(encryptPlayfair('INSTRUMENTS', 'MONARCHY'))
                .toBe('GATLMZCLRQXA')
        })

        it('handles lowercase input', () => {
            expect(encryptPlayfair('instruments', 'MONARCHY'))
                .toBe('GATLMZCLRQXA')
        })

        it('removes spaces and punctuation', () => {
            expect(encryptPlayfair('INSTRUMENTS!', 'MONARCHY'))
                .toBe('GATLMZCLRQXA')
        })

        it('handles repeated letters', () => {
            expect(encryptPlayfair('BALLOON', 'MONARCHY'))
                .toBeTruthy()
        })

        it('returns an empty string for empty input', () => {
            expect(encryptPlayfair('', 'MONARCHY')).toBe('')
        })
    })

    describe('playfairDecrypt', () => {

        it('decrypts text using the keyword square', () => {
            expect(decryptPlayfair('GATLMZCLRQXA', 'MONARCHY'))
                .toBe('INSTRUMENTSX')
        })

        it('handles lowercase input', () => {
            expect(decryptPlayfair('gatlmzclrqxa', 'MONARCHY'))
                .toBe('INSTRUMENTSX')
        })

        it('removes spaces and punctuation', () => {
            expect(decryptPlayfair('GATL MZ-CLRQXA!', 'MONARCHY'))
                .toBe('INSTRUMENTSX')
        })

        it('returns an empty string for empty input', () => {
            expect(decryptPlayfair('', 'MONARCHY')).toBe('')
        })
    })

    describe('playfairEncryptionSteps', () => {

        it('returns a step for each plaintext pair', () => {
            const steps = playfairEncryptionSteps(
                'INSTRUMENTS',
                'MONARCHY'
            )

            expect(steps).toHaveLength(6)
        })

        it('includes the pair, rule, positions and result', () => {
            const steps = playfairEncryptionSteps(
                'INSTRUMENTS',
                'MONARCHY'
            )

            expect(steps[0]).toEqual({
                pair: 'IN',
                rule: 'rectangle',
                firstPosition: {
                    row: 2,
                    col: 3
                },
                secondPosition: {
                    row: 0,
                    col: 2
                },
                result: 'GA'
            })
        })
    })

    describe('playfairDecryptionSteps', () => {

        it('returns a step for each ciphertext pair', () => {
            const steps = playfairDecryptionSteps(
                'GATLMZCLRQXA',
                'MONARCHY'
            )

            expect(steps).toHaveLength(6)
        })

        it('includes the pair, rule, positions and result', () => {
            const steps = playfairDecryptionSteps(
                'GATLMZCLRQXA',
                'MONARCHY'
            )

            expect(steps[0]).toEqual({
                pair: 'GA',
                rule: 'rectangle',
                firstPosition: {
                    row: 2,
                    col: 2
                },
                secondPosition: {
                    row: 0,
                    col: 3
                },
                result: 'IN'
            })
        })
    })

    describe('getDigraphFrequencies', () => {

        it('counts digraph frequencies', () => {
            expect(getDigraphFrequencies('ABABCDAB')).toEqual([
                {
                    pair: 'AB',
                    count: 3
                },
                {
                    pair: 'CD',
                    count: 1
                }
            ])
        })

        it('ignores non-letter characters', () => {
            expect(getDigraphFrequencies('AB AB-CD!')).toEqual([
                {
                    pair: 'AB',
                    count: 2
                },
                {
                    pair: 'CD',
                    count: 1
                }
            ])
        })

        it('converts J to I', () => {
            expect(getDigraphFrequencies('JAJA')).toEqual([
                {
                    pair: 'IA',
                    count: 2
                }
            ])
        })

        it('returns an empty array for empty input', () => {
            expect(getDigraphFrequencies('')).toEqual([])
        })
    })

    describe('encryption and decryption together', () => {

        it('decrypts encrypted text back to the prepared plaintext', () => {
            const original = 'INSTRUMENTS'

            const encrypted = encryptPlayfair(original, 'MONARCHY')
            const decrypted = decryptPlayfair(encrypted, 'MONARCHY')

            expect(decrypted).toBe('INSTRUMENTSX')
        })
    })
})