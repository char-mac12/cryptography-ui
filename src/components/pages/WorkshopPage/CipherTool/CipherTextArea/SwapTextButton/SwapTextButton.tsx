import './SwapTextButton.css'

function SwapTextButton({ onClick }: { onClick: () => void }) {
    return (
        <div className="swap-text-button">
            <button aria-label="Swap text" onClick={onClick}>⇄</button>
        </div>
    )
}

export default SwapTextButton