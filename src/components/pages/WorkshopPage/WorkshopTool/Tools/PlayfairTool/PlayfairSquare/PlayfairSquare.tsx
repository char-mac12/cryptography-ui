import './PlayfairSquare.css'

interface PlayfairSquareProps {
    square: string[][];
    highlights?: string[];
}

function PlayfairSquare({
    square,
    highlights = []
}: PlayfairSquareProps) {

    return (
        <table className="playfair-square">
            <tbody>
                {square.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map(letter => (
                            <td
                                key={letter}
                                className={
                                    highlights.includes(letter)
                                        ? "highlight"
                                        : ""
                                }
                            >
                                {letter}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PlayfairSquare;