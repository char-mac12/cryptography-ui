import './CipherDifficultyBadge.css'

function CipherDifficultyBadge({ difficulty }: { difficulty: string }) {
    return (
        <span className="cipher-difficulty-badge">
            {difficulty}
        </span>
    )
}

export default CipherDifficultyBadge