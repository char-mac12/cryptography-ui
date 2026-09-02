import { useState } from 'react';
import TextBox from '../../../../Shared/ToolTextArea/TextBox/TextBox';
import './Entropy.css';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import InfoPanel from '../../../../Shared/InfoPanel/InfoPanel';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { calculateEntropy } from '../../../../../../cryptography/analysis/entropy';
import FrequencyChart from '../../../../WorkshopPage/WorkshopTool/CipherShared/FrequencySection/FrequencyChart/FrequencyChart';
import { removeNonLetters } from '../../../../../../cryptography/utils/alphabet';
import AnalysisResult from '../Shared/AnalysisResult/AnalysisResult';

function Entropy() {
    const [text, setText] = useState("");

    const hasText = text.trim().length > 0;
    const result = calculateEntropy(text);
    const letterCount = removeNonLetters(text).length;

    const infoPanelText = "Entropy measures the amount of uncertainty or randomness in a text. It is calculated from the probability of each letter occurring. Higher entropy indicates a more evenly distributed and less predictable text, while lower entropy indicates a more predictable distribution.";

    return (
        <div className="entropy">
            <InfoPanel text={infoPanelText} />

            <div className="entropy-equation">
                <BlockMath math="H = -∑_{i=1}^{n} p_i log_2(p_i)" />
            </div>

            <TextBox
                title="Text"
                value={text}
                placeholder="Enter text..."
                onChange={setText}
                readOnly={false}
            />

            <AnalysisResult
                title="Entropy"
                score={hasText ? result : undefined}
                description={
                    hasText
                        ? "Higher entropy indicates a more evenly distributed and less predictable letter distribution, while lower entropy indicates a more predictable text."
                        : "Enter text to calculate the entropy."
                }
            >
                {hasText && (
                    <div className="entropy-statistics">
                        <div>
                            <span>Letters analysed: </span>
                            <strong>{letterCount}</strong>
                        </div>
                    </div>
                )}
            </AnalysisResult>

            {hasText && (
                <div className="entropy-frequency">
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

export default Entropy;