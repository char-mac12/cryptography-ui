import { useState } from 'react';
import NoticeBox from '../../../../Shared/NoticeBox/NoticeBox';
import './TapCodeGrid.css';

const TAP_CODE_GRID = [
    ["A", "B", "C/K", "D", "E"],
    ["F", "G", "H", "I", "J"],
    ["L", "M", "N", "O", "P"],
    ["Q", "R", "S", "T", "U"],
    ["V", "W", "X", "Y", "Z"],
];

function TapCodeGrid() {
    const [hoveredCell, setHoveredCell] = useState<{
        row: number;
        column: number;
    } | null>(null);

    return (
        <div className="tap-code-grid-container">

            <table className="tap-code-grid">
                <tbody>

                    <tr>
                        <th></th>

                        {TAP_CODE_GRID[0].map((_, index) => (
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

                    {TAP_CODE_GRID.map((row, rowIndex) => (
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
                                    className={
                                        hoveredCell?.row === rowIndex &&
                                        hoveredCell?.column === columnIndex
                                            ? "coordinate-cell"
                                            : ""
                                    }
                                    onMouseEnter={() =>
                                        setHoveredCell({
                                            row: rowIndex,
                                            column: columnIndex
                                        })
                                    }
                                    onMouseLeave={() =>
                                        setHoveredCell(null)
                                    }
                                >
                                    {letter}
                                </td>
                            ))}

                        </tr>
                    ))}

                </tbody>
            </table>

            {hoveredCell && (
                <div className="tap-code-coordinate">
                    Row {hoveredCell.row + 1}, Column {hoveredCell.column + 1}

                    <span>
                        → {hoveredCell.row + 1}{hoveredCell.column + 1}
                    </span>
                </div>
            )}

            <NoticeBox
                text="Tap Code uses a 5×5 grid. C and K share the same position, so both are represented by 13."
            />

        </div>
    );
}

export default TapCodeGrid;