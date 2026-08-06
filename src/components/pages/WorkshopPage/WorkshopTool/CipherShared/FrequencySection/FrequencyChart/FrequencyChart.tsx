import './FrequencyChart.css'

type FrequencyChartProps = {
    title: string;
    text: string;
}

function FrequencyChart({ title, text }: FrequencyChartProps) {

    const counts: Record<string, number> = {};

    text
        .toUpperCase()
        .split("")
        .filter((char) => char >= "A" && char <= "Z")
        .forEach((char) => {
            counts[char] = (counts[char] || 0) + 1;
        });

    const letters = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );

    const total = Object.values(counts)
        .reduce((sum, count) => sum + count, 0);

    const maxCount = Math.max(
        ...Object.values(counts),
        1
    );

    return (
        <div className="frequency-chart">
            <h3>{title}</h3>

            <div className="frequency-histogram">
                {letters.map((letter) => {
                    const count = counts[letter] || 0;
                    const height = (count / maxCount) * 100;
                    const percentage = total === 0
                        ? 0
                        : (count / total) * 100;

                    return (
                        <div 
                            className="frequency-column"
                            key={letter}
                            title={`${letter}: ${count} (${percentage.toFixed(1)}%)`}
                        >
                            <div className="frequency-bar-container">
                                <div
                                    className="frequency-bar"
                                    style={{
                                        height: `${height}%`
                                    }}
                                />
                            </div>

                            <span>{letter}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FrequencyChart