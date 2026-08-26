import { useState } from 'react';
import EncodingModeSelector from '../../../EncodingShared/EncodingModeSelector/EncodingModeSelector';
import EncodingTextArea from '../../../EncodingShared/EncodingTextArea/EncodingTextArea';
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import './SemaphoreTool.css'
import { characterToSemaphore, semaphoreToCharacter } from '../../../../../../../cryptography/encodings/semaphore';

function SemaphoreTool() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const [input, setInput] = useState("");

    const output = 
        mode === "encode"
            ? characterToSemaphore(input)
            : semaphoreToCharacter(input);

    const handleSwap = () => {
        setInput(output);

        setMode(currentMode =>
            currentMode === "encode"
                ? "decode"
                : "encode"
        );
    };

    const infoPanelText = "A visual signalling system which represents letters using the positions of two flags. Originally developed for long-distance communication, it was widely used in maritime signalling.";

    return (
        <div className="semaphore-tool">
            <InfoPanel text={infoPanelText} />

            <EncodingModeSelector mode={mode} setMode={setMode} />            
            
            <EncodingTextArea
                mode={mode}
                input={input}
                output={output}
                setInput={setInput}
                onSwap={handleSwap}
            />

            {/* <SemaphoreReference /> */}
        </div>
    )
}

export default SemaphoreTool