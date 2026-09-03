import { describe, expect, it } from 'vitest'
import { normaliseText, normaliseSpaces } from '../../../cryptography/utils/textNormaliser';

describe('Text Normalisation Utilities', () => {
    describe('normaliseText', () => {
        it('removes non-letter characters and converts text to uppercase', () => {
            const input = 'Hello, World! 123-ABC.';
            const expected = 'HELLOWORLDABC';
            expect(normaliseText(input)).toBe(expected);
        });

        it('handles strings with only non-letters by returning an empty string', () => {
            expect(normaliseText('12345!@#$%')).toBe('');
        });

        it('handles empty strings', () => {
            expect(normaliseText('')).toBe('');
        });
    });

    describe('normaliseSpaces', () => {
        it('collapses multiple spaces, tabs, and newlines into single spaces', () => {
            const input = 'Hello   world,\n\tthis is   a test.';
            const expected = 'Hello world, this is a test.';
            expect(normaliseSpaces(input)).toBe(expected);
        });

        it('trims internal whitespace correctly while leaving valid spacing intact', () => {
            expect(normaliseSpaces('a   b   c')).toBe('a b c');
        });

        it('handles empty strings', () => {
            expect(normaliseSpaces('')).toBe('');
        });
    });
});