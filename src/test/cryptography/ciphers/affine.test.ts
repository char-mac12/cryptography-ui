import { describe, expect, it } from 'vitest'
import { affineDecrypt, affineEncrypt } from '../../../cryptography/ciphers/affine'
import { normaliseText } from '../../../cryptography/utils/textNormaliser'

describe('Affine Cipher', () => {

    describe('validateA', () => {
        
        it('throws an error when a is not an integer', () => {
            const errorMessage = 'a must be an integer';

            expect(() => affineEncrypt('ABC', 1.5, 3)).toThrow(errorMessage)
            expect(() => affineDecrypt('ABC', 1.5, 3)).toThrow(errorMessage)
        })

        it('throws an error when gcd', () => {
            const errorMessage = 'a must be coprime with the alphabet size 26';

            expect(() => affineEncrypt('ABC', 2, 3)).toThrow(errorMessage)
            expect(() => affineDecrypt('ABC', 2, 3)).toThrow(errorMessage)
        })
    })

    describe('affineEncrypt', () => {

        it('encrypts text', () => {
            expect(affineEncrypt('ABC', 5, 8)).toBe('INS')
        })

        it('handles lowercase input', () => {
            expect(affineEncrypt('abc', 5, 8)).toBe('INS')
        })

        it('removes spaces', () => {
            expect(affineEncrypt('AB C', 5, 8)).toBe('INS')
        })

        it('removes punctuation and numbers', () => {
            expect(affineEncrypt('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.', 5, 8)).toBe('INS')
        })

        it('returns an empty string for empty input', () => {
            expect(affineEncrypt('', 5, 8)).toBe('')
        })

        it('works with different valid keys', () => {
            expect(affineEncrypt('ABC', 7, 3)).toBe('DKR')
        })
    })

    describe('affineDecrypt', () => {

        it('decrypts text', () => {
            expect(affineDecrypt('INS', 5, 8)).toBe('ABC')
        })

        it('handles lowercase input', () => {
            expect(affineDecrypt('ins', 5, 8)).toBe('ABC')
        })

        it('removes spaces', () => {
            expect(affineDecrypt('IN S', 5, 8)).toBe('ABC')
        })

        it('returns an empty string for empty input', () => {
            expect(affineDecrypt('', 5, 8)).toBe('')
        })

        it('works with different valid keys', () => {
            expect(affineDecrypt('DKR', 7, 3)).toBe('ABC')
        })
    })

    describe('encryption and decryption together', () => {

        it('decrypts an encrypted message back to the original', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = affineEncrypt(original, 5, 8)
            const decrypted = affineDecrypt(encrypted, 5, 8)

            expect(decrypted).toBe(normaliseText(original))
        })

        it('decrypts an encrypted message back to the original with different keys', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = affineEncrypt(original, 7, 3)
            const decrypted = affineDecrypt(encrypted, 7, 3)

            expect(decrypted).toBe(normaliseText(original))
        })
    })
})