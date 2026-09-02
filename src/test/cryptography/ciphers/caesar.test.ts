import { describe, expect, it } from 'vitest'
import { encryptCaesar, decryptCaesar } from '../../../cryptography/ciphers/caesar'

describe('Caesar Cipher', () => {

    describe('encryptCaesar', () => {

        it('encrypts text with a positive shift', () => {
            expect(encryptCaesar('ABC', 3)).toBe('DEF')
        })

        it('wraps around alphabet with a positive shift', () => {
            expect(encryptCaesar('XYZ', 3)).toBe('ABC')
        })

        it('encrypts text with a negative shift', () => {
            expect(encryptCaesar('DEF', -3)).toBe('ABC')
        })

        it('wraps around alphabet with a negative shift', () => {
            expect(encryptCaesar('ABC', -3)).toBe('XYZ')
        })

        it('converts lowercase to uppercase', () => {
            expect(encryptCaesar('abc', 3)).toBe('DEF')
        })

        it('empty text is returned', () => {
            expect(encryptCaesar('', 3)).toBe('')
        })

        it('preserves spaces', () => {
            expect(encryptCaesar('AB C', 3)).toBe('DE F')
        })

        it('preserves punctuation and numbers', () => {
            expect(encryptCaesar('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.', 3)).toBe('(D)E!,F"£$%^&*-_+=[]@#~/|\\<>?.')
        })

        it('returns the same text with a shift of zero', () => {
            expect(encryptCaesar('ABC', 0)).toBe('ABC')
        })

        it('handles shifts greater than the alphabet length', () => {
            expect(encryptCaesar('ABC', 29)).toBe('DEF')
        })

        it('encrypts a full message', () => {
            expect(
                encryptCaesar('HELLO, WORLD!', 3)
            ).toBe('KHOOR, ZRUOG!')
        })
    })

    describe('decryptCaesar', () => {

        it('decrypts text with a positive shift', () => {
            expect(decryptCaesar('DEF', 3)).toBe('ABC')
        })

        it('wraps around alphabet with a positive shift', () => {
            expect(decryptCaesar('ABC', 3)).toBe('XYZ')
        })

        it('decrypts text with a negative shift', () => {
            expect(decryptCaesar('ABC', -3)).toBe('DEF')
        })

        it('wraps around alphabet with a negative shift', () => {
            expect(decryptCaesar('XYZ', -3)).toBe('ABC')
        })

        it('converts lowercase to uppercase', () => {
            expect(decryptCaesar('def', 3)).toBe('ABC')
        })

        it('empty text is returned', () => {
            expect(decryptCaesar('', 3)).toBe('')
        })

        it('preserves spaces', () => {
            expect(decryptCaesar('DE F', 3)).toBe('AB C')
        })

        it('preserves punctuation and numbers', () => {
            expect(decryptCaesar('(D)E!,F"£$%^&*-_+=[]@#~/|\\<>?.', 3)).toBe('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.')
        })

        it('returns the same text with a shift of zero', () => {
            expect(decryptCaesar('ABC', 0)).toBe('ABC')
        })

        it('handles shifts greater than the alphabet length', () => {
            expect(decryptCaesar('DEF', 29)).toBe('ABC')
        })

        it('decrypts a full message', () => {
            expect(
                decryptCaesar('KHOOR, ZRUOG!', 3)
            ).toBe('HELLO, WORLD!')
        })
    })

    describe('encryption and decryption together', () => {
        it('decrypts an encrypted message back to the original', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = encryptCaesar(original, 3)
            const decrypted = decryptCaesar(encrypted, 3)

            expect(decrypted).toBe(original)
        })

        it('decrypts an encrypted message back to the original with a different shift', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = encryptCaesar(original, 12)
            const decrypted = decryptCaesar(encrypted, 12)

            expect(decrypted).toBe(original)
        })
    })
})