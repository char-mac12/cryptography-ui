import { useState } from 'react';
import TextBox from '../../../../Shared/ToolTextArea/TextBox/TextBox';
import './IndexOfCoincidence.css';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import InfoPanel from '../../../../Shared/InfoPanel/InfoPanel';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { calculateIndexOfCoincidence } from '../../../../../../cryptography/analysis/indexOfCoincidence';
import FrequencyChart from '../../../../WorkshopPage/WorkshopTool/CipherShared/FrequencySection/FrequencyChart/FrequencyChart';

function IndexOfCoincidence() {
    const [text, setText] = useState("");

    const hasText = text.trim().length > 0;
    const result = calculateIndexOfCoincidence(text);

    const infoPanelText = "The Index of Coincidence (IC) measures how likely two randomly selected letters are to be the same. It can help identify patterns in ciphertext and distinguish between different types of classical ciphers."

    return (
        <div className="index-of-coincidence">
            <InfoPanel text={infoPanelText} />

            <div className="chi-squared-equation">
                <BlockMath math="IC = ∑_{i=1}^{n} f_i (f_i - 1) / N(N - 1)" />
            </div>

            <TextBox
                title="Ciphertext"
                value={text}
                placeholder="Enter ciphertext..."
                onChange={setText}
                readOnly={false}
            />

            <div className="index-of-coincidence-result">
                <h3>Index of Coincidence</h3>

                {hasText ? (
                    <>
                        <div className="index-of-coincidence-score">
                            {result.score.toFixed(4)}
                        </div>

                        <p>
                            Values around 0.066 are typical of English text, while values around 0.038 indicate a more random or uniform distribution. Higher values suggest stronger letter-frequency patterns, while lower values suggest a more uniform distribution.
                        </p>

                        <div className="index-of-coincidence-statistics">
                            <div>
                                <span>Letters analysed: </span>
                                <strong>{result.letterCount}</strong>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>
                        Enter ciphertext to calculate the chi-squared score.
                    </p>
                )}
            </div>

            {/* {hasText && (
                <div className="index-of-coincidence-scale-section">
                    <ToolHeader title="Index of Coincidence Scale" />

                    <IndexOfCoincidenceScale
                        value={result.score}
                    />
                </div>
            )} */}

            {hasText && (
                <div className="index-of-coincidence-frequency">
                    <ToolHeader title="Letter Frequencies" />

                    <FrequencyChart 
                        title="" 
                        text={text} 
                    />
                </div>
            )}

        </div>
    );
}

export default IndexOfCoincidence;