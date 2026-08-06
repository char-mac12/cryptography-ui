import ToolHeader from '../../../Shared/ToolHeader/ToolHeader';
import { characterToMorse } from '../morseData';
import './MorseConversionSection.css';

type Props = {
    text: string;
    mode: 'encode' | 'decode';
};

function MorseConversionSection({
    text,
    mode
}: Props) {

    const characters = text
        .toUpperCase()
        .split("");

    return (
        <div className="morse-conversion-section">
            <ToolHeader title={mode === 'encode'
                ? "Letter Conversion"
                : "Morse Conversion"
            } 
            />

            {text.length > 0 
                ? characters.map((character, index) => (
                    <div key={index} className="conversion-row">
                        <span>{character}</span>
                        <span>→</span>
                        <span>
                            {characterToMorse(character)}
                        </span>
                    </div>
                ))
                : <p>Enter some text to see the inidividual letter conversions.</p>
            }
        </div>
    );
}

export default MorseConversionSection;