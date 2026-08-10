import { useState } from 'react';
import './AffineTool.css'
import InfoPanel from '../../../Shared/InfoPanel/InfoPanel';
import CipherModeSelector from '../../../CipherShared/CipherModeSelector/CipherModeSelector';
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea';
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection';
import { affineEncrypt, affineDecrypt } from '../../../../../../../cryptography/ciphers/affine';
import CipherParameter from '../../../CipherShared/CipherParameter/CipherParameter';
import NoticeBox from '../../../Shared/NoticeBox/NoticeBox';
import AffineConversionSection from './AffineConversionSection/AffineConversionSection';

function AffineTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

    const [a, setA] = useState(1);
    const [b, setB] = useState(0)
    
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    
    const handleAChange = (value: string) => { 
        const newA = Number(value); 
        setA(newA); 
        
        if (mode === 'encrypt') { 
            setCiphertext(affineEncrypt(plaintext, newA, b)); 
        } else { 
            setPlaintext(affineDecrypt(ciphertext, newA, b)); 
        } 
    }; 
    
    const handleBChange = (value: string) => { 
        const newB = Number(value); 
        setB(newB); 
        
        if (mode === 'encrypt') { 
            setCiphertext(affineEncrypt(plaintext, a, newB)); 
        } else { setPlaintext(affineDecrypt(ciphertext, a, newB)); 

        } 
    };
    
    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(affineEncrypt(text, a, b));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(affineDecrypt(text, a, b));
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const infoPanelText = "A substitution cipher which combines multiplication and addition using modular arithmetic to transform each letter in the alphabet."
    const aAndBNoticeText = "Choosing a and b: a must be coprime with the size of the alphabet (26) so that the cipher is reversible. This gives 12 possible values for a: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25. b can be any value from 0 - 25 and determines the additive shift applied after multipication.";
    const frequencyNoticeText = "Notice: An Affine Cipher is a one-to-one substitution, meaning each plaintext letter always maps to the same ciphertext letter. This makes frequency analysis useful because letter frequencies are preserved."
    const AFFINE_A_VALUES = [
        1, 3, 5, 7, 9, 11,
        15, 17, 19, 21, 23, 25
    ];

    return (
        <div className="caesar-tool">
            <InfoPanel text={infoPanelText} />

            <CipherModeSelector mode={mode} setMode={setMode} />

            <div className="affine-parameters">
                <CipherParameter
                    name="a"
                    value={a}
                    onChange={handleAChange}
                    options={AFFINE_A_VALUES}
                />
                <CipherParameter
                    name="b"
                    value={b}
                    onChange={handleBChange}
                    min={0}
                    max={25}
                />
            </div>
            <NoticeBox text={aAndBNoticeText} />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <AffineConversionSection text={mode === 'encrypt' ? plaintext : ciphertext} a={a} b={b} mode={mode} />

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />
        </div>
    )
}

export default AffineTool