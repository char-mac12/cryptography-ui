import { useEffect, useState } from 'react';
import EncodingModeSelector from '../../../EncodingShared/EncodingModeSelector/EncodingModeSelector';
import EncodingTextArea from '../../../EncodingShared/EncodingTextArea/EncodingTextArea';
import InfoPanel from '../../../Shared/InfoPanel/InfoPanel';
import ToolHeader from '../../../Shared/ToolHeader/ToolHeader';
import ParameterSelect from '../../../Shared/ParameterSelect/ParameterSelect';
import './TapCodeTool.css';

import {
    characterToTapCode,
    tapCodeToCharacter,
    tapCodeToTaps,
    tapsToTapCode
} from '../../../../../../../cryptography/encodings/tap-code';

import TapCodeGrid from './TapCodeGrid/TapCodeGrid';

type TapCodeFormat = 'coordinates' | 'taps';

function TapCodeTool() {
    const [mode, setMode] =
        useState<'encode' | 'decode'>('encode');

    const [format, setFormat] =
        useState<TapCodeFormat>('coordinates');

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleSwap = () => {
        setInput(output);
        setOutput(input);

        setMode(currentMode =>
            currentMode === 'encode'
                ? 'decode'
                : 'encode'
        );
    };
    
    useEffect(() => {
        if (mode === "encode") {
            const tapCode = characterToTapCode(input);

            if (format === "taps") {
                setOutput(tapCodeToTaps(tapCode));
            } else {
                setOutput(tapCode);
            }

            return;
        }

        const tapCode =
            format === "taps"
                ? tapsToTapCode(input)
                : input;

        setOutput(tapCodeToCharacter(tapCode));
    }, [input, mode, format]);

    const infoPanelText =
        "Tap Code represents letters using pairs of numbers corresponding to positions in a 5×5 grid. Each letter can be represented by tapping its row and column.";

    return (
        <div className="tap-code-tool">
            <InfoPanel text={infoPanelText} />

            <EncodingModeSelector
                mode={mode}
                setMode={setMode}
            />

            <ParameterSelect
                name="Format"
                value={format}
                options={[
                    {
                        value: "coordinates",
                        label: "Coordinates"
                    },
                    {
                        value: "taps",
                        label: "Taps"
                    }
                ]}
                onChange={(value) =>
                    setFormat(value as TapCodeFormat)
                }
            />

            <EncodingTextArea
                mode={mode}
                input={input}
                output={output}
                setInput={setInput}
                setOutput={setOutput}
                onSwap={handleSwap}
            />

            <ToolHeader title="Tap Code Grid" />

            <TapCodeGrid />
        </div>
    );
}

export default TapCodeTool;