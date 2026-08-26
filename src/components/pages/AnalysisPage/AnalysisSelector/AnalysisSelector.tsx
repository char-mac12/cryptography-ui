import { analyses } from '../../../../data/analysis';
import ParameterSelect from '../../WorkshopPage/WorkshopTool/Shared/ParameterSelect/ParameterSelect';

type AnalysisSelectorProps = {
    selectedAnalysisId: string;
    setSelectedAnalysisId: (id: string) => void;
};

function AnalysisSelector({
    selectedAnalysisId,
    setSelectedAnalysisId,
}: AnalysisSelectorProps) {
    return (
        <ParameterSelect
            name="Analysis"
            value={selectedAnalysisId}
            onChange={setSelectedAnalysisId}
            options={analyses.map((analysis) => ({
                value: analysis.id,
                label: analysis.title,
            }))}
        />
    );
}

export default AnalysisSelector;