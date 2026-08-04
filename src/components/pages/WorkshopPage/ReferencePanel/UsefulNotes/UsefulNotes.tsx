import ReferenceBox from '../ReferenceBox/ReferenceBox'
import './UsefulNotes.css'

function UsefulNotes() {
    return (
        <ReferenceBox title="Useful Notes">
            <p>
                <span className="note-symbol">§</span>
                Single-letter words are almost A and I in English
            </p>
            <p>
                <span className="note-symbol">§</span>
                Another useful note
            </p>
        </ReferenceBox>
    );
}

export default UsefulNotes