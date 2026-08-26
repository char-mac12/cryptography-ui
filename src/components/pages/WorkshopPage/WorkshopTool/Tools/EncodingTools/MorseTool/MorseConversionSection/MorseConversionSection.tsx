import ToolHeader from '../../../../../../Shared/ToolHeader/ToolHeader';
import { characterToMorse, morseToCharacter } from '../morseData';
import './MorseConversionSection.css';

type Props = {
    text: string;
    mode: 'encode' | 'decode';
};

function MorseConversionSection({
    text,
    mode
}: Props) {

    const conversions = mode === 'encode'
        ? text.toUpperCase().split("")
        : text.trim().split(" ");

    return (
        <div className="morse-conversion-section">
            <ToolHeader 
                title={mode === 'encode'
                    ? "Letter Conversion"
                    : "Morse Conversion"
                } 
            />

            {text.length > 0 
                ? conversions.map((character, index) => (
                    <div key={index} className="conversion-row">
                        <span>{character}</span>
                        <span>→</span>
                        <span>
                            {mode === 'encode'
                                ? characterToMorse(character)
                                : character === "/"
                                    ? " "
                                    : morseToCharacter(character)
                            }
                        </span>
                    </div>
                ))
                : (
                    <p>
                        Enter some text to see the individual conversions.
                    </p>
                )
            }
        </div>
    );
}

export default MorseConversionSection;