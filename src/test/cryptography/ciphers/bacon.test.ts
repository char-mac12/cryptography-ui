import { describe, expect, it } from 'vitest'
import { decryptBacon, encryptBacon } from '../../../cryptography/ciphers/bacon'
import { normaliseText } from '../../../cryptography/utils/textNormaliser'

// encryptBacon
// decryptBacon

describe('Bacon Cipher', () => {
    
    describe('Encrypt Bacon', () => {
    
        it('encrypts text', () => {
            expect(encryptBacon('ABC')).toBe('AAAAA AAAAB AAABA')
        })

        it('handles lowercase input', () => {
            expect(encryptBacon('abc')).toBe('AAAAA AAAAB AAABA')
        })

        it('empty text is returned', () => {
            expect(encryptBacon('')).toBe('')
        })

        it('spaces are removed', () => {
            expect(encryptBacon('AB C')).toBe('AAAAA AAAAB AAABA')
        })

        it('punctuation and numbers are removed', () => {
            expect(encryptBacon('(A)B!,C"£$%^&*-_+=[]@#~/|\\<>?.')).toBe('AAAAA AAAAB AAABA')
        })

        it('encrypts a full message', () => {
            expect(
                encryptBacon('HELLO, WORLD!')
            ).toBe('AABBB AABAA ABABB ABABB ABBBA BABBA ABBBA BAAAB ABABB AAABB')
        })
    })

    describe('Decrypt Bacon', () => {
    
        it('decrypts text', () => {
            expect(decryptBacon('AAAAA AAAAB AAABA')).toBe('ABC')
        })

        it('handles lowercase input', () => {
            expect(decryptBacon('aaaaa aaaab aaaba')).toBe('ABC')
        })

        it('empty text is returned', () => {
            expect(decryptBacon('')).toBe('')
        })

        it('ignores extra spaces between codes', () => {
            expect(decryptBacon('AAAAA AAAAB  AAABA')).toBe('ABC')
        })

        it('decrypts a full message', () => {
            expect(
                decryptBacon('AABBB AABAA ABABB ABABB ABBBA BABBA ABBBA BAAAB ABABB AAABB')
            ).toBe('HELLOWORLD')
        })
    })

    describe('encryption and decryption together', () => {
        it('decrypts an encrypted message back to the original', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = encryptBacon(original)
            const decrypted = decryptBacon(encrypted)

            expect(decrypted).toBe(normaliseText(original))
        })

        it('decrypts an encrypted message back to the original with a different shift', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = encryptBacon(original)
            const decrypted = decryptBacon(encrypted)

            expect(decrypted).toBe(normaliseText(original))
        })
    })
})