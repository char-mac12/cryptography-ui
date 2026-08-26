import EnglishLetterAlphabetReference from "./EnglishLetterAlphabetReference/EnglishLetterAlphabetReference";
import EnglishLetterFrequencyReference from "./EnglishLetterFrequencyReference/EnglishLetterFrequencyReference";
import QuickReference from "./QuickReference/QuickReference";
import UsefulNotes from "./UsefulNotes/UsefulNotes";

function ReferencePanel() {
    return (
        <div className="reference-panel">
            <QuickReference />
            <EnglishLetterAlphabetReference />
            <EnglishLetterFrequencyReference />
            <UsefulNotes />
        </div>
    );
}

export default ReferencePanel;