import './KeywordInput.css';

interface KeywordInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

function KeywordInput({
    label,
    placeholder,
    value,
    onChange
}: KeywordInputProps) {
    return (
        <div className="keyword-input-container">
            <label className="keyword-input-label">
                {label}
            </label>

            <input
                className="keyword-input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default KeywordInput;