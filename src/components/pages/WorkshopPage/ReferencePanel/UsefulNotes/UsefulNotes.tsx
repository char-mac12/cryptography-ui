import ReferenceBox from '../ReferenceBox/ReferenceBox'
import './UsefulNotes.css'

function UsefulNotes() {
    return (
        <ReferenceBox title="Useful Notes">
            <p>
                <span className="note-symbol">§</span>
                Single-letter words are almost A and I in English.
            </p>
            <p>
                <span className="note-symbol">§</span>
                The most common doubles in English are LL, EE, SS, OO and TT.
            </p>
            <p>
                <span className="note-symbol">§</span>
                English words almost never begin with double letters, if you see one it is likely to be OO or EE.
            </p>
            <p>
                <span className="note-symbol">§</span>
                J, Q, X and Y are virtually never doubled.
            </p>
            <p>
                <span className="note-symbol">§</span>
                If a cipher word ends in a double letter, it is almost always LL, SS, EE or FF.
            </p>
        </ReferenceBox>
    );
}

export default UsefulNotes