import { useState } from 'react';
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel'
import './EnigmaTool.css'
import CipherModeSelector from '../../../CipherShared/CipherModeSelector/CipherModeSelector';
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea';
import { enigma } from './enigma';
import { createDefaultMachine } from './enigmaData';


function EnigmaTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(
                enigma(text, createDefaultMachine())
            );
        }
    };

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(
                enigma(text, createDefaultMachine())
            );
        }
    };

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    return (
        <div className="enigma-tool">
            <InfoPanel text="What is Enigma?" />

            <CipherModeSelector mode={mode} setMode={setMode} />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />
        </div>
    )
}

export default EnigmaTool