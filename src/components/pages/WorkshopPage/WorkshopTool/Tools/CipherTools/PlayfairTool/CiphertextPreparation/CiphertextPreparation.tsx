import { prepareCiphertext } from '../../../../../../../../cryptography/ciphers/playfair';
import './CiphertextPreparation.css'

function CiphertextPreparation({
    ciphertext,
}: {
    ciphertext: string;
}) {
    const pairs = prepareCiphertext(ciphertext);

    return (
        <div className="plaintext-preparation">
            <div className="plaintext-step">
                <h4>1. Clean ciphertext</h4>
                <div className="plaintext-value">
                    {ciphertext
                        .toUpperCase()
                        .replace(/[^A-Z]/g, "")
                        .replace(/J/g, "I")}
                </div>
            </div>

            <div className="plaintext-step">
                <h4>2. Split into digraphs</h4>
                <div className="plaintext-value">
                    {pairs.join(" ")}
                </div>
            </div>
        </div>
    );
}

export default CiphertextPreparation
