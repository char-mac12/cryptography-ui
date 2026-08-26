import { useState } from 'react'
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea'
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection'
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel'
import CaesarConversionSection from '../CaesarTool/ConversionSection/CaesarConversionSection'
import CipherModeSelector from '../../../CipherShared/CipherModeSelector/CipherModeSelector'
import { rot13 } from '../../../../../../../cryptography/ciphers/rot13'

function ROT13Tool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(rot13(text));
        }
    };

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(rot13(text));
        }
    };

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const infoPanelText =
        "A substitution cipher that replaces each letter with the letter 13 positions later in the alphabet. ROT13 is a special case of the Caesar cipher and uses a fixed shift of 13.";

    const frequencyNoticeText =
        "Notice: ROT13 preserves letter frequencies because it is a monoalphabetic substitution. It is not considered secure encryption and is mainly useful for simple obfuscation.";

    return (
        <div className="rot13-tool">
            <InfoPanel text={infoPanelText} />

            <CipherModeSelector
                mode={mode}
                setMode={setMode}
            />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <CaesarConversionSection text={
                mode === 'encrypt' ? plaintext : ciphertext} 
                shift={13} 
                mode={mode} 
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

export default ROT13Tool;