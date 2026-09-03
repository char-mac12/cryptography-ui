import { describe, expect, it } from 'vitest'
import { ENGLISH_QUADGRAMS } from '../../../cryptography/analysis/quadgrams'

describe('Quadgram Dictionary Loader', () => {

    describe('Dictionary Population & Parsing', () => {

        it('populates dictionary with valid log-probabilities', () => {
            expect(Object.keys(ENGLISH_QUADGRAMS).length).toBeGreaterThan(0)
            expect(ENGLISH_QUADGRAMS['TION']).toBeDefined()
            expect(ENGLISH_QUADGRAMS['TION']).toBeLessThan(0)
        })

        it('ensures keys do not contain trailing carriage returns from line endings', () => {
            const keys = Object.keys(ENGLISH_QUADGRAMS)
            const hasCarriageReturn = keys.some(key => key.includes('\r'))

            expect(hasCarriageReturn).toBe(false)
        })

        it('ensures all quadgram keys are normalized to uppercase', () => {
            const keys = Object.keys(ENGLISH_QUADGRAMS)
            const allUppercase = keys.every(key => key === key.toUpperCase())

            expect(allUppercase).toBe(true)
        })

        it('ensures all values are valid finite numbers', () => {
            const values = Object.values(ENGLISH_QUADGRAMS)
            const allValidNumbers = values.every(val => typeof val === 'number' && !isNaN(val) && isFinite(val))

            expect(allValidNumbers).toBe(true)
        })
    })
})