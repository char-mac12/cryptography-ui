import './ParameterSelect.css';

interface ParameterSelectOption {
    value: string;
    label: string;
}

interface ParameterSelectProps {
    name: string;
    value: string;
    options: ParameterSelectOption[];
    onChange: (value: string) => void;
}

function ParameterSelect({
    name,
    value,
    options,
    onChange
}: ParameterSelectProps) {
    return (
        <div className="parameter-select">
            <label htmlFor={`parameter-select-${name}`}>
                {name}
            </label>

            <select
                id={`parameter-select-${name}`}
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ParameterSelect;