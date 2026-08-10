import NoticeBox from '../../../Shared/NoticeBox/NoticeBox';
import ToolHeader from '../../../Shared/ToolHeader/ToolHeader';
import { morseAlphabet } from '../morseData';
import './MorseReference.css';

function MorseReference() {

    const letters = Object.entries(morseAlphabet)
        .filter(([character]) => /[A-Z]/.test(character));

    const numbers = Object.entries(morseAlphabet)
        .filter(([character]) => /[0-9]/.test(character));

    const morseNumbersNoticeText = "Morse numbers are easy to remember as they follow a simple pattern. The first five numbers start with increasing numbers of dots, followed by dashes. The last five numbers follow the opposite pattern, starting with increasing numbers of dashes."

    return (
        <div className="morse-reference">

            <ToolHeader title="Morse Alphabet" />

            <div className="morse-grid">
                {letters.map(([character, code]) => (
                    <div className="morse-entry" key={character}>
                        <strong>{character}</strong>
                        <span>{code}</span>
                    </div>
                ))}
            </div>

            <ToolHeader title="Morse Numbers" />

            <div className="morse-grid">
                {numbers.map(([character, code]) => (
                    <div className="morse-entry" key={character}>
                        <strong>{character}</strong>
                        <span>{code}</span>
                    </div>
                ))}
            </div>


            <NoticeBox
                text={morseNumbersNoticeText}
            />


            {/* <ToolHeader title="Morse Code Tree" />

            <MorseTree /> */}

        </div>
    );
}

export default MorseReference;