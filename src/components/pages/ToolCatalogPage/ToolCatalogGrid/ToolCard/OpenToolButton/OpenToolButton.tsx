import './OpenToolButton.css'

type OpenToolButtonProps = {
    onClick?: () => void;
}

function OpenToolButton({ onClick }: OpenToolButtonProps) {
    return (
        <button className="open-tool-button" onClick={onClick}>
            Open Tool →
        </button>
    )
}

export default OpenToolButton