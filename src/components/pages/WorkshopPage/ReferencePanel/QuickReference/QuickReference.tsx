import ReferenceBox from '../ReferenceBox/ReferenceBox'
import './QuickReference.css'

function QuickReference() {
    return (
        <ReferenceBox title="Quick Reference">
            <div className="reference-row">
                <span>Most common English letter</span>
                <span className="reference-value">E</span>
            </div>
            <div className="reference-row">
                <span>Most common English digraph</span>
                <span className="reference-value">TH</span>
            </div>
            <div className="reference-row">
                <span>Most common English trigraph</span>
                <span className="reference-value">THE</span>
            </div>
        </ReferenceBox>
    );
}

export default QuickReference