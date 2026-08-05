import { useState } from 'react';
import './AtbashTool.css'
import InfoPanel from '../../Shared/InfoPanel/InfoPanel';
import CipherModeSelector from '../../Shared/CipherModeSelector/CipherModeSelector';
import CipherTextArea from '../../CipherTextArea/CipherTextArea';
import FrequencySection from '../../FrequencySection/FrequencySection';
import AtbashTable from './AtbashTable/AtbashTable';

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

    const atbash = (text: string) => {
        return text
            .toUpperCase()
            .split("")
            .map((char) => {
                if (char < "A" || char > "Z") return char;

                const position = char.charCodeAt(0) - 65;
                const mirrored = 25 - position;

                return String.fromCharCode(mirrored + 65);
            })
            .join("");
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