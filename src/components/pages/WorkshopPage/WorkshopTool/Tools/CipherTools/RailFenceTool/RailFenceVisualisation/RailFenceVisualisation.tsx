import {
    createRails,
    placePlaintextOnRails,
    readRailsByRow,
    markRailPositions,
    fillRailsFromCiphertext,
    readRailsInZigZagOrder,
    type Rails,
    readRailsByRowAsList,
} from "../../../../../../../../cryptography/ciphers/rail-fence";
import './RailFenceVisualisation.css'

type RailFenceVisualisationProps = {
    mode: "encrypt" | "decrypt";
    plaintext: string;
    ciphertext: string;
    rails: number;
};

function RailGrid({ rails }: { rails: Rails }) {
    return (
        <div className="rail-fence-grid">
            {rails.map((rail, railIndex) => (
                <div
                    className="rail-fence-row"
                    key={railIndex}
                >
                    {rail.map((character, columnIndex) => (
                        <div
                            className={
                                character === null
                                    ? "rail-fence-cell empty"
                                    : "rail-fence-cell"
                            }
                            key={columnIndex}
                        >
                            {character}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function RailFenceVisualisation({
    mode,
    plaintext,
    ciphertext,
    rails: numRails,
}: RailFenceVisualisationProps) {
    const text =
        mode === "encrypt"
            ? plaintext
            : ciphertext;

    if (
        !text ||
        numRails <= 1 ||
        numRails >= text.length
    ) {
        return null;
    }

    if (mode === "encrypt") {
        const rails = createRails(
            numRails,
            text.length
        );

        placePlaintextOnRails(rails, text);

        const ciphertextFromRails =
            readRailsByRow(rails);

        return (
            <div className="rail-fence-visualisation">
                <div className="rail-fence-step">
                    <h3>1. Place plaintext in a zig-zag</h3>

                    <RailGrid rails={rails} />
                </div>

                <div className="rail-fence-step">
                    <h3>2. Read each rail by row</h3>

                    <div className="rail-fence-rows">
                        {readRailsByRowAsList(rails).map((row, index) => (
                            <div
                                className="rail-fence-row-result"
                                key={index}
                            >
                                <span className="rail-fence-row-label">
                                    Rail {index + 1}
                                </span>

                                <span className="rail-fence-row-text">
                                    {row}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rail-fence-step">
                    <h3>3. Ciphertext</h3>

                    <div className="rail-fence-output">
                        {ciphertextFromRails}
                    </div>
                </div>
            </div>
        );
    }

    const emptyRails = createRails(
        numRails,
        text.length
    );

    markRailPositions(
        emptyRails
    );

    const filledRails = createRails(
        numRails,
        text.length
    );

    markRailPositions(
        filledRails
    );

    fillRailsFromCiphertext(
        filledRails,
        text
    );

    const plaintextFromRails =
        readRailsInZigZagOrder(
            filledRails
        );

    return (
        <div className="rail-fence-visualisation">
            <div className="rail-fence-step">
                <h3>1. Mark the zig-zag positions</h3>

                <RailGrid
                    rails={emptyRails}
                />
            </div>

            <div className="rail-fence-step">
                <h3>2. Fill the rails with ciphertext</h3>

                <RailGrid
                    rails={filledRails}
                />
            </div>

            <div className="rail-fence-step">
                <h3>3. Read in zig-zag order</h3>

                <div className="rail-fence-output">
                    {plaintextFromRails}
                </div>
            </div>
        </div>
    );
}

export default RailFenceVisualisation;