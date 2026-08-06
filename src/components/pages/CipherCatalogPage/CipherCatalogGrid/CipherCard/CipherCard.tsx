import { useNavigate } from "react-router-dom";
import type { Cipher } from "../../../../../types/Tool"
import CipherDifficultyBadge from "./CipherDifficultyBadge/CipherDifficultyBadge"
import CipherStatusBadge from "./CipherStatusBadge/CipherStatusBadge"
import CipherTag from "./CipherTag/CipherTag"
import InputTypeBadge from "./InputTypeBadge/InputTypeBadge"
import OpenToolButton from "./OpenToolButton/OpenToolButton"
import './CipherCard.css'

function CipherCard({ cipher }: { cipher: Cipher} ) {
    const navigate = useNavigate();
    
    return (
        <div className="cipher-card">
            <div className="cipher-card-header">
                <CipherStatusBadge status={cipher.status} />
                <div className="cipher-card-header-right">
                    {cipher.hasVisualisation && (
                        <span 
                            className="visualisation-symbol"
                            title="Interactive visualisation available"
                        >
                            ◉
                        </span>
                    )}
                    <CipherDifficultyBadge difficulty={cipher.difficulty} />
                </div>
            </div>

            <h2 className="cipher-title">{cipher.title}</h2>
            <p className="cipher-category">{cipher.category}</p>
            <p className="cipher-origin">{cipher.origin}</p>
            <p className="cipher-description">{cipher.description}</p>
            <div className="cipher-input-types">
                {cipher.inputTypes.map((type) => (
                    <InputTypeBadge key={type}>
                        {type}
                    </InputTypeBadge>
                ))}
            </div>

            <div className="cipher-card-footer">
                <div className="cipher-tags">
                    {cipher.tags.map((tag) => (
                        <CipherTag key={tag}>
                            {tag}
                        </CipherTag>
                    ))}
                </div>
                <OpenToolButton 
                    onClick={() => navigate(`/workshop/${cipher.id}`)} 
                />
            </div>

        </div>
    )
        
}

export default CipherCard