import './VigenereLetterConversionTable.css';

type Props = {
    text: string;
    keyword: string;
    mode: 'encrypt' | 'decrypt';
};

function VigenereLetterConversionTable({
    text,
    keyword,
    mode
}: Props) {

    const cleanKeyword = keyword
        .toUpperCase()
        .replace(/[^A-Z]/g, "");

    if (!cleanKeyword.length) {
        return null;
    }

    let keywordIndex = 0;

    const rows = text
        .toUpperCase()
        .split("")
        .flatMap((char, index) => {

            if (char < "A" || char > "Z") {
                return [];
            }

            const keyChar =
                cleanKeyword[keywordIndex % cleanKeyword.length];

            keywordIndex++;

            const textPos = char.charCodeAt(0) - 65;
            const keyPos = keyChar.charCodeAt(0) - 65;

            const calculation =
                mode === "encrypt"
                    ? textPos + keyPos
                    : textPos - keyPos;

            const wrapped = 
                mode === "encrypt"
                    ? calculation >= 26
                    : calculation < 0;

            const resultPos = (calculation + 26) % 26;

            const result =
                String.fromCharCode(resultPos + 65);

            return [{
                index: index + 1,
                input: char,
                key: keyChar,
                textPos,
                keyPos,
                calculation,
                wrapped,
                resultPos,
                result
            }];
        });

    return (
        <table className="letter-conversion-table">

            <thead>
                <tr>
                    <th>#</th>
                    <th>{mode === "encrypt" ? "Plain" : "Cipher"}</th>
                    <th>Repeated Key</th>
                    <th>Input Pos</th>
                    <th>{mode === "encrypt" ? "+" : "-"} Key</th>
                    <th>{mode === "encrypt" ? "Sum" : "Difference"}</th>
                    <th>mod 26</th>
                    <th>{mode === "encrypt" ? "Cipher" : "Plain"}</th>
                </tr>
            </thead>

            <tbody>

                {rows.map((row) => (

                    <tr key={row.index}>
                        <td>{row.index}</td>
                        <td>{row.input}</td>
                        <td>{row.key}</td>
                        <td>{row.textPos}</td>
                        <td>
                            {mode === "encrypt" ? "+ " : "- "}
                            {row.keyPos}
                        </td>
                        <td>{row.calculation}</td>
                        <td>
                            {row.wrapped && "↺ "}
                            {row.resultPos}
                        </td>
                        <td>{row.result}</td>
                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default VigenereLetterConversionTable;