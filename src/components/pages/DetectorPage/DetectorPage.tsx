import { useState } from "react";
import "./DetectorPage.css";

import { detectCipher } from "../../../cryptography/detectors/detector";
import type { CipherPrediction } from "../../../cryptography/detectors/types";

function DetectorPage() {
    const [text, setText] = useState("");
    const [results, setResults] = useState<CipherPrediction[]>([]);

    function handleDetect() {
        if (!text.trim()) {
            setResults([]);
            return;
        }

        const predictions = detectCipher(text);
        setResults(predictions);
    }

    return (
        <section className="detector-page">
            <h1>Detecting ciphers</h1>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter ciphertext..."
                rows={8}
            />

            <button onClick={handleDetect}>
                Detect
            </button>

            {results.length > 0 && (
                <section className="results">
                    <h2>Results</h2>

                    {results.map((result) => (
                        <article key={result.cipher}>
                            <h3>{result.cipher}</h3>

                            <p>
                                Confidence: {result.confidence}%
                            </p>

                            <ul>
                                {result.reasons.map((reason, index) => (
                                    <li key={index}>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>
            )}
        </section>
    );
}

export default DetectorPage;