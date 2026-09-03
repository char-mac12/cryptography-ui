import ToolCard from './ToolCard/ToolCard';
import "./ToolCatalogGrid.css"
import type { Tool } from '../../../../types/tool';

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