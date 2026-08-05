import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import NavBar from './components/layout/NavBar/NavBar'

import CipherCatalogPage from './components/pages/CipherCatalogPage/CipherCatalogPage'
import WorkshopPage from './components/pages/WorkshopPage/WorkshopPage'
import FrequencyAnalysisPage from './components/pages/FrequencyAnalysisPage/FrequencyAnalysisPage'
import ReferencePage from './components/pages/ReferencePage/ReferencePage'

function App() {
    return (
        <BrowserRouter basename="/cryptography-ui">
            <div className="site">
                <Header />

                <NavBar />

                <main>
                    <Routes>
                        <Route 
                            path="/catalog" 
                            element={<CipherCatalogPage />} 
                        />

                        <Route 
                            path="/workshop/:cipherId" 
                            element={<WorkshopPage />} 
                        />

                        <Route 
                            path="/frequency" 
                            element={<FrequencyAnalysisPage />} 
                        />

                        <Route 
                            path="/reference" 
                            element={<ReferencePage />} 
                        />

                        <Route 
                            path="*" 
                            element={<CipherCatalogPage />} 
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App