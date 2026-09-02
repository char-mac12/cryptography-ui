import { useState } from 'react';
import TextBox from '../../../../Shared/ToolTextArea/TextBox/TextBox';
import './ChiSquaredAnalysis.css';
import { analyseChiSquared } from '../../../../../../cryptography/analysis/chiSquared';
import ExpectedObservedFrequencyChart from './ExpectedObservedFrequencyChart/ExpectedObservedFrequencyChart';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import InfoPanel from '../../../../Shared/InfoPanel/InfoPanel';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import AnalysisResult from '../Shared/AnalysisResult/AnalysisResult';

function ChiSquaredAnalysis() {
    const [text, setText] = useState("");

    const hasText = text.trim().length > 0;
    const result = analyseChiSquared(text);

    const infoPanelText = "Chi-squared is a statistic that measures how different two categorical distributions are. It compares the observed frequency of each letter with the frequency expected from a reference distribution, such as English letter frequencies. If the distributions are identical, the chi-squared statistic is 0. As they become more different, the score increases."

    return (
        <div className="chi-squared-analysis">
            <InfoPanel text={infoPanelText} />

            <div className="chi-squared-equation">
                <BlockMath math="Chi^2 = ∑_{i=1}^{n} ((O_i - E_i)^2  ) / (E_i)" />
            </div>

            <TextBox
                title="Ciphertext"
                value={text}
                placeholder="Enter ciphertext..."
                onChange={setText}
                readOnly={false}
            />

            <AnalysisResult
                title="Chi-Squared Score"
                score={hasText ? result.score : undefined}
                description={
                    hasText
                        ? "Lower scores indicate that the observed letter frequencies are closer to the expected frequencies of English text."
                        : "Enter ciphertext to calculate the chi-squared score."
                }
            >
                {hasText && (
                    <div className="analysis-statistics">
                        <div>
                            <span>Letters analysed: </span>
                            <strong>{result.letterCount}</strong>
                        </div>
                    </div>
                )}
            </AnalysisResult>

            {hasText && (
                <div className="chi-squared-frequencies">
                    <ToolHeader title="Observed vs Expected Frequencies" />

                    <ExpectedObservedFrequencyChart
                        observed={result.observedCounts}
                        expected={result.expectedCounts}
                    />
                </div>
            )}
        </div>
    );
}

export default ChiSquaredAnalysis;