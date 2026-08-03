import './CipherStatusBadge.css'

function CipherStatusBadge({ status }: { status: string }) {
    return (
        <span className="cipher-status-badge">
            {status}
        </span>
    )
}

export default CipherStatusBadge