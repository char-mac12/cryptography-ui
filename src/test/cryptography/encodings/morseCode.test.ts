import { describe, expect, it } from 'vitest'
import {
    characterToMorse,
    morseToCharacter
} from '../../../cryptography/encodings/morseCode'

describe('Morse Code', () => {

    describe('characterToMorse', () => {

        it('converts letters to Morse code', () => {
            expect(characterToMorse('ABC')).toBe('.- -... -.-.')
        })

        it('converts lowercase to uppercase Morse code', () => {
            expect(characterToMorse('abc')).toBe('.- -... -.-.')
        })

        it('converts numbers to Morse code', () => {
            expect(characterToMorse('123')).toBe('.---- ..--- ...--')
        })

        it('converts spaces to forward slashes', () => {
            expect(characterToMorse('AB C')).toBe('.- -... / -.-.')
        })

        it('converts a full message', () => {
            expect(
                characterToMorse('HELLO WORLD')
            ).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')
        })

        it('empty text is returned', () => {
            expect(characterToMorse('')).toBe('')
        })

        it('preserves unsupported characters', () => {
            expect(characterToMorse('A!B')).toBe('.-  -...')
        })
    })

    describe('morseToCharacter', () => {

        it('converts Morse code to letters', () => {
            expect(morseToCharacter('.- -... -.-.')).toBe('ABC')
        })

        it('converts Morse code to numbers', () => {
            expect(morseToCharacter('.---- ..--- ...--')).toBe('123')
        })

        it('converts forward slashes to spaces', () => {
            expect(morseToCharacter('.- -... / -.-.')).toBe('AB C')
        })

        it('converts a full message', () => {
            expect(
                morseToCharacter(
                    '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'
                )
            ).toBe('HELLO WORLD')
        })

        it('empty Morse code is returned', () => {
            expect(morseToCharacter('')).toBe('')
        })

        it('handles unknown Morse codes', () => {
            expect(morseToCharacter('.- ....... -...')).toBe('AB')
        })
    })

    describe('conversion together', () => {

        it('converts Morse back to the original text', () => {
            const original = 'HELLO WORLD'

            const encrypted = characterToMorse(original)
            const decrypted = morseToCharacter(encrypted)

            expect(decrypted).toBe(original)
        })

        it('converts lowercase text back to uppercase', () => {
            const original = 'hello world'

            const encrypted = characterToMorse(original)
            const decrypted = morseToCharacter(encrypted)

            expect(decrypted).toBe(original.toUpperCase())
        })

        it('converts text containing numbers back to the original', () => {
            const original = 'TEST 123'

            const encrypted = characterToMorse(original)
            const decrypted = morseToCharacter(encrypted)

            expect(decrypted).toBe(original)
        })
    })
})