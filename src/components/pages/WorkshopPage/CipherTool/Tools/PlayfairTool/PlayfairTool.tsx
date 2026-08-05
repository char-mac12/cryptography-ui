import { useState } from 'react';
import './PlayfairTool.css'
import InfoPanel from '../../Shared/InfoPanel/InfoPanel';
import CipherModeSelector from '../../Shared/CipherModeSelector/CipherModeSelector';
import CipherTextArea from '../../CipherTextArea/CipherTextArea';
import FrequencySection from '../../FrequencySection/FrequencySection';
import { generateKeywordSquare, playfairDecrypt, playfairEncrypt, playfairEncryptionSteps } from './playfairLogic';
import KeywordInput from '../../Shared/KeywordInput/KeywordInput';
import KeywordPreparation from './KeywordPreparation/KeywordPreparation';
import CollapsiblePanel from '../../Shared/CollapsiblePanel/CollapsiblePanel';
import PlaintextPreparation from './PlaintextPreparation/PlaintextPreparation';
import ToolHeader from '../../Shared/ToolHeader/ToolHeader';
import EncryptionWalkthrough from './EncryptionWalkthrough/EncryptionWalkthrough';

function PlayfairTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

    const [keyword, setKeyword] = useState("");

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const square = generateKeywordSquare(keyword);

    const encryptionSteps = playfairEncryptionSteps(
        plaintext,
        keyword
    );

    const handleKeywordChange = (value: string) => {
        setKeyword(value);

        if (mode === 'encrypt') {
            setCiphertext(playfairEncrypt(plaintext, value));
        }
    }

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);

        if (mode === 'encrypt') {
            setCiphertext(playfairEncrypt(text, keyword));
        }
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);

        if (mode === 'decrypt') {
            setPlaintext(playfairDecrypt());
        }
    }

    const handleSwap = () => {
        setMode((currentMode) =>
            currentMode === 'encrypt' ? 'decrypt' : 'encrypt'
        );
    };

    const infoPanelText = "Encrypts pairs of letters using a 5×5 grid generated from a keyword. Designed to hide individual letter frequencies."
    const frequencyNoticeText = "Notice: The Playfair Cipher encrypts pairs of letters (digraphs) instead of individual letters. This disguises the normal single-letter frequency analysis, making histogram analysis much less effective. However, digraph frequencies can still reveal statistical patterns that can be exploited.";

    return (
        <div className="caesar-tool">
            <InfoPanel text={infoPanelText} />

            <CipherModeSelector mode={mode} setMode={setMode} />

            <KeywordInput 
                label="Keyword"
                placeholder="Enter keyword..."
                value={keyword}
                onChange={handleKeywordChange}
            />

            <CipherTextArea
                mode={mode}
                plaintext={plaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={ciphertext}
                setCiphertext={handleCiphertextChange}
                onSwap={handleSwap}
            />

            <ToolHeader title={mode === 'encrypt' ? "Encryption Walkthrough" : "Decryption Walkthrough"} />

            <CollapsiblePanel title="Keyword Square Preparation">
                {keyword.length > 0 
                    ? <KeywordPreparation keyword={keyword} />
                    : <p>Enter a keyword to see how to transform it into a keyword square...</p>
                }
            </CollapsiblePanel>

            <CollapsiblePanel title="Plaintext Pairs Preparation">
                {plaintext.length > 0
                    ? <PlaintextPreparation plaintext={plaintext} />
                    : <p>Enter some plaintext to see how to break it down into pairs for encryption...</p>
                }
            </CollapsiblePanel>

            <CollapsiblePanel title="Encryption Walkthrough">
                {keyword.length > 0 && plaintext.length > 0
                    ? <EncryptionWalkthrough square={square} steps={encryptionSteps} />
                    : <p>Enter a keyword and plaintext to see how each letter pair is encrypted using the keyword square and Playfair rules...</p>
                }
            </CollapsiblePanel>

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />
        </div>
    )
}

export default PlayfairTool