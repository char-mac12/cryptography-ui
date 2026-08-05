import { ciphers } from '../../../../data/ciphers';
import './CipherSelector.css'

type CipherSelectorProps = {
    selectedCipherId: string;
    setSelectedCipherId: (id: string) => void;
};

function CipherSelector(
    {
        selectedCipherId, 
        setSelectedCipherId
    } : CipherSelectorProps) {
    return (
        <div className="cipher-selector-container">
            <select
                className="cipher-selector"
                name="ciphers"
                id="ciphers"
                value={selectedCipherId}
                onChange={(e) => setSelectedCipherId(e.target.value)}
            >
                {ciphers.map((cipher) => (
                    <option
                        key={cipher.id}
                        value={cipher.id}
                    >
                        {cipher.title}
                    </option>
                ))}
            </select>
            <span className="cipher-selector-arrow">
                ❯
            </span>
        </div>
    )
}

export default CipherSelector