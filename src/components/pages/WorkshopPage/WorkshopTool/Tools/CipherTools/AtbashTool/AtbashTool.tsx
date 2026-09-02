import { useState } from 'react';
import './AtbashTool.css'
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea';
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection';
import AtbashTable from './AtbashTable/AtbashTable';
import CipherModeSelector from '../../../CipherShared/CipherModeSelector/CipherModeSelector';
import { atbash } from '../../../../../../../cryptography/ciphers/atbash';

function AtbashTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(atbash(text));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(atbash(text));
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const infoPanelText = "Maps each letter to its alphabetic mirror: A↔Z, B↔Y."
    const frequencyNoticeText = "Notice: When an Atbash Cipher transforms text, the alphabet is completely reversed. This leaves the overall letter frequencies unchanged and visually mirrors the alphabet horizontally around its center.";

    return (
        <div className="caesar-tool">
            <InfoPanel text={infoPanelText} />

            <CipherModeSelector mode={mode} setMode={setMode} />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <AtbashTable />

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />
        </div>
    )
}

export default AtbashTool