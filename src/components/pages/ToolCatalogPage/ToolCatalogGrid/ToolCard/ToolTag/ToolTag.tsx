import './ToolTag.css'

function ToolTag({ children }: { children: React.ReactNode }) {
    return (
        <span className="tool-tag">
            {children}
        </span>
    )
}

export default ToolTag