import { useState } from "react";
import ToolCatalogGrid from "./ToolCatalogGrid/ToolCatalogGrid"
import ToolCatalogLegend from "./ToolCatalogLegend/ToolCatalogLegend"
import "./ToolCatalogPage.css"
import SearchPanel from "./SearchPanel/SearchPanel"
import { tools } from "../../../data/tools";

function ToolCatalogPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTools = tools.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="tool-catalog">
            {/* <aside className="sidebar">
                <ToolCatalogSidebar />
            </aside> */}
            <main>
                <SearchPanel 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    results={filteredTools.length}
                />
                
                <ToolCatalogGrid tools={filteredTools}/>
                
                <ToolCatalogLegend />
            </main>
        </section>
    )
}

export default ToolCatalogPage