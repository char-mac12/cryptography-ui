import { useState } from 'react'
import './VigenereTool.css'
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea';
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection';
import KeywordInput from '../../../Shared/KeywordInput/KeywordInput';
import VigenereConversionSection from './VigenereConversionSection/VigenereConversionSection';
import ModeSelector from '../../../Shared/ModeSelector/ModeSelector';

function VigenereTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    
    const [keyword, setKeyword] = useState("");

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(vigenere(text, keyword, false));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(vigenere(text, keyword, true));
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const vigenere = (text: string, keyword: string, decrypt: boolean) => {
        if (!keyword) return text;

        const cleanKeyword = keyword
            .toUpperCase()
            .replace(/[^A-Z]/g, "");

        let keywordIndex = 0;
        
        return text
            .toUpperCase()
            .split("")
            .map((char) => {
                if (char < "A" || char > "Z") return char;

                const textPosition = char.charCodeAt(0) - 65;
                const keywordPosition = cleanKeyword[keywordIndex % cleanKeyword.length].charCodeAt(0) - 65;
                
                keywordIndex++;

                const shifted = decrypt 
                    ? (textPosition - keywordPosition + 26) % 26 
                    : (textPosition + keywordPosition) % 26;

                return String.fromCharCode(shifted + 65);
            })
            .join("");
    };

    const displayedPlaintext =
        mode === "decrypt"
            ? vigenere(ciphertext, keyword, true)
            : plaintext;

    const displayedCiphertext =
        mode === "encrypt"
            ? vigenere(plaintext, keyword, false)
            : plaintext;

    const infoPanelText = "A polyalphabetic substitution cipher which uses a repeating keyword to shift letters by different amounts in the alphabet."
    const frequencyNoticeText = "Notice: When a Vigenère Cipher encrypts text, each letter may be shifted by a different amount depending on the keyword. This spreads letter frequencies across multiple ciphertext letters, making patterns much harder to detect than in monoalphabetic ciphers."

    return (
        <div className="caesar-tool">
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