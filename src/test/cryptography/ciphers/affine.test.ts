import { describe, expect, it } from 'vitest'
import { decryptAffine, encryptAffine } from '../../../cryptography/ciphers/affine'
import { normaliseText } from '../../../cryptography/utils/textNormaliser'

describe('Affine Cipher', () => {

    describe('validateA', () => {
        
        it('throws an error when a is not an integer', () => {
            const errorMessage = 'a must be an integer';

            expect(() => encryptAffine('ABC', 1.5, 3)).toThrow(errorMessage)
            expect(() => decryptAffine('ABC', 1.5, 3)).toThrow(errorMessage)
        })

        it('throws an error when gcd', () => {
            const errorMessage = 'a must be coprime with the alphabet size 26';

            expect(() => encryptAffine('ABC', 2, 3)).toThrow(errorMessage)
            expect(() => decryptAffine('ABC', 2, 3)).toThrow(errorMessage)
        })
    })

    describe('encryptAffine', () => {

        it('encrypts text', () => {
            expect(encryptAffine('ABC', 5, 8)).toBe('INS')
        })

        it('handles lowercase input', () => {
            expect(encryptAffine('abc', 5, 8)).toBe('INS')
        })

        it('removes spaces', () => {
            expect(encryptAffine('AB C', 5, 8)).toBe('INS')
        })

        it('removes punctuation and numbers', () => {
            expect(encryptAffine('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.123', 5, 8)).toBe('INS')
        })

        it('returns an empty string for empty input', () => {
            expect(encryptAffine('', 5, 8)).toBe('')
        })

        it('works with different valid keys', () => {
            expect(encryptAffine('ABC', 7, 3)).toBe('DKR')
        })
    })

    describe('decryptAffine', () => {

        it('decrypts text', () => {
            expect(decryptAffine('INS', 5, 8)).toBe('ABC')
        })

        it('handles lowercase input', () => {
            expect(decryptAffine('ins', 5, 8)).toBe('ABC')
        })

        it('removes spaces', () => {
            expect(decryptAffine('IN S', 5, 8)).toBe('ABC')
        })

        it('returns an empty string for empty input', () => {
            expect(decryptAffine('', 5, 8)).toBe('')
        })

        it('works with different valid keys', () => {
            expect(decryptAffine('DKR', 7, 3)).toBe('ABC')
        })
    })

    describe('encryption and decryption together', () => {

        it('decrypts an encrypted message back to the original', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = encryptAffine(original, 5, 8)
            const decrypted = decryptAffine(encrypted, 5, 8)

            expect(decrypted).toBe(normaliseText(original))
        })

        it('decrypts an encrypted message back to the original with different keys', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = encryptAffine(original, 7, 3)
            const decrypted = decryptAffine(encrypted, 7, 3)

            expect(decrypted).toBe(normaliseText(original))
        })
    })
})