import { useState } from 'react';
import NoticeBox from '../../../Shared/NoticeBox/NoticeBox';
import './PolybiusSquare.css';

interface PolybiusSquareProps {
    square: string[][];
    highlights?: string[];
}

function PolybiusSquare({
    square,
    highlights = []
}: PolybiusSquareProps) {

    const [hoveredCell, setHoveredCell] = useState<{
        row: number;
        column: number;
    } | null>(null);

    return (
        <div className="polybius-square-container">

            <table className="polybius-square">
                <tbody>

                    <tr>
                        <th></th>

                        {square[0].map((_, index) => (
                            <th
                                key={index}
                                className={
                                    hoveredCell?.column === index
                                        ? "coordinate-highlight"
                                        : ""
                                }
                            >
                                {index + 1}
                            </th>
                        ))}
                    </tr>

                    {square.map((row, rowIndex) => (
                        <tr key={rowIndex}>

                            <th
                                className={
                                    hoveredCell?.row === rowIndex
                                        ? "coordinate-highlight"
                                        : ""
                                }
                            >
                                {rowIndex + 1}
                            </th>

                            {row.map((letter, columnIndex) => (
                                <td
                                    key={letter}
                                    className={`
                                        ${highlights.includes(letter) ? "highlight" : ""}
                                        ${
                                            hoveredCell?.row === rowIndex &&
                                            hoveredCell?.column === columnIndex
                                                ? "coordinate-cell"
                                                : ""
                                        }
                                    `}
                                    onMouseEnter={() =>
                                        setHoveredCell({
                                            row: rowIndex,
                                            column: columnIndex
                                        })
                                    }
                                    onMouseLeave={() => setHoveredCell(null)}
                                >
                                    {letter}
                                </td>
                            ))}

                        </tr>
                    ))}

                </tbody>
            </table>

            {hoveredCell && (
                <div className="polybius-coordinate">
                    Row {hoveredCell.row + 1}, Column {hoveredCell.column + 1}
                    <span>
                        → {hoveredCell.row + 1}{hoveredCell.column + 1}
                    </span>
                </div>
            )}

            <NoticeBox text="The Polybius Square is a 5x5 square containing 25 letters, so I and J share the same cell. Any J entered into the tool is automatically converted to an I." />

        </div>
    );
}

export default PolybiusSquare;