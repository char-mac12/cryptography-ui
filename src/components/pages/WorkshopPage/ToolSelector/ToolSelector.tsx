import { catalog } from '../../../../data/catalog';
import './ToolSelector.css'

type ToolSelectorProps = {
    selectedToolId: string;
    setSelectedToolId: (id: string) => void;
};

function ToolSelector(
    {
        selectedToolId, 
        setSelectedToolId
    } : ToolSelectorProps) {
    return (
        <div className="tool-selector-container">
            <select
                className="tool-selector"
                name="tools"
                id="tools"
                value={selectedToolId}
                onChange={(e) => setSelectedToolId(e.target.value)}
            >
                {catalog.map((catalogItem) => (
                    <option
                        key={catalogItem.id}
                        value={catalogItem.id}
                    >
                        {catalogItem.title}
                    </option>
                ))}
            </select>
            <span className="tool-selector-arrow">
                ❯
            </span>
        </div>
    )
}

export default ToolSelector