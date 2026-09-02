import { describe, expect, it } from 'vitest'
import {
    characterToTapCode,
    tapCodeToCharacter,
    tapCodeToTaps,
    tapsToTapCode
} from '../../../cryptography/encodings/tapCode'

describe('Tap Code', () => {

    describe('characterToTapCode', () => {

        it('encodes text', () => {
            expect(characterToTapCode('ABC'))
                .toBe('11 12 13')
        })

        it('handles lowercase text', () => {
            expect(characterToTapCode('abc'))
                .toBe('11 12 13')
        })

        it('handles K as C', () => {
            expect(characterToTapCode('K'))
                .toBe('13')
        })

        it('removes non-letter characters', () => {
            expect(characterToTapCode('A1! B,C.'))
                .toBe('11 12 13')
        })

        it('converts a full message', () => {
            expect(
                characterToTapCode('HELLO WORLD!')
            ).toBe(
                '23 15 31 31 34 52 34 42 31 14'
            )
        })

        it('returns an empty string for empty input', () => {
            expect(characterToTapCode('')).toBe('')
        })

        it('returns an empty string for non-letter input', () => {
            expect(characterToTapCode('123!')).toBe('')
        })

        it('encodes K as C', () => {
            expect(characterToTapCode('K'))
                .toBe('13')
        })
    })

    describe('tapCodeToCharacter', () => {

        it('decodes text', () => {
            expect(
                tapCodeToCharacter('11 12 13')
            ).toBe('ABC')
        })

        it('decodes K as C', () => {
            expect(
                tapCodeToCharacter('13')
            ).toBe('C')
        })

        it('handles unknown codes', () => {
            expect(
                tapCodeToCharacter('11 66 12')
            ).toBe('A66B')
        })

        it('converts a full message', () => {
            expect(
                tapCodeToCharacter(
                    '23 15 31 31 34 52 34 42 31 14'
                )
            ).toBe('HELLOWORLD')
        })

        it('returns an empty string for empty input', () => {
            expect(tapCodeToCharacter('')).toBe('')
        })

        it('handles extra spaces', () => {
            expect(
                tapCodeToCharacter('11   12   13')
            ).toBe('ABC')
        })

        it('decodes 13 as C', () => {
            expect(tapCodeToCharacter('13'))
                .toBe('C')
        })
    })

    describe('tapCodeToTaps', () => {

        it('converts tap code to taps', () => {
            expect(
                tapCodeToTaps('11 12 13')
            ).toBe('. .  . ..  . ...')
        })

        it('converts a full message to taps', () => {
            expect(
                tapCodeToTaps('23 15')
            ).toBe('.. ...  . .....')
        })

        it('handles extra spaces', () => {
            expect(
                tapCodeToTaps('11   12')
            ).toBe('. .  . ..')
        })

        it('preserves invalid codes', () => {
            expect(
                tapCodeToTaps('11 ABC 12')
            ).toBe('. .  ABC  . ..')
        })

        it('returns an empty string for empty input', () => {
            expect(tapCodeToTaps('')).toBe('')
        })
    })

    describe('tapsToTapCode', () => {

        it('converts taps to tap code', () => {
            expect(
                tapsToTapCode('. .  . ..  . ...')
            ).toBe('11 12 13')
        })

        it('converts a full message to tap code', () => {
            expect(
                tapsToTapCode('.. ...  . .....')
            ).toBe('23 15')
        })

        it('handles extra spaces', () => {
            expect(
                tapsToTapCode('. .   . ..')
            ).toBe('11 12')
        })

        it('preserves invalid tap groups', () => {
            expect(
                tapsToTapCode('...... .')
            ).toBe('...... .')
        })

        it('returns the original text for an odd number of groups', () => {
            expect(
                tapsToTapCode('. . .')
            ).toBe('. . .')
        })

        it('returns an empty string for empty input', () => {
            expect(tapsToTapCode('')).toBe('')
        })
    })

    describe('conversion together', () => {

        it('converts tap code back to the original text', () => {
            const original = 'HELLO'

            const encrypted = characterToTapCode(original)
            const decrypted = tapCodeToCharacter(encrypted)

            expect(decrypted).toBe(original)
        })

        it('converts lowercase text back to uppercase', () => {
            const original = 'hello'

            const encrypted = characterToTapCode(original)
            const decrypted = tapCodeToCharacter(encrypted)

            expect(decrypted).toBe(original.toUpperCase())
        })

        it('removes non-letter characters during conversion', () => {
            const original = 'HELLO WORLD! 123'

            const encrypted = characterToTapCode(original)
            const decrypted = tapCodeToCharacter(encrypted)

            expect(decrypted).toBe('HELLOWORLD')
        })
    })

    describe('tap code and taps together', () => {

        it('converts tap code to taps and back again', () => {
            const original = '11 12 13 21 22'

            const taps = tapCodeToTaps(original)
            const converted = tapsToTapCode(taps)

            expect(converted).toBe(original)
        })

        it('converts taps to tap code and back again', () => {
            const original = '. .  . ..  . ...'

            const tapCode = tapsToTapCode(original)
            const taps = tapCodeToTaps(tapCode)

            expect(taps).toBe(original)
        })
    })
})