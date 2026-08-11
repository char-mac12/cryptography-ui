import { decryptCaesar } from '../../../../../../../../cryptography/ciphers/caesar';
import ToolHeader from '../../../../Shared/ToolHeader/ToolHeader';
import './CaesarBruteForceDecrypter.css'

function CaesarBruteForceDecrypter({ ciphertext }: { ciphertext: string }) {
    const hasText = ciphertext.trim().length > 0;

    const possibilities = Array.from({ length: 26 }, (_, shift) => {
        const text = decryptCaesar(ciphertext, shift);

        console.log("shift", shift, "result: ", text);

        return {
            shift,
            text
        };
    });
    
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