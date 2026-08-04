import { useNavigate, useParams } from "react-router-dom";
import { ciphers } from '../../../data/ciphers'
import CipherSelector from './CipherSelector/CipherSelector'
import CipherTool from './CipherTool/CipherTool'
import ReferencePanel from './ReferencePanel/ReferencePanel'
import './WorkshopPage.css'

function WorkshopPage() {   
    const { cipherId } = useParams();
    const navigate = useNavigate();
    
    const selectedCipher = ciphers.find(
        (cipher) => cipher.id === cipherId
    );

    if (!selectedCipher) {
        return <p>Cipher not found</p>
    }

    return (
        <section className="workshop-page">
            <div className="workshop-content">
                <div className="workshop-main">
                    <h1>Workshop</h1>
                    <CipherSelector
                        selectedCipherId={cipherId ?? ""}
                        setSelectedCipherId={(id) => navigate(`/workshop/${id}`)}
                    />
                    {selectedCipher && (
                        <CipherTool cipher={selectedCipher} />
                    )}
                </div>
            </div>
            <ReferencePanel />
        </section>
    )
}

export default WorkshopPage