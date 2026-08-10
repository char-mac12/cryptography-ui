import { NATO_PHONETIC } from '../../../../../../../../cryptography/encodings/nato-phonetic';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import './NatoPhoneticReference.css';

function NatoPhoneticReference() {
    return (
        <div className="nato-phonetic-reference">
            <ToolHeader title="NATO Phonetic Alphabet"></ToolHeader>

            <div className="nato-phonetic-grid">
                {Object.entries(NATO_PHONETIC).map(
                    ([character, word]) => (
                        <div
                            className="nato-phonetic-entry"
                            key={character}
                        >
                            <span className="nato-phonetic-character">
                                {character}
                            </span>

                            <span className="nato-phonetic-word">
                                {word}
                            </span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default NatoPhoneticReference;