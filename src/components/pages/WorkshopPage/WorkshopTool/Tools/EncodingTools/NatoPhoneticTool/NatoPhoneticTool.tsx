import { useState } from 'react';
import EncodingModeSelector from '../../../EncodingShared/EncodingModeSelector/EncodingModeSelector';
import EncodingTextArea from '../../../EncodingShared/EncodingTextArea/EncodingTextArea';
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import NatoPhoneticReference from './NatoPhoneticReference/NatoPhoneticReference';
import './NatoPhoneticTool.css'
import { characterToNatoPhonetic, natoPhoneticToCharacter } from '../../../../../../../cryptography/encodings/natoPhonetic';

function NatoPhoneticTool() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const [input, setInput] = useState("");
    const output = 
        mode === "encode"
            ? characterToNatoPhonetic(input)
            : natoPhoneticToCharacter(input);

    const handleSwap = () => {
        setInput(output);

        setMode(currentMode =>
            currentMode === "encode"
                ? "decode"
                : "encode"
        );
    };

    const infoPanelText = "A spelling alphabet which represents letters using distinctive code words such as Alpha, Bravo and Charlie. It is designed to make spoken communication clearer when letters may be difficult to distinguish.";

    return (
        <div className="nato-phonetic-tool">
            <InfoPanel text={infoPanelText} />

            <EncodingModeSelector mode={mode} setMode={setMode} />            
            
            <EncodingTextArea
                mode={mode}
                input={input}
                output={output}
                setInput={setInput}
                onSwap={handleSwap}
            />

            <NatoPhoneticReference />
        </div>
    )
}

export default NatoPhoneticTool