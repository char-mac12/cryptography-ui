import './ToolStatusBadge.css'

function ToolStatusBadge({ status }: { status: string }) {
    return (
        <span className="tool-status-badge">
            {status}
        </span>
    )
}

export default ToolStatusBadge