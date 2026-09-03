import type { Tool } from '../../../../types/tool';
import ToolCard from './ToolCard/ToolCard';
import "./ToolCatalogGrid.css"

function ToolCatalogGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="tool-grid">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
        />
      ))}
    </div>
  );
}

export default ToolCatalogGrid;