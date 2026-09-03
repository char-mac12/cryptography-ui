import { describe, expect, it } from 'vitest'
import { analyseEnglishScore, calculateEnglishScore } from '../../../cryptography/analysis/englishScore'

describe('English Fitness Scoring', () => {

    describe('calculateEnglishScore', () => {

        it('scores clear English text significantly higher than random ciphertext', () => {
            const englishText = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
            const randomText = 'ZXCVBNM KJHGFDS APQOWIUE YTRUVOI XZANM'

            const englishScore = calculateEnglishScore(englishText)
            const randomScore = calculateEnglishScore(randomText)

            expect(englishScore).toBeGreaterThan(randomScore)
            expect(englishScore).toBeGreaterThan(50)
            expect(randomScore).toBeLessThan(40)
        })

        it('returns 0 for empty or invalid text', () => {
            expect(calculateEnglishScore('')).toBe(0)
            expect(calculateEnglishScore('12345!@#$%')).toBe(0)
        })

        it('incorporates dictionary word matching when a dictionary set is provided', () => {
            const dictionary = new Set(['THE', 'QUICK', 'BROWN', 'FOX'])
            const textWithWords = 'THE QUICK BROWN FOX'
            const textWithoutWords = 'XZQ WPOK BRLN FKX'

            const matchedResult = analyseEnglishScore(textWithWords, dictionary, true)
            const unmatchedResult = analyseEnglishScore(textWithoutWords, dictionary, true)

            expect(matchedResult.dictionaryScore).toBe(1.0)
            expect(unmatchedResult.dictionaryScore).toBe(0)
            expect(matchedResult.overallScore).toBeGreaterThan(unmatchedResult.overallScore)
        })

        it('penalizes texts with zero vowels or absurd vowel ratios', () => {
            const noVowels = 'RHYTHM SYZYGY CRWTHS'
            const onlyVowels = 'AEEEEIIIIOOOOOUUU'

            const noVowelScore = analyseEnglishScore(noVowels)
            const onlyVowelScore = analyseEnglishScore(onlyVowels)

            expect(noVowelScore.vowelRatioScore).toBeLessThan(0.5)
            expect(onlyVowelScore.vowelRatioScore).toBeLessThan(0.3)
        })
    })

    describe('English Fitness Scoring - Edge Cases & Overfitting Prevention', () => {
    
        it('correctly ranks valid long English prose higher than complex ciphertext', () => {
            const longEnglish = 'IT IS A TRUTH UNIVERSALLY ACKNOWLEDGED THAT A SINGLE MAN IN POSSESSION OF A GOOD FORTUNE MUST BE IN WANT OF A WIFE';
            const CaesarCiphertext = 'LW LV D WUXWK XQLYHUVDOOB DFNQROZHGJHG WKDW D VLQJOH PDQ LQ SRVVHVVLRQ RI D JRRG IRUWXQH PXVW EH LQ ZDQW RI D ZLIH';
            
            const englishScore = calculateEnglishScore(longEnglish);
            const cipherScore = calculateEnglishScore(CaesarCiphertext);

            expect(englishScore).toBeGreaterThan(70);
            expect(cipherScore).toBeLessThan(35);
            expect(englishScore).toBeGreaterThan(cipherScore + 35);
        });

        it('handles short English phrases without dropping score off a cliff', () => {
            // Short text suffers from sparse quadgrams; verify it still registers as valid English
            const shortEnglish = 'HELLO WORLD';
            const score = calculateEnglishScore(shortEnglish);

            expect(score).toBeGreaterThan(45);
        });

        it('penalizes valid single-letter repeated text (monoalphabetic bias)', () => {
            // High vowel ratio and single valid unigram, but zero quadgram variance
            const repeatedText = 'EEEE EEEE EEEE EEEE EEEE';
            const score = calculateEnglishScore(repeatedText);

            expect(score).toBeLessThan(30);
        });

        it('distinguishes pronounceable gibberish from actual English', () => {
            const pronounceableGibberish = 'BALA KANA MALU TANA PIRA LOMA';
            const englishText = 'THIS IS AN EASY ENGLISH SENTENCE';

            const gibberishScore = calculateEnglishScore(pronounceableGibberish);
            const englishScore = calculateEnglishScore(englishText);

            // Ensure real English scores significantly higher than pseudowords
            expect(englishScore).toBeGreaterThan(gibberishScore + 20);
            expect(gibberishScore).toBeLessThan(60);
        });
    });
})