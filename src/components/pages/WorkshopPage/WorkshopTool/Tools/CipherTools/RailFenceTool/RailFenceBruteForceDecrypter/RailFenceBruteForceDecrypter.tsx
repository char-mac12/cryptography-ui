import ToolHeader from '../../../../../../Shared/ToolHeader/ToolHeader';
import { decryptRailFence } from '../../../../../../../../cryptography/ciphers/railFence';
import './RailFenceBruteForceDecrypter.css';
import CipherParameter from '../../../../CipherShared/CipherParameter/CipherParameter';
import { useState } from 'react';

type RailFenceBruteForceDecrypterProps = {
    ciphertext: string;
    minRails?: number;
    maxRails?: number;
};

function RailFenceBruteForceDecrypter({
    ciphertext,
    minRails: initialMinRails = 2,
    maxRails: initialMaxRails = 10,
}: RailFenceBruteForceDecrypterProps) {
    const [minRails, setMinRails] = useState(initialMinRails);
    const [maxRails, setMaxRails] = useState(initialMaxRails);

    const hasText = ciphertext.trim().length > 0;

    const maxPossibleRails = Math.max(
        2,
        ciphertext.length - 1
    );

    const startRails = Math.max(
        2,
        Math.min(minRails, maxPossibleRails)
    );

    const endRails = Math.max(
        startRails,
        Math.min(maxRails, maxPossibleRails)
    );

    const handleMinRailsChange = (value: string) => {
        const newMinRails = Number(value);

        if (newMinRails >= 2 && newMinRails <= maxPossibleRails) {
            setMinRails(newMinRails);
        }
    };

    const handleMaxRailsChange = (value: string) => {
        const newMaxRails = Number(value);

        if (newMaxRails >= 2 && newMaxRails <= maxPossibleRails) {
            setMaxRails(newMaxRails);
        }
    };

    const possibilities = hasText
        ? Array.from(
            { length: endRails - startRails + 1 },
            (_, index) => {
                const rails = startRails + index;

                return {
                    rails,
                    text: decryptRailFence(
                        ciphertext,
                        rails
                    ),
                };
            }
        )
        : [];

    return (
        <div className="rail-fence-brute-force">
            <ToolHeader title="Brute Force Decryption" />

            <div className="brute-force-parameters">
                <CipherParameter name="Min Rails" value={minRails} onChange={handleMinRailsChange} />
                <CipherParameter name="Max Rails" value={maxRails} onChange={handleMaxRailsChange} />
            </div>
            
            {hasText ? (
                <>
                    <p>
                        Trying {startRails} to {endRails} rails.
                    </p>

                    <table>
                        <thead>
                            <tr>
                                <th>Rails</th>
                                <th>Decrypted Text</th>
                            </tr>
                        </thead>

                        <tbody>
                            {possibilities.map((item) => (
                                <tr key={item.rails}>
                                    <td>{item.rails}</td>
                                    <td>{item.text}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>
                    Brute force results will appear here when
                    ciphertext is entered.
                </p>
            )}
        </div>
    );
}

export default RailFenceBruteForceDecrypter;