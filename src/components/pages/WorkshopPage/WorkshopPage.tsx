import { useNavigate, useParams } from "react-router-dom";
import ToolSelector from "./ToolSelector/ToolSelector";
import WorkshopTool from "./WorkshopTool/WorkshopTool";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import { tools } from "../../../data/tools";
import './WorkshopPage.css'

function WorkshopPage() {   
    const { toolId } = useParams();
    const navigate = useNavigate();
    
    const selectedTool = tools.find(
        (tool) => tool.id === toolId
    );

    if (!selectedTool) {
        return <p>Tool not found</p>
    }

    return (
        <section className="workshop-page">
            <div className="workshop-content">
                <div className="workshop-main">
                    <h1>Workshop</h1>
                    <ToolSelector
                        selectedToolId={toolId ?? ""}
                        setSelectedToolId={(id) => navigate(`/workshop/${id}`)}
                    />
                    {selectedTool && (
                        <WorkshopTool tool={selectedTool} />
                    )}
                </div>
            </div>
            <ReferencePanel />
        </section>
    )
}

export default WorkshopPage