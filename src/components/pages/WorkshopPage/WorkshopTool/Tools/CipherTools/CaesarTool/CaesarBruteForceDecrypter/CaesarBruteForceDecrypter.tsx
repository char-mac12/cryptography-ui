import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import './CaesarBruteForceDecrypter.css'

function CaesarBruteForceDecrypter({ ciphertext }: { ciphertext: string }) {
    const caesarDecrypt = (text: string, shift: number) => {
        return text
            .toUpperCase()
            .split("")
            .map((char) => {
                if (char < "A" || char > "Z") {
                    return char;
                }

                const position = char.charCodeAt(0) - 65;
                const shifted = (position - shift + 26) % 26;

                return String.fromCharCode(shifted + 65);
            })
            .join("");
    };

    const hasText = ciphertext.trim().length > 0;

    const possibilities = Array.from({ length: 26 }, (_, shift) => ({
        shift,
        text: caesarDecrypt(ciphertext, shift)
    }));
    
    return (
        <div className="caesar-brute-force">
            <ToolHeader title='Brute Force Decryption' />
            {hasText ? (
                <table>
                    <thead>
                        <tr>
                            <th>Shift</th>
                            <th>Decrypted Text</th>
                        </tr>
                    </thead>

                    <tbody>
                        {possibilities.map((item) => (
                            <tr key={item.shift}>
                                <td>{item.shift}</td>
                                <td>{item.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Brute force results will appear here when ciphertext is entered.</p>
            )}
        </div>
    )
}

export default CaesarBruteForceDecrypter