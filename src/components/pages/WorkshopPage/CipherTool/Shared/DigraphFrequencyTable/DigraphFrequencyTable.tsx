import { getDigraphFrequencies } from "../../Tools/PlayfairTool/playfairLogic";
import './DigraphFrequencyTable.css'

type Props = {
    text: string;
}

function DigraphFrequencyTable({ text }: Props) {

    const frequencies = getDigraphFrequencies(text);

    return (
        <table className="digraph-frequency-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Digraph</th>
                    <th>Count</th>
                </tr>
            </thead>

            <tbody>
                {frequencies.map((item, index) => (
                    <tr key={item.pair}>
                        <td>{index + 1}</td>
                        <td>{item.pair}</td>
                        <td>{item.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DigraphFrequencyTable