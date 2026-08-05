import { useState } from "react";
import CipherCatalogGrid from "./CipherCatalogGrid/CipherCatalogGrid"
import CipherCatalogLegend from "./CipherCatalogLegend/CipherCatalogLegend"
import "./CipherCatalogPage.css"
import SearchPanel from "./SearchPanel/SearchPanel"
import { ciphers } from "../../../data/ciphers";

function CipherCatalogPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCiphers = ciphers.filter(cipher => 
        cipher.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="cipher-catalog">
            {/* <aside className="sidebar">
                <CipherSidebar />
            </aside> */}
            <main>
                <SearchPanel 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    results={filteredCiphers.length}
                />
                
                <CipherCatalogGrid ciphers={filteredCiphers}/>
                
                <CipherCatalogLegend />
            </main>
        </section>
    )
}

export default CipherCatalogPage