import { useState } from 'react'
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea'
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection'
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel'
import './BaconTool.css'
import CipherModeSelector from '../../../CipherShared/CipherModeSelector/CipherModeSelector'
import { decryptBacon, encryptBacon } from '../../../../../../../cryptography/ciphers/bacon'
import ParameterSelect from '../../../Shared/ParameterSelect/ParameterSelect'

function BaconTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [format, setFormat] = useState('AB');

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const displayedPlaintext =
        mode === "decrypt"
            ? decryptBacon(ciphertext)
            : plaintext;

    const displayedCiphertext =
        mode === "encrypt"
            ? encryptBacon(plaintext)
            : ciphertext;

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(encryptBacon(text));
        }
    };

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        const decrypted = decryptBacon(text);
        console.log("Input:", text);
        console.log("Decrypted:", decrypted);

        if (mode === 'decrypt') {
            setPlaintext(decryptBacon(text));
        }
    };

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const infoPanelText =
        "A substitution cipher which represents each letter using a five-character sequence of two symbols. This implementation uses the 26-letter Baconian alphabet.";

    const frequencyNoticeText =
        "Notice: Bacon's cipher replaces each letter with a five-character pattern, preserving the frequency structure of the original message.";

    return (
        <div className="bacon-tool">
            <InfoPanel text={infoPanelText} />

            <CipherModeSelector
                mode={mode}
                setMode={setMode}
            />

            <ParameterSelect
                name="Format"
                value={format}
                onChange={setFormat}
                options={[
                    { value: 'AB', label: 'A / B' }
                ]}
            />

            <CipherTextArea
                mode={mode}
                plaintext={displayedPlaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={displayedCiphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <FrequencySection
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />
        </div>
    );
}

export default BaconTool;