import type { Analysis } from '../../../../types/Analysis';
import './AnalysisTool.css';
import ChiSquaredAnalysis from './Tools/ChiSquaredAnalysis/ChiSquaredAnalysis';
import Entropy from './Tools/Entropy/Entropy';
import IndexOfCoincidence from './Tools/IndexOfCoincidence/IndexOfCoincidence';

// import FrequencyAnalysis from './Analyses/FrequencyAnalysis/FrequencyAnalysis';
// import IndexOfCoincidence from './Analyses/IndexOfCoincidence/IndexOfCoincidence';
// import KasiskiExamination from './Analyses/KasiskiExamination/KasiskiExamination';

type AnalysisToolProps = {
    analysis: Analysis;
};

function AnalysisTool({ analysis }: AnalysisToolProps) {

    switch (analysis.id) {
        case "chi-squared":
            return (
                <ChiSquaredAnalysis />
            );

        // case "frequency-analysis":
        //     return (
        //         <FrequencyAnalysis />
        //     );

        case "index-of-coincidence":
            return (
                <IndexOfCoincidence />
            );

        case "entropy":
            return (
                <Entropy />
            );

        // case "kasiski-examination":
        //     return (
        //         <KasiskiExamination />
        //     );

        default:
            return (
                <div>
                    Analysis not available
                </div>
            );
    }
}

export default AnalysisTool;