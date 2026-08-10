import { getLetterFrequencies } from "./characterFrequency";
import { calculateEnglishScore } from "./englishScore";
import { calculateEntropy } from "./entropy";
import { calculateIndexOfCoincidence } from "./indexOfCoincidence";
import { findRepeatedSequences, nGramFrequencies } from "./nGrams";
import { normaliseText } from "../utils/textNormaliser";
import { analyseStructure, calculateVowelRatio, countRepeatedCharacters, getTextStatistics, type TextStatistics } from "./textStatistics";

export function analyseText(text: string): TextAnalysis {
    const normalised = normaliseText(text);

    return {
        original: text,
        normalised,

        statistics: getTextStatistics(text),

        frequencies: {
            letters: getLetterFrequencies(text)
        },

        entropy: {
            overall: calculateEntropy(text),
            lettersOnly: calculateEntropy(normalised)
        },

        coincidence: {
            indexOfCoincidence: calculateIndexOfCoincidence(normalised),
            repeatedCharacters: countRepeatedCharacters(normalised)
        },

        ngrams: {
            bigrams: nGramFrequencies(normalised, 2),
            trigrams: nGramFrequencies(normalised, 3),
            quadgrams: nGramFrequencies(normalised, 4)
        },

        patterns: {
            repeatedSequences: findRepeatedSequences(normalised, 3)
        },

        language: {
            vowelRatio: calculateVowelRatio(normalised),
            englishScore: calculateEnglishScore(normalised)
        },

        structure: analyseStructure(text)
    };
}

export interface TextAnalysis {
    original: string;
    normalised: string;

    statistics: TextStatistics;

    frequencies: {
        letters: Record<string, number>;
    };

    entropy: {
        overall: number;
        lettersOnly: number;
    };

    coincidence: {
        indexOfCoincidence: number;
        repeatedCharacters: Record<string, number>;
    };

    ngrams: {
        bigrams: Record<string, number>;
        trigrams: Record<string, number>;
        quadgrams: Record<string, number>;
    };

    patterns: {
        repeatedSequences: {
            sequence: string;
            positions: number[];
        }[];
    };

    language: {
        vowelRatio: number;
        englishScore: number;
    };

    structure: {
        length: number;
        letterRatio: number;
        digitRatio: number;
        spaceRatio: number;
        punctuationRatio: number;
        uppercaseRatio: number;
        lowercaseRatio: number;
        hasSpaces: boolean;
        hasNumbers: boolean;
        hasSymbols: boolean;
        characterSet: string;
    };
}
