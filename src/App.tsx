import { useState } from 'react'
import './App.css'
import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import NavBar from './components/layout/NavBar/NavBar'
// import CipherCatalog from './components/pages/CipherCatalogPage/CipherCatalogPage'
// import FrequencyAnalysisPage from './components/pages/FrequencyAnalysisPage/FrequencyAnalysisPage'
import CipherCatalogPage from './components/pages/CipherCatalogPage/CipherCatalogPage'
import WorkshopPage from './components/pages/WorkshopPage/WorkshopPage'
// import ReferencePage from './components/pages/ReferencePage/ReferencePage'

function App() {
    const [selectedPage, setSelectedPage] = useState("Cipher Catalog")

    function renderPage() {
        switch (selectedPage) {
            case "Cipher Catalog":
                return <CipherCatalogPage />
            case "Workshop":
                return <WorkshopPage />

    //         case "Frequency Analysis":
    //             return <FrequencyAnalysisPage />

    //         case "Reference":
    //             return <ReferencePage />

            default: 
                return <CipherCatalogPage />
        }
    }

  return (
      <div className="site">
          <Header />
          <NavBar
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
          />

          <main>
              {renderPage()}
          </main>

          <Footer />
      </div>
    )
}

export default App
