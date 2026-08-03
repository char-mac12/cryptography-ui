import { useState } from 'react'
import { ciphers } from '../../../data/ciphers'
import CipherSelector from './CipherSelector/CipherSelector'
import CipherTool from './CipherTool/CipherTool'
import ReferencePanel from './ReferencePanel/ReferencePanel'
import './WorkshopPage.css'

function WorkshopPage() {
    const [selectedCipherId, setSelectedCipherId] = useState("caesar")
    
    const selectedCipher = ciphers.find(
        (cipher) => cipher.id === selectedCipherId
    );

    return (
        <div className="workshop-page">
            <div className="workshop-content">
                <div className="workshop-main">
                    <h1>Workshop</h1>
                    <CipherSelector
                        selectedCipherId={selectedCipherId}
                        setSelectedCipherId={setSelectedCipherId}
                    />
                    {selectedCipher && (
                        <CipherTool cipher={selectedCipher} />
                    )}
                </div>
            </div>
            <ReferencePanel />
        </div>
    )
}

export default WorkshopPage