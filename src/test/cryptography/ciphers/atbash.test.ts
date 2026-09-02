import { describe, expect, it } from 'vitest'
import { atbash } from '../../../cryptography/ciphers/atbash'

describe('Atbash Cipher', () => {

    describe('atbash', () => {
        
        it('encrypts text', () => {
            expect(atbash('ABC')).toBe('ZYX')
        })

        it('handles lowercase input', () => {
            expect(atbash('abc')).toBe('ZYX')
        })

        it('returns an empty string for empty input', () => {
            expect(atbash('')).toBe('')
        })

        it('preserves spaces', () => {
            expect(atbash('AB C')).toBe('ZY X')
        })

        it('preserves punctuation and numbers', () => {
            expect(atbash('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.123')).toBe('(Z)Y!,X"£$%^&*-_+=[]@#~/|\\<>?.123')
        })

        it('encrypts a full message', () => {
            expect(atbash('HELLO, WORLD!')).toBe('SVOOL, DLIOW!')
        })

        it('returns the original when applied twice', () => {
            const original = "HELLO, WORLD!"

            expect(atbash(atbash(original))).toBe(original)
        })
    })
})