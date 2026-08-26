import { useState } from "react";
import InfoPanel from "../../../../../Shared/InfoPanel/InfoPanel";
import CipherModeSelector from "../../../CipherShared/CipherModeSelector/CipherModeSelector";
import CipherParameter from "../../../CipherShared/CipherParameter/CipherParameter";
import CipherTextArea from "../../../CipherShared/CipherTextArea/CipherTextArea";
import FrequencySection from "../../../CipherShared/FrequencySection/FrequencySection";
import { railFenceDecrypt, railFenceEncrypt } from "../../../../../../../cryptography/ciphers/rail-fence";
import RailFenceVisualisation from "./RailFenceVisualisation/RailFenceVisualisation";
import { removeNonLetters } from "../../../../../../../cryptography/utils/alphabet";
import RailFenceBruteForceDecrypter from "./RailFenceBruteForceDecrypter/RailFenceBruteForceDecrypter";

function RailFenceTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    
    const [rails, setRails] = useState(3);
    
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    
    const handleRailsChange = (value: string) => { 
        const newRails = Number(value); 
        setRails(newRails); 
        
        if (mode === 'encrypt') { 
            setCiphertext(railFenceEncrypt(plaintext, newRails)); 
        } else { 
            setPlaintext(railFenceDecrypt(ciphertext, newRails)); 
        } 
    }; 
    
    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(railFenceEncrypt(text, rails));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(railFenceDecrypt(text, rails));
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const infoPanelText = "A transposition cipher which rearranges letters by writing text in a zigzag pattern across multiple rails before reading it row by row."
    const frequencyNoticeText = "Notice: A Rail Fence Cipher is a transposition cipher, meaning the letters are only rearranged and not replaced. This preserves letter frequencies, making frequency analysis useful."

    return (
        <div className="rail-fence-tool">
            <InfoPanel text={infoPanelText} />

            <CipherModeSelector mode={mode} setMode={setMode} />

            <CipherParameter
                name="rails"
                value={rails}
                onChange={handleRailsChange}
                min={2}
                max={plaintext.length - 1}
            />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <RailFenceVisualisation
                mode={mode}
                plaintext={removeNonLetters(plaintext)}
                ciphertext={removeNonLetters(ciphertext)}
                rails={rails}
            />

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />

            {mode === 'decrypt' &&
                <RailFenceBruteForceDecrypter ciphertext={ciphertext} />
            }
        </div>   
    )
}

export default RailFenceTool