import './App.css'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import NavBar from './components/layout/NavBar/NavBar'

import CipherCatalogPage from './components/pages/CipherCatalogPage/CipherCatalogPage'
import WorkshopPage from './components/pages/WorkshopPage/WorkshopPage'
import FrequencyAnalysisPage from './components/pages/FrequencyAnalysisPage/FrequencyAnalysisPage'
import ReferencePage from './components/pages/ReferencePage/ReferencePage'
import DetectorPage from './components/pages/DetectorPage/DetectorPage'

function App() {
    return (
        <HashRouter>
            <div className="site">
                <Header />

                <NavBar />

                <main>
                    <Routes>
                        <Route 
                            path="/" 
                            element={<Navigate to="/catalog" replace />} 
                        />
                        <Route 
                            path="/catalog" 
                            element={<CipherCatalogPage />} 
                        />

                        <Route 
                            path="/workshop/:toolId" 
                            element={<WorkshopPage />} 
                        />

                        <Route 
                            path="/detector"
                            element={<DetectorPage />}
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
        </HashRouter>
    )
}

export default App