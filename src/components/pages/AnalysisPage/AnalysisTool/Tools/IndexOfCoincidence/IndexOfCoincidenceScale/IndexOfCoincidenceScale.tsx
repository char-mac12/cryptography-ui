interface IndexOfCoincidenceScaleProps {
    value: number;
}

function IndexOfCoincidenceScale({
    value,
}: IndexOfCoincidenceScaleProps) {
    const RANDOM_IC = 0.0385;
    const ENGLISH_IC = 0.066;

    const MIN_IC = 0.03;
    const MAX_IC = 0.075;

    const getPosition = (score: number) => {
        return Math.max(
            0,
            Math.min(
                100,
                ((score - MIN_IC) / (MAX_IC - MIN_IC)) * 100
            )
        );
    };

    const randomPosition = getPosition(RANDOM_IC);
    const englishPosition = getPosition(ENGLISH_IC);
    const userPosition = getPosition(value);

    return (
        <div className="ic-scale">

            <div className="ic-scale-track">

                <div
                    className="ic-scale-reference ic-scale-random"
                    style={{ left: `${randomPosition}%` }}
                />

                <div
                    className="ic-scale-reference ic-scale-english"
                    style={{ left: `${englishPosition}%` }}
                />

                <div
                    className="ic-scale-user"
                    style={{ left: `${userPosition}%` }}
                >
                    <span className="ic-scale-user-label">
                        Your IC
                        <strong>{value.toFixed(4)}</strong>
                    </span>

                    <span className="ic-scale-user-marker" />
                </div>

            </div>

            <div className="ic-scale-references">

                <div
                    className="ic-scale-reference-label"
                    style={{ left: `${randomPosition}%` }}
                >
                    <span>Random</span>
                    <strong>{RANDOM_IC.toFixed(4)}</strong>
                </div>

                <div
                    className="ic-scale-reference-label"
                    style={{ left: `${englishPosition}%` }}
                >
                    <span>English</span>
                    <strong>{ENGLISH_IC.toFixed(4)}</strong>
                </div>

            </div>

            <div className="ic-scale-endpoints">
                <span>{MIN_IC.toFixed(4)}</span>
                <span>{MAX_IC.toFixed(4)}</span>
            </div>

        </div>
    );
}

export default IndexOfCoincidenceScale;