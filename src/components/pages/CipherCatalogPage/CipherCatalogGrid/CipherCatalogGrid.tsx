import CipherCard from './CipherCard/CipherCard';
import { ciphers } from '../../../../data/ciphers';
import "./CipherCatalogGrid.css"

function CipherCatalogGrid() {
  return (
    <div className="cipher-grid">
      {ciphers.map((cipher) => (
        <CipherCard
          key={cipher.id}
          cipher={cipher}
        />
      ))}
    </div>
  );
}

export default CipherCatalogGrid;