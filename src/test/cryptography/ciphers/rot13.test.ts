import { describe, expect, it } from 'vitest'
import { rot13 } from '../../../cryptography/ciphers/rot13'

describe('Rot13 Cipher', () => {

    describe('Rot13', () => {
        
        it('encrypts text', () => {
            expect(rot13('ABC')).toBe('NOP')
        })

        it('handles lowercase input', () => {
            expect(rot13('abc')).toBe('NOP')
        })

        it('returns an empty string for empty input', () => {
            expect(rot13('')).toBe('')
        })

        it('preserves spaces', () => {
            expect(rot13('AB C')).toBe('NO P')
        })

        it('preserves punctuation and numbers', () => {
            expect(rot13('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.123')).toBe('(N)O!,P"£$%^&*-_+=[]@#~/|\\<>?.123')
        })

        it('encrypts a full message', () => {
            expect(rot13('HELLO, WORLD!')).toBe('URYYB, JBEYQ!')
        })

        it('returns the original when applied twice', () => {
            const original = "HELLO, WORLD!"

            expect(rot13(rot13(original))).toBe(original)
        })
    })
})