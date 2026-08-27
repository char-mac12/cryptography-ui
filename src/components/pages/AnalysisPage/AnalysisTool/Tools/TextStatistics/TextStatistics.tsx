import { useState } from 'react';
import TextBox from '../../../../Shared/ToolTextArea/TextBox/TextBox';
import './TextStatistics.css';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import InfoPanel from '../../../../Shared/InfoPanel/InfoPanel';
import {
    analyseStructure,
    calculateVowelRatio,
    countRepeatedCharacters,
    getTextStatistics
} from '../../../../../../cryptography/analysis/textStatistics';
import FrequencyChart from '../../../../WorkshopPage/WorkshopTool/CipherShared/FrequencySection/FrequencyChart/FrequencyChart';

function TextStatistics() {
    const [text, setText] = useState("");

    const hasText = text.trim().length > 0;

    const stats = getTextStatistics(text);
    const structure = analyseStructure(text);
    const vowelRatio = calculateVowelRatio(text);
    const repeatedCharacters = countRepeatedCharacters(text);

    const infoPanelText =
        "Text statistics provide information about the structure and composition of a text, including character counts, letter case, character ratios, vowel usage and repeated characters.";

    return (
        <div className="text-statistics">
            <InfoPanel text={infoPanelText} />

            <TextBox
                title="Text"
                value={text}
                placeholder="Enter text..."
                onChange={setText}
                readOnly={false}
            />

            {hasText && (
                <>
                    <div className="text-statistics-section">
                        <ToolHeader title="Text Overview" />

                        <div className="text-statistics-grid">
                            <div>
                                <span>Characters</span>
                                <strong>{stats.length}</strong>
                            </div>

                            <div>
                                <span>Letters</span>
                                <strong>{stats.letters}</strong>
                            </div>

                            <div>
                                <span>Digits</span>
                                <strong>{stats.digits}</strong>
                            </div>

                            <div>
                                <span>Spaces</span>
                                <strong>{stats.spaces}</strong>
                            </div>

                            <div>
                                <span>Punctuation</span>
                                <strong>{stats.punctuation}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="text-statistics-section">
                        <ToolHeader title="Letter Statistics" />

                        <div className="text-statistics-grid">
                            <div>
                                <span>Uppercase</span>
                                <strong>{stats.uppercase}</strong>
                            </div>

                            <div>
                                <span>Lowercase</span>
                                <strong>{stats.lowercase}</strong>
                            </div>

                            <div>
                                <span>Unique Letters</span>
                                <strong>{stats.uniqueLetters.length}</strong>
                            </div>

                            <div>
                                <span>Vowel Ratio</span>
                                <strong>
                                    {(vowelRatio * 100).toFixed(2)}%
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="text-statistics-section">
                        <ToolHeader title="Text Structure" />

                        <div className="text-statistics-grid">
                            <div>
                                <span>Letter Ratio</span>
                                <strong>
                                    {(structure.letterRatio * 100).toFixed(2)}%
                                </strong>
                            </div>

                            <div>
                                <span>Digit Ratio</span>
                                <strong>
                                    {(structure.digitRatio * 100).toFixed(2)}%
                                </strong>
                            </div>

                            <div>
                                <span>Space Ratio</span>
                                <strong>
                                    {(structure.spaceRatio * 100).toFixed(2)}%
                                </strong>
                            </div>

                            <div>
                                <span>Punctuation Ratio</span>
                                <strong>
                                    {(structure.punctuationRatio * 100).toFixed(2)}%
                                </strong>
                            </div>

                            <div>
                                <span>Uppercase Ratio</span>
                                <strong>
                                    {(structure.uppercaseRatio * 100).toFixed(2)}%
                                </strong>
                            </div>

                            <div>
                                <span>Lowercase Ratio</span>
                                <strong>
                                    {(structure.lowercaseRatio * 100).toFixed(2)}%
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="text-statistics-section">
                        <ToolHeader title="Text Properties" />

                        <div className="text-statistics-grid">
                            <div>
                                <span>Contains Spaces</span>
                                <strong>
                                    {structure.hasSpaces ? "Yes" : "No"}
                                </strong>
                            </div>

                            <div>
                                <span>Contains Numbers</span>
                                <strong>
                                    {structure.hasNumbers ? "Yes" : "No"}
                                </strong>
                            </div>

                            <div>
                                <span>Contains Symbols</span>
                                <strong>
                                    {structure.hasSymbols ? "Yes" : "No"}
                                </strong>
                            </div>

                            <div>
                                <span>Letters Only</span>
                                <strong>
                                    {stats.onlyLetters ? "Yes" : "No"}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="text-statistics-section">
                        <ToolHeader title="Repeated Characters" />

                        {Object.keys(repeatedCharacters).length > 0 ? (
                            <div className="repeated-characters">
                                {Object.entries(repeatedCharacters).map(
                                    ([character, count]) => (
                                        <div key={character}>
                                            <span>{character}</span>
                                            <strong>{count}</strong>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p>
                                No repeated characters were found.
                            </p>
                        )}
                    </div>

                    <div className="text-statistics-section">
                        <ToolHeader title="Character Set" />

                        <div className="character-set">
                            {structure.characterSet}
                        </div>
                    </div>

                    <div className="text-statistics-section">
                        <ToolHeader title="Letter Frequency" />

                        <FrequencyChart
                            title=""
                            text={text}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default TextStatistics;