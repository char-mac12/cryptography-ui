import { useEffect, useState } from 'react';
import type { PlayfairStep } from '../playfairLogic';
import PlayfairSquare from '../PlayfairSquare/PlayfairSquare';
import './PlayfairWalkthrough.css';
import NoticeBox from '../../../Shared/NoticeBox/NoticeBox';


interface PlayfairWalkthroughProps {
    mode: 'encrypt' | 'decrypt'
    square: string[][];
    steps: PlayfairStep[];
}

function PlayfairWalkthrough({
    mode,
    square,
    steps
}: PlayfairWalkthroughProps) {

    useEffect(() => {
        setCurrentStep(0);
    }, [mode, steps.length]);

    const ruleLabels = {
        "same-row": "Same row",
        "same-column": "Same column",
        "rectangle": "Rectangle rule"
    }

    const [currentStep, setCurrentStep] = useState(0);

    if (steps.length === 0) {
        return null;
    }

    const step = steps[currentStep];


    const highlightedLetters = [
        step.pair[0],
        step.pair[1]
    ];


    return (
        <div className="playfair-walkthrough">

            <div className="walkthrough-header">
                <h4>
                    {mode === "encrypt"
                        ? `Encryption Step ${currentStep + 1} / ${steps.length}`
                        : `Decryption Step ${currentStep + 1} / ${steps.length}`}
                </h4>
            </div>


            <div className="walkthrough-content">

                <div className="walkthrough-square">
                    <PlayfairSquare
                        square={square}
                        highlights={highlightedLetters}
                    />
                </div>


                <div className="walkthrough-details">

                    <div className="walkthrough-step">

                        <h5>Current pair</h5>

                        <div className="walkthrough-value">
                            {step.pair}
                        </div>

                    </div>


                    <div className="walkthrough-step">

                        <h5>Rule</h5>

                        <div className="walkthrough-value">
                            {ruleLabels[step.rule]}
                        </div>

                    </div>


                    <div className="walkthrough-step">

                        <h5>
                            {mode === 'encrypt'
                                ? "Encrypted Result"
                                : "Decrypted Result"
                            }
                        </h5>

                        <div className="walkthrough-value result">
                            {step.result}
                        </div>

                    </div>

                </div>

            </div>


            <div className="walkthrough-controls">

                <button
                    disabled={currentStep === 0}
                    onClick={() =>
                        setCurrentStep(step => step - 1)
                    }
                >
                    Previous
                </button>


                <button
                    disabled={currentStep === steps.length - 1}
                    onClick={() =>
                        setCurrentStep(step => step + 1)
                    }
                >
                    Next
                </button>

            </div>

            <NoticeBox text="Decryption restores the ciphertext to the prepared plaintext used during encryption. It cannot determine whether an X was added as a filler character or was part of the original message, so filler X characters may need to be removed manually." />

        </div>
    )
}


export default PlayfairWalkthrough;