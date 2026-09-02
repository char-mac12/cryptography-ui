import { describe, expect, it } from 'vitest'
import {
    characterToNatoPhonetic,
    natoPhoneticToCharacter
} from '../../../cryptography/encodings/natoPhonetic'

describe('NATO Phonetic Alphabet', () => {

    describe('characterToNatoPhonetic', () => {

        it('encodes text', () => {
            expect(characterToNatoPhonetic('ABC'))
                .toBe('Alfa Bravo Charlie')
        })

        it('handles lowercase text', () => {
            expect(characterToNatoPhonetic('abc'))
                .toBe('Alfa Bravo Charlie')
        })

        it('handles numbers', () => {
            expect(characterToNatoPhonetic('123'))
                .toBe('1 2 3')
        })

        it('converts spaces to forward slashes', () => {
            expect(characterToNatoPhonetic('AB C'))
                .toBe('Alfa Bravo / Charlie')
        })

        it('converts a full message', () => {
            expect(
                characterToNatoPhonetic('HELLO WORLD!')
            ).toBe(
                'Hotel Echo Lima Lima Oscar / Whiskey Oscar Romeo Lima Delta !'
            )
        })

        it('returns an empty string for empty input', () => {
            expect(characterToNatoPhonetic('')).toBe('')
        })

        it('preserves punctuation', () => {
            expect(
                characterToNatoPhonetic('A!B,C.')
            ).toBe(
                'Alfa ! Bravo , Charlie .'
            )
        })
    })

    describe('natoPhoneticToCharacter', () => {

        it('decodes text', () => {
            expect(
                natoPhoneticToCharacter('Alfa Bravo Charlie')
            ).toBe('ABC')
        })

        it('handles lowercase NATO phonetic words', () => {
            expect(
                natoPhoneticToCharacter('alfa bravo charlie')
            ).toBe('ABC')
        })

        it('handles unknown words', () => {
            expect(
                natoPhoneticToCharacter('Alfa Test Bravo')
            ).toBe('ATestB')
        })

        it('converts a full message', () => {
            expect(
                natoPhoneticToCharacter(
                    'Hotel Echo Lima Lima Oscar / Whiskey Oscar Romeo Lima Delta !'
                )
            ).toBe('HELLO WORLD!')
        })

        it('returns an empty string for empty input', () => {
            expect(natoPhoneticToCharacter('')).toBe('')
        })

        it('handles extra spaces', () => {
            expect(
                natoPhoneticToCharacter('Alfa   Bravo   Charlie')
            ).toBe('ABC')
        })
    })

    describe('encoding and decoding together', () => {

        it('converts NATO phonetic words back to the original text', () => {
            const original = 'HELLO WORLD!'

            const encrypted = characterToNatoPhonetic(original)
            const decrypted = natoPhoneticToCharacter(encrypted)

            expect(decrypted).toBe(original)
        })

        it('converts lowercase text back to uppercase', () => {
            const original = 'hello world'

            const encrypted = characterToNatoPhonetic(original)
            const decrypted = natoPhoneticToCharacter(encrypted)

            expect(decrypted).toBe(original.toUpperCase())
        })

        it('converts text containing numbers back to the original', () => {
            const original = 'TEST 123'

            const encrypted = characterToNatoPhonetic(original)
            const decrypted = natoPhoneticToCharacter(encrypted)

            expect(decrypted).toBe(original)
        })
    })
})