import type { ChangeEvent } from "react";

interface SortControlsProps {
    sortBy: 'score' | 'shift';
    onSortChange: (sortBy: 'score' | 'shift') => void;
}

function SortControls({ sortBy, onSortChange }: SortControlsProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value as 'score' | 'shift');
    };

    return (
        <div className="sort-controls" style={{ marginBottom: '1rem' }}>
            <label style={{ marginRight: '0.5rem' }}>Sort by:</label>
            <select value={sortBy} onChange={handleChange}>
                <option value="score">Fitness Score (Best Match First)</option>
                <option value="shift">Shift Order (0 - 25)</option>
            </select>
        </div>
    );
}

export default SortControls;