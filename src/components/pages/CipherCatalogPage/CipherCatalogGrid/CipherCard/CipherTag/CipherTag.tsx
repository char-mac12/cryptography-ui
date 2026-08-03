import './CipherTag.css'

function CipherTag({ children }: { children: React.ReactNode }) {
    return (
        <span className="cipher-tag">
            {children}
        </span>
    )
}

export default CipherTag