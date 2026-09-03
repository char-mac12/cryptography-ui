import { describe, expect, it } from 'vitest'
import { quadgramScore } from '../../../cryptography/analysis/quadgramScore'

describe('quadgramScore', () => {

    describe('Standard Text Inputs', () => {

        it('scores natural English text higher than random gibberish', () => {
            const english = quadgramScore('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG')
            const gibberish = quadgramScore('ZXQK JWVF MBXQ LKPZ QWOP MXZV NQKP RXZL')

            expect(english).toBeGreaterThan(gibberish)
        })

        it('scores lowercase text identically to uppercase text', () => {
            const upper = quadgramScore('THAT IS A VERY COMMON ENGLISH SENTENCE')
            const lower = quadgramScore('that is a very common english sentence')

            expect(lower).toEqual(upper)
        })

        it('ignores non-letter characters during scoring', () => {
            const plain = quadgramScore('THAT IS GOOD')
            const formatted = quadgramScore('THAT, IS 123 GOOD!!')

            expect(formatted).toBeCloseTo(plain)
        })

        it('normalises scores so longer texts are not penalized for length', () => {
            const shortEnglish = quadgramScore('THAT IS THE')
            const longEnglish = quadgramScore('THAT IS THE OTHER ONE THAT WE SAW TODAY')

            expect(longEnglish).toBeGreaterThan(shortEnglish - 1.5)
        })

        it('scores text with exactly 4 letters correctly', () => {
            const result = quadgramScore('TION')

            expect(result).not.toBe(-Infinity)
            expect(result).toBeLessThan(0)
        })
    })

    describe('Short & Invalid Inputs', () => {

        it('returns -Infinity when text contains fewer than 4 letters', () => {
            expect(quadgramScore('THE')).toBe(-Infinity)
            expect(quadgramScore('A!')).toBe(-Infinity)
            expect(quadgramScore('')).toBe(-Infinity)
        })

        it('returns -Infinity when text contains only digits, spaces, and symbols', () => {
            expect(quadgramScore('1234567890')).toBe(-Infinity)
            expect(quadgramScore('!@#$%^&*()')).toBe(-Infinity)
            expect(quadgramScore('   \n\t   ')).toBe(-Infinity)
        })
    })

    describe('Unseen Quadgrams & Fallbacks', () => {

        it('handles unseen quadgrams gracefully using the fallback floor penalty', () => {
            const score = quadgramScore('JXQZ')

            expect(score).toBe(-6.0)
            expect(score).not.toBeNaN()
        })

        it('handles accented and foreign letters without throwing errors', () => {
            expect(() => quadgramScore('Café Münster')).not.toThrow()
            expect(quadgramScore('Café Münster')).not.toBeNaN()
        })
    })
})