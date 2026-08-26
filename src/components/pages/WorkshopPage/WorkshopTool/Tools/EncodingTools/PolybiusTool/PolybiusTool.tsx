import { useState } from 'react';
import EncodingModeSelector from '../../../EncodingShared/EncodingModeSelector/EncodingModeSelector';
import EncodingTextArea from '../../../EncodingShared/EncodingTextArea/EncodingTextArea';
import InfoPanel from '../../../../../Shared/InfoPanel/InfoPanel'
import './PolybiusTool.css'
import { characterToPolybius, generatePolybiusSquare, polybiusToCharacter } from './polybiusData';
import PolybiusSquare from './PolybiusSquare/PolybiusSquare';
import ToolHeader from '../../../../../Shared/ToolHeader/ToolHeader';
import KeywordInput from '../../../Shared/KeywordInput/KeywordInput';

function PolybiusTool() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
   
    const [keyword, setKeyword] = useState("");

    const [input, setInput] = useState("");

    const square = generatePolybiusSquare(keyword);

    const output = 
        mode === "encode"
            ? characterToPolybius(input, square)
            : polybiusToCharacter(input, square);

    const handleSwap = () => {
        setInput(output);
        
        setMode(currentMode =>
            currentMode === 'encode' ? 'decode' : 'encode'
        );
    };

    const handleKeywordChange = (text: string) => {
        setKeyword(text);
    };

    const infoPanelText = "The Polybius Square is a coordinate-based encoding system that represents letters using row and column numbers. It is the foundation for several classical ciphers.";

    return (
        <div className="polybius-tool">
            <InfoPanel text={infoPanelText} />

            <EncodingModeSelector mode={mode} setMode={setMode} />            
            
            <KeywordInput
                label="Keyword (optional)"
                placeholder="Enter an optional keyword..."
                value={keyword}
                onChange={handleKeywordChange}
            />

            <EncodingTextArea
                mode={mode}
                input={input}
                output={output}
                setInput={setInput}
                onSwap={handleSwap}
            />

            <ToolHeader title="Polybius Square" />
            <PolybiusSquare square={square} />
        </div>
    )
}

export default PolybiusTool