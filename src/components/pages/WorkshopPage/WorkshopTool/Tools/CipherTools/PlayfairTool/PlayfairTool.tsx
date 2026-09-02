import { useState } from 'react';
import './PlayfairTool.css'
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import CipherTextArea from '../../../CipherShared/CipherTextArea/CipherTextArea';
import FrequencySection from '../../../CipherShared/FrequencySection/FrequencySection';
import { decryptPlayfair, encryptPlayfair, generateKeywordSquare, playfairDecryptionSteps, playfairEncryptionSteps } from '../../../../../../../cryptography/ciphers/playfair';
import KeywordInput from '../../../Shared/KeywordInput/KeywordInput';
import KeywordPreparation from './KeywordPreparation/KeywordPreparation';
import CollapsiblePanel from '../../../Shared/CollapsiblePanel/CollapsiblePanel';
import PlaintextPreparation from './PlaintextPreparation/PlaintextPreparation';
import ToolHeader from '../../../../../Shared/ToolHeader/ToolHeader';
import DigraphFrequencyTable from '../../../CipherShared/DigraphFrequencyTable/DigraphFrequencyTable';
import PlayfairWalkthrough from './PlayfairWalkthrough/PlayfairWalkthrough';
import CiphertextPreparation from './CiphertextPreparation/CiphertextPreparation';
import CipherModeSelector from '../../../CipherShared/CipherModeSelector/CipherModeSelector';

function PlayfairTool() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

    const [keyword, setKeyword] = useState("");

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");

    const square = generateKeywordSquare(keyword);

    const displayedPlaintext =
        mode === 'decrypt'
            ? decryptPlayfair(ciphertext, keyword)
            : plaintext;

    const displayedCiphertext =
        mode === 'encrypt'
            ? encryptPlayfair(plaintext, keyword)
            : ciphertext;

    const steps = mode === 'encrypt'
        ? playfairEncryptionSteps(plaintext, keyword)
        : playfairDecryptionSteps(ciphertext, keyword)

    const handleKeywordChange = (value: string) => {
        setKeyword(value);
    }

    const handlePlaintextChange = (text: string) => {
        setPlaintext(text);
    }

    const handleCiphertextChange = (text: string) => {
        setCiphertext(text);
    }

    const handleSwap = () => {
        const newMode = mode === 'encrypt' ? 'decrypt' : 'encrypt'

        setMode(newMode);

        if (newMode === 'encrypt') {
            setCiphertext(encryptPlayfair(plaintext, keyword));
        } else {
            setPlaintext(decryptPlayfair(ciphertext, keyword));
        }
    };

    const infoPanelText = "Encrypts pairs of letters using a 5×5 grid generated from a keyword. Designed to hide individual letter frequencies."
    const frequencyNoticeText = "Notice: Single-letter frequency analysis is less effective against the Playfair cipher as it encrypts pairs of letters rather than individual letters. This disguises the normal frequency patterns that are commonly used to analyse simple substitution ciphers.";
    const digraphNoticeText = "Notice: Digraph frequency analysis is more effective against the Playfair cipher as it examines the pairs of letters that are actually encrypted. Repeated digraph patterns can reveal statistical information about the ciphertext."

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
                plaintext={displayedPlaintext}
                setPlaintext={handlePlaintextChange}
                ciphertext={displayedCiphertext}
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

            <CollapsiblePanel
                title={
                    mode === "encrypt"
                        ? "Plaintext Preparation"
                        : "Ciphertext Preparation"
                }
            >
                {mode === "encrypt" ? (
                    plaintext.length > 0 ? (
                        <PlaintextPreparation plaintext={plaintext} />
                    ) : (
                        <p>
                            Enter some plaintext to see how it is cleaned, split into
                            digraphs, and prepared for Playfair encryption...
                        </p>
                    )
                ) : (
                    ciphertext.length > 0 ? (
                        <CiphertextPreparation ciphertext={ciphertext} />
                    ) : (
                        <p>
                            Enter some ciphertext to see how it is cleaned and split into
                            digraphs ready for Playfair decryption...
                        </p>
                    )
                )}
            </CollapsiblePanel>

            <CollapsiblePanel title={mode === 'encrypt' ? "Encryption Walkthrough" : "Decryption Walkthrough"}>
                {keyword.length > 0 && plaintext.length > 0
                    ? <PlayfairWalkthrough key={`${mode}-${plaintext}-${ciphertext}-${keyword}`} mode={mode} square={square} steps={steps} />
                    : <p>{mode === 'encrypt' 
                            ? "Enter a keyword and plaintext to see how each letter pair is encrypted using the keyword square and Playfair rules..." 
                            : "Enter a keyword and ciphertext to see how each letter pair is decrypted using the keyword square and Plyfair rules..."
                    }</p>
                }
            </CollapsiblePanel>

            <FrequencySection 
                mode={mode}
                plaintext={plaintext}
                ciphertext={ciphertext}
                noticeText={frequencyNoticeText}
            />

            <ToolHeader title="Digraph Frequency Analysis" />
            {(mode === "encrypt" ? ciphertext : plaintext).length > 0 ? (
                <DigraphFrequencyTable
                    text={ciphertext}
                    noticeText={digraphNoticeText}
                />
            ) : (
                <p>Frequency analysis will appear here when text is entered.</p>
            )}
        </div>
    )
}

export default PlayfairTool