import { useNavigate } from "react-router-dom";
import ToolDifficultyBadge from "./ToolDifficultyBadge/ToolDifficultyBadge"
import ToolStatusBadge from "./ToolStatusBadge/ToolStatusBadge"
import ToolTag from "./ToolTag/ToolTag"
import InputTypeBadge from "./InputTypeBadge/InputTypeBadge"
import OpenToolButton from "./OpenToolButton/OpenToolButton"
import './ToolCard.css'
import type { Tool } from "../../../../../types/tool";

function ToolCard({ tool }: { tool: Tool} ) {
    const navigate = useNavigate();
    
    return (
        <div className="tool-card">
            <div className="tool-card-header">
                <ToolStatusBadge status={tool.status} />
                <div className="tool-card-header-right">
                    {tool.hasVisualisation && (
                        <span 
                            className="visualisation-symbol"
                            title="Interactive visualisation available"
                        >
                            ◉
                        </span>
                    )}
                    <ToolDifficultyBadge difficulty={tool.difficulty} />
                </div>
            </div>

            <h2 className="tool-title">{tool.title}</h2>
            <p className="tool-category">{tool.category}</p>
            <p className="tool-origin">{tool.origin}</p>
            <p className="tool-description">{tool.description}</p>
            <div className="tool-input-types">
                {tool.inputTypes.map((type: string) => (
                    <InputTypeBadge key={type}>
                        {type}
                    </InputTypeBadge>
                ))}
            </div>

            <div className="tool-card-footer">
                <div className="tool-tags">
                    {tool.tags.map((tag: string) => (
                        <ToolTag key={tag}>
                            {tag}
                        </ToolTag>
                    ))}
                </div>
                <OpenToolButton 
                    onClick={() => navigate(`/workshop/${tool.id}`)} 
                />
            </div>

        </div>
    )
        
}

export default ToolCard