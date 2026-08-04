import { useEffect, useState } from 'react'
import CipherModeSelector from '../Shared/CipherModeSelector/CipherModeSelector'
import CipherTextArea from '../CipherTextArea/CipherTextArea'
import ConversionSection from '../ConversionSection/ConversionSection'
import FrequencySection from '../FrequencySection/FrequencySection'
import InfoPanel from '../Shared/InfoPanel/InfoPanel'
import ShiftKeySlider from '../Shared/ShiftKeySlider/ShiftKeySlider'
import './CaesarTool.css'
// import CaesarWheelPanel from './CaesarWheelPanel/CaesarWheelPanel'

function CaesarTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [shift, setShift] = useState(3);

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(caesar(text, shift));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(caesar(text, 26 - shift));
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const caesar = (text: string, shift: number) => {
        return text
            .toUpperCase()
            .split("")
            .map((char) => {
                if (char < "A" || char > "Z") return char;

                const position = char.charCodeAt(0) - 65;
                const shifted = (position + shift) % 26;

                return String.fromCharCode(shifted + 65);
            })
            .join("");
    };

    useEffect(() => {
        if (mode === 'encrypt') {
            setCiphertext(caesar(plaintext, shift));
        } else {
            setPlaintext(caesar(ciphertext, 26 - shift));
        }
    }, [shift]);

    return (
        <div className="caesar-tool">
            <InfoPanel text="Here is some text about stuff." />

            <CipherModeSelector mode={mode} setMode={setMode} />
            <ShiftKeySlider shift={shift} setShift={setShift} />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            {/* <CaesarWheelPanel 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                shift={shift}
            /> */}

            <ConversionSection 
                text={mode === 'encrypt' ? plaintext : ciphertext}
                shift={shift}
                mode={mode}
            />

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
            />
        </div>
    )
}

export default CaesarTool