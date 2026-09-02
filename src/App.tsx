import './App.css'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import NavBar from './components/layout/NavBar/NavBar'

import ToolCatalogPage from './components/pages/ToolCatalogPage/ToolCatalogPage'
import WorkshopPage from './components/pages/WorkshopPage/WorkshopPage'
import ReferencePage from './components/pages/ReferencePage/ReferencePage'
import DetectorPage from './components/pages/DetectorPage/DetectorPage'
import AnalysisPage from './components/pages/AnalysisPage/AnalysisPage'
import TimelinePage from './components/pages/ReferencePage/TimelinePage/TimelinePage'
import DefinitionsPage from './components/pages/ReferencePage/DefinitionsPage/DefinitionsPage'
import TablesPage from './components/pages/ReferencePage/TablesPage/TablesPage'

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
                            element={<ToolCatalogPage />} 
                        />

                        <Route 
                            path="/workshop/:toolId" 
                            element={<WorkshopPage />} 
                        />

                        <Route 
                            path="/analysis/:analysisId"
                            element={<AnalysisPage />}
                        />

                        <Route 
                            path="/detector"
                            element={<DetectorPage />}
                        />

                        <Route 
                            path="/reference" 
                            element={<ReferencePage />} 
                        />

                        <Route 
                            path="/reference/timeline"
                            element={<TimelinePage />}
                        />

                        <Route 
                            path="/reference/definitions"
                            element={<DefinitionsPage />}
                        />

                        <Route 
                            path="/reference/tables"
                            element={<TablesPage />}
                        />

                        <Route 
                            path="*" 
                            element={<ToolCatalogPage />} 
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </HashRouter>
    )
}

export default App