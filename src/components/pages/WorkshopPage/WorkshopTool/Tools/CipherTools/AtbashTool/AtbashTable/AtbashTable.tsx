import ToolHeader from '../../../../../../Shared/ToolHeader/ToolHeader';
import './AtbashTable.css'

function AtbashTable() {
    const plaintext = "ABCDEFGHIJKLM".split("");
    const ciphertext = "ZYXWVUTSRQPON".split("");

    return (
        <div className="atbash-table-container">
            <ToolHeader title="Atbash Alphabet Mapping" />
            <table className="atbash-table">
                <tbody>
                    <tr>
                        {plaintext.map((letter) => (
                            <th key={letter}>{letter}</th>
                        ))}
                    </tr>

                    <tr>
                        {ciphertext.map((letter) => (
                            <td key={letter}>{letter}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AtbashTable;