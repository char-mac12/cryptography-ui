import './ResultsCount.css'

function ResultsCount({ results }: { results: number }) {
    return (
    <p className="results-count">
        {results} {results === 1 ? "result" : "results"}
    </p>
    )
}

export default ResultsCount