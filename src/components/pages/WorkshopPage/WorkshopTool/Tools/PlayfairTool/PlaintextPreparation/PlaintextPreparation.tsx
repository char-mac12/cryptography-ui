import NoticeBox from '../../../Shared/NoticeBox/NoticeBox';
import { preparePlaintextSteps } from '../playfairLogic';
import './PlaintextPreparation.css'

function PlaintextPreparation({plaintext}: {plaintext: string}) {
    const {
            cleanedPlaintext,
            initialPairs,
            separatedPairs,
            paddedPairs
        } = preparePlaintextSteps(plaintext);

    return (
        <div className="plaintext-preparation">
            <div className="plaintext-step">
                <h4>1. Clean plaintext</h4>
                <div className="plaintext-value">
                    {cleanedPlaintext}
                </div>
            </div>
            <div className="plaintext-step">
                <h4>2. Create initial letter pairs</h4>
                <div className="plaintext-value">
                    {initialPairs.join(" ")}
                </div>
            </div>
            <div className="plaintext-step">
                <h4>3. Handle repeated letters</h4>
                <div className="plaintext-value">
                    {separatedPairs.join(" ")}
                </div>
            </div>
            <div className="plaintext-step">
                <h4>4. Pad final pair</h4>
                <div className="plaintext-value">
                    {paddedPairs.join(" ")}
                </div>
            </div>
            <NoticeBox text="The Playfair cipher inserts X between repeated letters in the same digraph and adds X to the final pair if the result has an odd number of letters." />
        </div>
    )
}

export default PlaintextPreparation