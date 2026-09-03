import { useState } from 'react';
import { decryptCaesar } from '../../../../../../../../cryptography/ciphers/caesar';
import ToolHeader from '../../../../../../Shared/ToolHeader/ToolHeader';
import './CaesarBruteForceDecrypter.css'
import { calculateEnglishScore } from '../../../../../../../../cryptography/analysis/englishScore';
import SortControls from './SortControls/SortControls';

function CaesarBruteForceDecrypter({ ciphertext }: { ciphertext: string }) {
    const [sortBy, setSortBy] = useState<'score' | 'shift'>('score');
    const hasText = ciphertext.trim().length > 0;

    const possibilities = Array.from({ length: 26 }, (_, shift) => {
        const text = decryptCaesar(ciphertext, shift);
        const score = calculateEnglishScore(text);

        console.log("shift", shift, "result: ", text);

        return {
            shift,
            text,
            score
        };
    });

    const sortedPossibilities = [...possibilities].sort((a, b) => {
        if (sortBy === 'score') {
            return b.score - a.score;
        }
        return a.shift - b.shift;
    })
    
    return (
        <div className="caesar-brute-force">
            <ToolHeader title='Brute Force Decryption' />
            {hasText ? (
                <>
                    <SortControls sortBy={sortBy} onSortChange={setSortBy} />
                    <table>
                        <thead>
                            <tr>
                                <th>Shift</th>
                                <th>Fitness Score</th>
                                <th>Decrypted Text</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedPossibilities.map((item) => (
                                <tr key={item.shift}>
                                    <td>{item.shift}</td>
                                    <td>{item.score.toFixed(1)}</td>
                                    <td>{item.text}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Brute force results will appear here when ciphertext is entered.</p>
            )}
        </div>
    )
}

export default CaesarBruteForceDecrypter