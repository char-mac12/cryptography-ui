import { analyseText } from "../analysis/analyser";

import { detectCaesar } from "./caesarDetector";

export function detectCipher(text: string) {

    const analysis = analyseText(text);

    const results = [
        detectCaesar(analysis)
    ];

    return results.sort(
        (a,b) => b.confidence - a.confidence
    );
}