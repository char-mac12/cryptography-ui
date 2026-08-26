import { useState } from 'react';
import EncodingModeSelector from '../../../EncodingShared/EncodingModeSelector/EncodingModeSelector';
import EncodingTextArea from '../../../EncodingShared/EncodingTextArea/EncodingTextArea';
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel';
import ToolHeader from '../../../../../Shared/ToolHeader/ToolHeader';
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

    const getOutput = () => {
        if (mode === "encode") {
            const tapCode = characterToTapCode(input);

            if (format === "taps") {
                return tapCodeToTaps(tapCode);
            }

            return tapCode;
        }

        const tapCode =
            format === "taps"
                ? tapsToTapCode(input)
                : input;

        return tapCodeToCharacter(tapCode);
    };

    const output = getOutput();

    const handleSwap = () => {
        setInput(output);

        setMode(currentMode =>
            currentMode === 'encode'
                ? 'decode'
                : 'encode'
        );
    };

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
                onSwap={handleSwap}
            />

            <ToolHeader title="Tap Code Grid" />

            <TapCodeGrid />
        </div>
    );
}

export default TapCodeTool;