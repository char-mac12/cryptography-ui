import './InfoPanel.css'

function InfoPanel({ text }: { text: string }) {
    return (
        <div className="info-panel">
            {text}
        </div>
    )
}

export default InfoPanel