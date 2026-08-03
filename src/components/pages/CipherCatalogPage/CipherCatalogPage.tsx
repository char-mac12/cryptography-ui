import CipherCatalogGrid from "./CipherCatalogGrid/CipherCatalogGrid"
import CipherCatalogLegend from "./CipherCatalogLegend/CipherCatalogLegend"
import "./CipherCatalogPage.css"
import SearchPanel from "./SearchPanel/SearchPanel"

function CipherCatalogPage() {
    return (
        <section className="cipher-catalog">
            {/* <aside className="sidebar">
                <CipherSidebar />
            </aside> */}
            <main>
                <SearchPanel />
                <CipherCatalogGrid />
                <CipherCatalogLegend />
            </main>
        </section>
    )
}

export default CipherCatalogPage