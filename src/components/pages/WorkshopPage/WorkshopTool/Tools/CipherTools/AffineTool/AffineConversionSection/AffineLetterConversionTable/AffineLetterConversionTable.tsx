import { mod, modInverse } from '../../../../../../../../../cryptography/utils/maths';
import './AffineLetterConversionTable.css';

type AffineLetterConversionTableProps = {
    text: string;
    a: number;
    b: number;
    mode: 'encrypt' | 'decrypt';
};

function AffineLetterConversionTable({
    text,
    a,
    b,
    mode
}: AffineLetterConversionTableProps) {

    const letterCounts: Record<string, number> = {};

    text
        .toUpperCase()
        .split("")
        .filter((char) => char >= "A" && char <= "Z")
        .forEach((char) => {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        });

    const aInverse = modInverse(a, 26);

    const rows = Object.entries(letterCounts).map(([char, count]) => {
        const position = char.charCodeAt(0) - 65;

        if (mode === "encrypt") {
            const multiplied = a * position;
            const added = multiplied + b;
            const resultPosition = mod(added, 26);
            const result = String.fromCharCode(resultPosition + 65);

            return {
                char,
                position,
                multiplied,
                added,
                resultPosition,
                result,
                count
            };
        }

        const subtracted = position - b;
        const multiplied = aInverse * subtracted;
        const resultPosition = mod((multiplied + 26), 26);
        const result = String.fromCharCode(resultPosition + 65);

        return {
            char,
            position,
            subtracted,
            multiplied,
            resultPosition,
            result,
            count
        };
    });

    return (
        <table className="letter-conversion-table">
            <thead>
                <tr>
                    <th>{mode === 'encrypt' ? 'Plain' : 'Cipher'}</th>
                    <th>Position</th>

                    {mode === 'encrypt' ? (
                        <>
                            <th>a x plaintext</th>
                            <th>+ b</th>
                        </>
                    ) : (
                        <>
                            <th>ciphertext − b</th>
                            <th>× a⁻¹</th>
                        </>
                    )}

                    <th>mod 26</th>
                    <th>{mode === 'encrypt' ? 'Cipher' : 'Plain'}</th>
                    <th>Count</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => (
                    <tr key={row.char}>
                        <td>{row.char}</td>
                        <td>{row.position}</td>

                        {mode === 'encrypt' ? (
                            <>
                                <td>
                                    {a} × {row.position} = {row.multiplied}
                                </td>
                                <td>
                                    {row.multiplied} + {b} = {row.added}
                                </td>
                                <td>{row.resultPosition}</td>
                            </>
                        ) : (
                            <>
                                <td>
                                    {row.position} − {b} = {row.subtracted}
                                </td>
                                <td>
                                    {aInverse} × {row.subtracted} = {row.multiplied}
                                </td>
                                <td>{row.resultPosition}</td>
                            </>
                        )}

                        <td>{row.result}</td>
                        <td>{row.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AffineLetterConversionTable;