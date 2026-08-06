import { getDigraphFrequencies } from "../../Tools/PlayfairTool/playfairLogic";
import NoticeBox from "../../Shared/NoticeBox/NoticeBox";
import './DigraphFrequencyTable.css'

type Props = {
    text: string;
    noticeText: string;
}

function DigraphFrequencyTable({ text, noticeText }: Props) {

    const frequencies = getDigraphFrequencies(text);

    return (
        <div className="digraph-frequency-analysis">
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

            <NoticeBox text={noticeText} />
        </div>
    );
}

export default DigraphFrequencyTable