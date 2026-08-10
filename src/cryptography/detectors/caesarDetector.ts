import type { TextAnalysis } from "../analysis/analyser";
import { calculateEnglishScore } from "../analysis/englishScore";
import { decryptCaesar } from "../ciphers/caesar";
import type { CipherPrediction } from "./types";

export function detectCaesar(
    analysis: TextAnalysis
): CipherPrediction {

    let bestScore = -Infinity;
    let bestShift = 0;

    for (let shift = 0; shift < 26; shift++) {
        const decrypted = decryptCaesar(
            analysis.normalised,
            shift
        );

        const score = calculateEnglishScore(decrypted);

        console.log(
            shift,
            decrypted,
            score
        );
        
        if (score > bestScore) {
            bestScore = score;
            bestShift = shift;
        }
    }

    return {
        cipher: "Caesar",
        confidence: calculateConfidence(bestScore),
        reasons: [
            `Best shift was ${bestShift}`,
            "Caesar brute force produced strongest English match"
        ]
    };
}

function calculateConfidence(score: number): number {
    // rough first version
    return Math.max(
        0,
        Math.min(
            100,
            (score + 2000) / 20
        )
    );
}