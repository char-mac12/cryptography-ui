import { describe, expect, it } from 'vitest'
import { createRails, fillRailsFromCiphertext, markRailPositions, placePlaintextOnRails, railFenceDecrypt, railFenceEncrypt, readRailsByRow, readRailsByRowAsList, readRailsInZigZagOrder } from '../../../cryptography/ciphers/rail-fence'
import { normaliseText } from '../../../cryptography/utils/textNormaliser'

describe('Rail Fence Cipher', () => {
    
    describe('railFenceEncrypt', () => {

        it('encrypts text', () => {
            expect(railFenceEncrypt('HELLO', 3)).toBe('HOELL')
        })

        it('handles lowercase input', () => {
            expect(railFenceEncrypt('hello', 3)).toBe('HOELL')
        })

        it('removes spaces', () => {
            expect(railFenceEncrypt('hell o', 3)).toBe('HOELL')
        })

        it('removes punctuation and numbers', () => {
            expect(railFenceEncrypt('(H)E!,L"£$%^L&*-_+O=[]@#~/|\\<>?.', 3)).toBe('HOELL')
        })

        it('returns an empty string for empty input', () => {
            expect(railFenceEncrypt('', 3)).toBe('')
        })

        it('returns text unchanged when using one rail', () => {
            expect(railFenceEncrypt('HELLO', 1)).toBe('HELLO')
        })

        it('returns text unchanged when using more rails than letters', () => {
            expect(railFenceEncrypt('ABC', 4)).toBe('ABC')
        })

        it('returns text unchanged when the number of rails equals the number of letters', () => {
            expect(railFenceEncrypt('ABC', 3)).toBe('ABC')
        })

        it('encrypts longer text with more rails', () => {
            expect(railFenceEncrypt('A TEXT THAT IS MUCH LONGER THAN BEFORE', 6)).toBe('ASRETIMETRETUGHOXACNAFTHHONETLB')
        })
    })

    describe('railFenceDecrypt', () => {

        it('decrypts text', () => {
            expect(railFenceDecrypt('HOELL', 3)).toBe('HELLO')
        })

        it('handles lowercase input', () => {
            expect(railFenceDecrypt('hoell', 3)).toBe('HELLO')
        })

        it('removes spaces', () => {
            expect(railFenceDecrypt('hoel l', 3)).toBe('HELLO')
        })

        it('returns an empty string for empty input', () => {
            expect(railFenceDecrypt('', 3)).toBe('')
        })

        it('returns text unchanged when using one rail', () => {
            expect(railFenceDecrypt('HELLO', 1)).toBe('HELLO')
        })

        it('returns text unchanged when using more rails than letters', () => {
            expect(railFenceDecrypt('ABC', 4)).toBe('ABC')
        })

        it('returns text unchanged when the number of rails equals the number of letters', () => {
            expect(railFenceDecrypt('ABC', 3)).toBe('ABC')
        })

        it('decrypts longer text with more rails', () => {
            expect(railFenceDecrypt('ASRETIMETRETUGHOXACNAFTHHONETLB', 6)).toBe('ATEXTTHATISMUCHLONGERTHANBEFORE')
        })
    })

    describe('createRails', () => {

        it('creates the correct number and length of empty rails', () => {
            expect(createRails(3, 5)).toEqual([
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null]
            ])
        })
    })

    describe('placePlaintextOnRails', () => {

        it('places plaintext in a zig-zag pattern', () => {
            const rails = createRails(3, 5)

            placePlaintextOnRails(rails, 'HELLO')

            expect(rails).toEqual([
                ['H', null, null, null, 'O'],
                [null, 'E', null, 'L', null],
                [null, null, 'L', null, null]
            ])
        })
    })

    describe('readRailsByRow', () => {

        it('reads characters from each rail by row', () => {
            const rails = createRails(3, 5)
            placePlaintextOnRails(rails, 'HELLO')

            expect(readRailsByRow(rails)).toBe('HOELL')
        })
    })

    describe('markRailPositions', () => {

        it('marks the positions used by the zig-zag pattern', () => {
            const rails = createRails(3, 5)

            markRailPositions(rails)

            expect(rails).toEqual([
                ['', null, null, null, ''],
                [null, '', null, '', null],
                [null, null, '', null, null]
            ])
        })
    })

    describe('fillRailsFromCiphertext', () => {

        it('fills marked rail positions with ciphertext', () => {
            const rails = createRails(3, 5)
            markRailPositions(rails)

            fillRailsFromCiphertext(rails, 'HOELL')

            expect(rails).toEqual([
                ['H', null, null, null, 'O'],
                [null, 'E', null, 'L', null],
                [null, null, 'L', null, null]
            ])
        })
    })

    describe('readRailsInZigZagOrder', () => {

        it('reads the rails back in zig-zag order to get plaintext', () => {
            const rails = createRails(3, 5)
            markRailPositions(rails)
            fillRailsFromCiphertext(rails, 'HOELL')

            expect(readRailsInZigZagOrder(rails)).toBe('HELLO')
        })
    })

    describe('readRailsByRowAsList', () => {
        
        it('returns the text from each rail in a list', () => {
            const rails = [
                ['H', null, null, null, 'O'],
                [null, 'E', null, 'L', null],
                [null, null, 'L', null, null]
            ]
            
            expect(readRailsByRowAsList(rails)).toEqual([
                'HO',
                'EL',
                'L'
            ])
        })
    })

    describe('encryption and decryption together', () => {
        
        it('decrypts an encrypted message back to the original', () => {
            const original = 'HELLO, WORLD!'

            const encrypted = railFenceEncrypt(original, 3)
            const decrypted = railFenceDecrypt(encrypted, 3)

            expect(decrypted).toBe(normaliseText(original))
        })

        it('decrypts an encrypted message back to the original with a longer length and more rails', () => {
            const original = 'Once upon a time there was a fairy idk'

            const encrypted = railFenceEncrypt(original, 6)
            const decrypted = railFenceDecrypt(encrypted, 6)

            expect(decrypted).toBe(normaliseText(original))
        })
    })
})