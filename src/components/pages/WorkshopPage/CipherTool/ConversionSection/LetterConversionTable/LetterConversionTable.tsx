import './LetterConversionTable.css'

type LetterConversionTableProps = {
    text: string;
    shift: number;
    mode: 'encrypt' | 'decrypt';
}

function LetterConversionTable({
    text,
    shift,
    mode
}: LetterConversionTableProps) {

    const letterCounts: Record<string, number> = {};

    text
        .toUpperCase()
        .split("")
        .filter((char) => char >= "A" && char <= "Z")
        .forEach((char) => {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        });

    const rows = Object.entries(letterCounts).map(([char, count]) => {
        const position = char.charCodeAt(0) - 65;

        const calculation =
            mode === "encrypt"
                ? position + shift
                : position - shift;

        const wrapped =
            mode === "encrypt"
                ? calculation >= 26
                : calculation < 0;

        const resultPosition = (calculation + 26) % 26;

        const result = String.fromCharCode(resultPosition + 65);

        return {
            char,
            position,
            shift,
            calculation,
            resultPosition,
            result,
            wrapped,
            count,
        };
    });

    return (
        <table className="letter-conversion-table">
            <thead>
                <tr>
                    <th>{mode === 'encrypt' ? 'Plain' : 'Cipher'}</th>
                    <th>Position</th>
                    <th>{mode === 'encrypt' ? '+' : '-'} Shift ({shift})</th>
                    <th>{mode === 'encrypt' ? 'Sum' : 'Difference'}</th>
                    <th>mod 26</th>
                    <th>Result Pos</th>
                    <th>{mode === 'encrypt' ? 'Cipher' : 'Plain'}</th>
                    <th>Count</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => (
                    <tr key={row.char}>
                        <td>{row.char}</td>
                        <td>{row.position}</td>
                        <td>{row.shift}</td>
                        <td>{row.calculation}</td>
                        <td>
                            {row.wrapped && "↺ "}
                            {row.resultPosition}
                        </td>
                        <td>{row.resultPosition}</td>
                        <td>{row.result}</td>
                        <td>{row.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LetterConversionTable