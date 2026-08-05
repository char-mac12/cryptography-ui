import { generateKeywordSquare, prepareKeyword } from '../playfairLogic'
import PlayfairSquare from '../PlayfairSquare/PlayfairSquare';
import './KeywordPreparation.css'

function KeywordPreparation({ keyword }: { keyword: string }) {
    const {
        cleanedKeyword,
        uniqueKeyword,
        preparedKeyword
    } = prepareKeyword(keyword);

    const square = generateKeywordSquare(keyword);
    
    return (
        <div className="keyword-preparation">
            <div className="keyword-step">
                <h4>1. Clean keyword</h4>
                <div className="keyword-value">
                    {cleanedKeyword}
                </div>
            </div>
            <div className="keyword-step">
                <h4>2. Remove duplicates</h4>
                <div className="keyword-value">
                    {uniqueKeyword}
                </div>
            </div>
            <div className="keyword-step">
                <h4>3. Add remaining alphabet</h4>
                <div className="keyword-value">
                    {preparedKeyword}
                </div>
            </div>
            <div className="keyword-step">
                <h4>4. Create keyword square</h4>
                <div className="keyword-value">
                    <PlayfairSquare square={square} />
                </div>
            </div>
        </div>
    )
}

export default KeywordPreparation