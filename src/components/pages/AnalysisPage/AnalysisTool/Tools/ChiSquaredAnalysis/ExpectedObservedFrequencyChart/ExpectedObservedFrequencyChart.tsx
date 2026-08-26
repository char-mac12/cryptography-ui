import './ExpectedObservedFrequencyChart.css';

type ExpectedObservedFrequencyChartProps = {
    observed: Record<string, number>;
    expected: Record<string, number>;
};

function ExpectedObservedFrequencyChart({
    observed,
    expected
}: ExpectedObservedFrequencyChartProps) {

    const letters = Array.from(
        { length: 26 },
        (_, i) => String.fromCharCode(65 + i)
    );

    const maxValue = Math.max(
        ...letters.map((letter) =>
            Math.max(
                observed[letter] || 0,
                expected[letter] || 0
            )
        ),
        1
    );

    return (
        <div className="expected-observed-frequency-chart">

            <div className="expected-observed-histogram">
                {letters.map((letter) => {
                    const observedValue =
                        observed[letter] ??
                        observed[letter.toLowerCase()] ??
                        0;

                    const expectedValue =
                        expected[letter] ??
                        expected[letter.toLowerCase()] ??
                        0;

                    const observedHeight =
                        (observedValue / maxValue) * 100;

                    const expectedHeight =
                        (expectedValue / maxValue) * 100;

                    return (
                        <div
                            className="expected-observed-column"
                            key={letter}
                            title={`${letter} — Observed: ${observedValue}, Expected: ${expectedValue.toFixed(2)}`}
                        >
                            <div className="expected-observed-bars">

                                <div
                                    className="expected-observed-bar observed"
                                    style={{
                                        height: `${observedHeight}%`
                                    }}
                                />

                                <div
                                    className="expected-observed-bar expected"
                                    style={{
                                        height: `${expectedHeight}%`
                                    }}
                                />

                            </div>

                            <span>{letter}</span>
                        </div>
                    );
                })}
            </div>

            <div className="expected-observed-legend">
                <span>
                    <span className="legend-marker observed-marker" />
                    Observed
                </span>

                <span>
                    <span className="legend-marker expected-marker" />
                    Expected
                </span>
            </div>

        </div>
    );
}

export default ExpectedObservedFrequencyChart;