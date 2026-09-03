import { normaliseText } from "../utils/textNormaliser";
import { calculateChiSquared } from "./chiSquared";
import { quadgramScore } from "./quadgramScore";
import { calculateVowelRatio } from "./textStatistics";

export interface EnglishScoreBreakdown {
    overallScore: number;
    quadgramNormalised: number;
    chiSquaredNormalised: number;
    vowelRatioScore: number;
    dictionaryScore: number;
}

const TARGET_VOWEL_RATIO = 0.40;

export function calculateEnglishScore(
    text: string, 
    dictionary?: Set<string>, 
    debug = false
): number {
    return analyseEnglishScore(text, dictionary, debug).overallScore;
}

export function analyseEnglishScore(
    text: string, 
    dictionary?: Set<string>,
    debug = false
): EnglishScoreBreakdown {
    const normalised = normaliseText(text);
    const length = normalised.length;

    if (length < 4) {
        return {
            overallScore: 0,
            quadgramNormalised: 0,
            chiSquaredNormalised: 0,
            vowelRatioScore: 0,
            dictionaryScore: 0,
        };
    }

    // 1. Raw Metrics
    const avgLogProb = quadgramScore(normalised);

    const chiScore = calculateChiSquared(normalised);
    const chiPerChar = chiScore / length;

    const vowelRatio = calculateVowelRatio(normalised);
    const vowelDeviation = Math.abs(vowelRatio - TARGET_VOWEL_RATIO);
    const vowelRatioScore = Math.max(0, 1 - (vowelDeviation / 0.20));

    // 2. Quadgram Normalisation
    const FLOOR = -7.5;
    const CEILING = -4.0;
    
    const rawNorm = Math.min(1, Math.max(0, (avgLogProb - FLOOR) / (CEILING - FLOOR)));
    const quadgramNormalised = Math.pow(rawNorm, 2);

    // 3. Chi-Squared Normalisation
    const chiSquaredNormalised = Math.min(1, Math.max(0, (12.0 - chiPerChar) / 12.0));

    // 4. Optional Dictionary Matching
    let dictionaryScore = 0;
    const hasDictionary = Boolean(dictionary && dictionary.size > 0);

    if (hasDictionary && dictionary) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        if (words.length > 0) {
            const matches = words.reduce((acc, word) => {
                const cleanWord = normaliseText(word);
                return acc + (dictionary.has(cleanWord) ? 1 : 0);
            }, 0);
            dictionaryScore = matches / words.length;
        }
    }

    // 5. Weighted Final Score Computation
    const overallScore = hasDictionary
        ? quadgramNormalised * 40 +
          chiSquaredNormalised * 25 +
          dictionaryScore * 20 +
          vowelRatioScore * 15
        : quadgramNormalised * 60 +
          chiSquaredNormalised * 25 +
          vowelRatioScore * 15;

    if (debug) {
        console.log(`\n--- DEBUG: "${text}" ---`);
        console.log(`Normalised (${length} chars): "${normalised}"`);
        console.log(`Avg Quadgram Log-Prob: ${avgLogProb.toFixed(4)} -> Normalised: ${quadgramNormalised.toFixed(4)}`);
        console.log(`Raw Chi2 Score: ${chiScore.toFixed(4)} (Per Char: ${chiPerChar.toFixed(4)}) -> Normalised: ${chiSquaredNormalised.toFixed(4)}`);
        console.log(`Vowel Ratio: ${vowelRatio.toFixed(4)} -> Score: ${vowelRatioScore.toFixed(4)}`);
        console.log(`Overall Score: ${overallScore.toFixed(4)}\n`);
    }

    return {
        overallScore,
        quadgramNormalised,
        chiSquaredNormalised,
        vowelRatioScore,
        dictionaryScore,
    };
}