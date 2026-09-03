import { useState } from 'react'
import './VigenereTool.css'
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea';
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection';
import KeywordInput from '../../../Shared/KeywordInput/KeywordInput';
import VigenereConversionSection from './VigenereConversionSection/VigenereConversionSection';
import ModeSelector from '../../../Shared/ModeSelector/ModeSelector';
import { decryptVigenere, encryptVigenere } from '../../../../../../../cryptography/ciphers/vigenere';

function VigenereTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    
    const [keyword, setKeyword] = useState("");

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const hasValidKeyword = keyword.trim().length > 0;

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt' && hasValidKeyword) {
            setCiphertext(encryptVigenere(text, keyword));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt' && hasValidKeyword) {
            setPlaintext(decryptVigenere(text, keyword));
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const displayedPlaintext =
        mode === "decrypt" && hasValidKeyword
            ? decryptVigenere(ciphertext, keyword)
            : plaintext;

    const displayedCiphertext =
        mode === "encrypt" && hasValidKeyword
            ? encryptVigenere(plaintext, keyword)
            : ciphertext;

    const infoPanelText = "A polyalphabetic substitution cipher which uses a repeating keyword to shift letters by different amounts in the alphabet."
    const frequencyNoticeText = "Notice: When a Vigenère Cipher encrypts text, each letter may be shifted by a different amount depending on the keyword. This spreads letter frequencies across multiple ciphertext letters, making patterns much harder to detect than in monoalphabetic ciphers."

    return (
        <div className="vigenere-tool">
            <InfoPanel text={infoPanelText} />

            <ModeSelector 
                mode={mode} 
                setMode={setMode} 
                options={[
                    { value: "encrypt", label: "Encrypt" },
                    { value: "decrypt", label: "Decrypt" },
                ]}
            />

            <KeywordInput 
                label="Keyword"
                placeholder="Enter keyword..."
                value={keyword}
                onChange={setKeyword}
            />

            <CipherTextArea
                mode={mode}
                plaintext={displayedPlaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={displayedCiphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <VigenereConversionSection 
                text={mode === 'encrypt' ? plaintext : ciphertext}
                keyword={keyword}
                mode={mode}
            />

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />
        </div>
    )
}

export default VigenereTool