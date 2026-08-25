import './ToolDifficultyBadge.css'

function ToolDifficultyBadge({ difficulty }: { difficulty: string }) {
    return (
        <span className="tool-difficulty-badge">
            {difficulty}
        </span>
    )
}

export default ToolDifficultyBadge