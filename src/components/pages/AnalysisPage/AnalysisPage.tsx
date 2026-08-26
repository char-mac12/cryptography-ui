import { useNavigate, useParams } from "react-router-dom";
import { analyses } from "../../../data/analysis";
import './AnalysisPage.css'
import ReferencePanel from "../Shared/ReferencePanel/ReferencePanel";
import AnalysisSelector from "./AnalysisSelector/AnalysisSelector";
import AnalysisTool from "./AnalysisTool/AnalysisTool";

function AnalysisPage() {
    const { analysisId } = useParams();
    const navigate = useNavigate();

    console.log("analysisId:", analysisId);
    console.log("analyses:", analyses);
    console.log(
        "match:",
        analyses.find(analysis => analysis.id === analysisId)
    );

    const selectedAnalysis = analyses.find(
        (analysis) => analysis.id === analysisId
    );

    if (!selectedAnalysis) {
        return <p>Analysis not found</p>
    }

    return (
        <section className="analysis-page">
            <div className="analysis-content">
                <div className="analysis-main">
                    <h1>Analysis</h1>

                    <AnalysisSelector
                        selectedAnalysisId={analysisId ?? ""}
                        setSelectedAnalysisId={(id) =>
                            navigate(`/analysis/${id}`)
                        }
                    />

                    {selectedAnalysis && (
                        <AnalysisTool analysis={selectedAnalysis} />
                    )}
                </div>
            </div>

            <ReferencePanel />
        </section>
    )
}

export default AnalysisPage