import { useState } from 'react';
import './CipherParameter.css';

interface CipherParameterProps {
    name: string;
    value: number;
    onChange: (value: string) => void;
    min?: number;
    max?: number;
    options?: number[];
}

function CipherParameter({
    name,
    value,
    onChange,
    min,
    max,
    options
}: CipherParameterProps) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (newValue: string) => {
        setInputValue(newValue);

        if (newValue !== "") {
            onChange(newValue);
        }
    };

    return (
        <div className="cipher-parameter">
            <label htmlFor={`cipher-parameter-${name}`}>
                {name}
            </label>

            {options ? (
                <select
                    id={`cipher-parameter-${name}`}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={`cipher-parameter-${name}`}
                    type="number"
                    value={inputValue}
                    onChange={(event) => handleChange(event.target.value)}
                    min={min}
                    max={max}
                />
            )}
        </div>
    );
}

export default CipherParameter;