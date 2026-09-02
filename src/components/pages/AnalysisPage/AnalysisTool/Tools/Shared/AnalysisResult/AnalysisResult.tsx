import './AnalysisResult.css'

interface AnalysisResultProps {
    title: string
    score: number | undefined
    description: string
    children?: React.ReactNode
}

export default function AnalysisResult({
    title,
    score,
    description,
    children
}: AnalysisResultProps) {
    return (
        <div className="analysis-result">
            <h3>{title}</h3>

            {score !== undefined && (
                <div className="analysis-score">
                    {score.toFixed(2)}
                </div>
            )}

            <p>{description}</p>

            {children}
        </div>
    )
}