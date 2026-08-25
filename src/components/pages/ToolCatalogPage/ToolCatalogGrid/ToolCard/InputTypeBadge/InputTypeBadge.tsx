import './InputTypeBadge.css'

function InputTypeBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="input-type-badge">
            {children}
        </span>
    )
}

export default InputTypeBadge