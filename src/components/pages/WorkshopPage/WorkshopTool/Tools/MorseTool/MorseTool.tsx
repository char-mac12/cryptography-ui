import { useEffect, useState } from 'react';
import EncodingModeSelector from '../../EncodingShared/EncodingModeSelector/EncodingModeSelector';
import EncodingTextArea from '../../EncodingShared/EncodingTextArea/EncodingTextArea';
import InfoPanel from '../../Shared/InfoPanel/InfoPanel'
import NoticeBox from '../../Shared/NoticeBox/NoticeBox';
import './MorseTool.css'
import MorseConversionSection from './MorseConversionSection/MorseConversionSection';
import MorseReference from './MorseReference/MorseReference';
import { characterToMorse, morseToCharacter } from './morseData';

function MorseTool() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleSwap = () => {
        setInput(output);
        setOutput(input);

        setMode(currentMode =>
            currentMode === "encode"
                ? "decode"
                : "encode"
        );
    };

    useEffect(() => {
        if (mode === "encode") {
            setOutput(characterToMorse(input));
        } else {
            setOutput(morseToCharacter(input));
        }
    }, [input, mode]);

    const infoPanelText = "Morse code encodes text characters and numbers as standardised sequences of two different signal durations, short and long. These are represented as dots and dashes.";
    const spacingNoticeText = "In Morse Code, a space is used to separate individual letters, while a / represents a space between words.";

    return (
        <div className="morse-tool">
            <InfoPanel text={infoPanelText} />

            <EncodingModeSelector mode={mode} setMode={setMode} />            
            
            <EncodingTextArea
                mode={mode}
                input={input}
                output={output}
                setInput={setInput}
                setOutput={setOutput}
                onSwap={handleSwap}
            />

            <NoticeBox text={spacingNoticeText} />

            <MorseConversionSection text={input} mode={mode} />

            <MorseReference />
        </div>
    )
}

export default MorseTool