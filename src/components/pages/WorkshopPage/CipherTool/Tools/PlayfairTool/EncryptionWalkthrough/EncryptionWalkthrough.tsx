import { useState } from 'react';
import type { PlayfairEncryptionStep } from '../playfairLogic';
import PlayfairSquare from '../PlayfairSquare/PlayfairSquare';
import './EncryptionWalkthrough.css';


interface EncryptionWalkthroughProps {
    square: string[][];
    steps: PlayfairEncryptionStep[];
}


function EncryptionWalkthrough({
    square,
    steps
}: EncryptionWalkthroughProps) {

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
        <div className="encryption-walkthrough">

            <div className="walkthrough-header">
                <h4>
                    Encryption Step {currentStep + 1} / {steps.length}
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
                            {step.rule}
                        </div>

                    </div>


                    <div className="walkthrough-step">

                        <h5>Encrypted result</h5>

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
                        setCurrentStep(currentStep - 1)
                    }
                >
                    Previous
                </button>


                <button
                    disabled={currentStep === steps.length - 1}
                    onClick={() =>
                        setCurrentStep(currentStep + 1)
                    }
                >
                    Next
                </button>

            </div>

        </div>
    )
}


export default EncryptionWalkthrough;