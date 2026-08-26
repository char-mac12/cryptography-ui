import './ToolHeader.css'

function ToolHeader({ title }: { title: string }) {
    return (
        <div className="tool-header">
            <h2>{title}</h2>
        </div>
    )
}

export default ToolHeader