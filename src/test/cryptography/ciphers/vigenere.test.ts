import { describe, expect, it } from 'vitest'
import { decryptVigenere, encryptVigenere } from '../../../cryptography/ciphers/vigenere';

describe('Vigenere Cipher', () => {

    describe('encryptVigenere', () => {
        
        it('encrypts text', () => {
            expect(encryptVigenere('HELLO', 'KEY')).toBe('RIJVS')
        })

        it('handles lowercase input', () => {
            expect(encryptVigenere('hello', 'KEY')).toBe('RIJVS')
        })

        it('preserves spaces', () => {
            expect(encryptVigenere('HELL O', 'KEY')).toBe('RIJV S')
        })

        it('preserves punctuation and numbers', () => {
            expect(encryptVigenere('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.', 'KEY')).toBe('(K)F!,A"£$%^&*-_+=[]@#~/|\\<>?.')
        })

        it('returns an empty string for empty input', () => {
            expect(encryptVigenere('', 'KEY')).toBe('')
        })

        it('throws an error when the keyword is empty', () => {
            const errorMessage = 'Keyword must not be empty'

            expect(() => encryptVigenere('HELLO', '')).toThrow(errorMessage)
        })

        it('throws an error when the keyword only contains non-letters', () => {
            const errorMessage = 'Keyword must not be empty'

            expect(() => encryptVigenere('HELLO', '123')).toThrow(errorMessage)
        })

        it('works with different valid keywords', () => {
            expect(encryptVigenere('ANOTHER PIECE OF TEXT', 'NEWKEY')).toBe('NRKDLCE TEOGC BJ POBR')
        })
    })

    describe('decryptVigenere', () => {
        
        it('decrypts text', () => {
            expect(decryptVigenere('RIJVS', 'KEY')).toBe('HELLO')
        })

        it('handles lowercase input', () => {
            expect(decryptVigenere('rijvs', 'KEY')).toBe('HELLO')
        })

        it('preserves spaces', () => {
            expect(decryptVigenere('RIJV S', 'KEY')).toBe('HELL O')
        })

        it('preserves punctuation and numbers', () => {
            expect(decryptVigenere('(K)F!,A"£$%^&*-_+=[]@#~/|\\<>?.', 'KEY')).toBe('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.')
        })

        it('returns an empty string for empty input', () => {
            expect(decryptVigenere('', 'KEY')).toBe('')
        })

        it('throws an error when the keyword is empty', () => {
            const errorMessage = 'Keyword must not be empty'

            expect(() => decryptVigenere('RIJVS', '')).toThrow(errorMessage)
        })

        it('throws an error when the keyword only contains non-letters', () => {
            const errorMessage = 'Keyword must not be empty'

            expect(() => decryptVigenere('RIJVS', '123')).toThrow(errorMessage)
        })

        it('works with different valid keywords', () => {
            expect(decryptVigenere('NRKDLCE TEOGC BJ POBR', 'NEWKEY')).toBe('ANOTHER PIECE OF TEXT')
        })
    })

    describe('encryption and decryption together', () => {

        it('decrypts an encrypted message back to the original', () => {
            const original = 'HELLO WORLD!'

            const encrypted = encryptVigenere(original, 'KEY')
            const decrypted = decryptVigenere(encrypted, 'KEY')

            expect(decrypted).toBe(original)
        })

        it('works with a keyword containing non-letter characters', () => {
            const original = 'THE QUICK BROWN FOX'

            const encrypted = encryptVigenere(original, 'LEMON!')
            const decrypted = decryptVigenere(encrypted, 'LEMON!')

            expect(decrypted).toBe(original)
        })
    })
})