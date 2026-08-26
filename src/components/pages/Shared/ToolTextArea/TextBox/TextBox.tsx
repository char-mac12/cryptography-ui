import './TextBox.css'

type Props = {
    title: string;
    value: string;
    placeholder: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
};

function TextBox({
    title,
    value,
    placeholder,
    onChange,
    readOnly = false,
}: Props) {
    return (
        <div className="text-box">
            <label>{title}</label>
            <textarea 
                value={value}
                onChange={(e) => onChange?.(e.target.value)} 
                readOnly={readOnly}
                placeholder={placeholder}
            />
        </div>
    )
}

export default TextBox