import CipherCard from './CipherCard/CipherCard';
import "./CipherCatalogGrid.css"
import type { Cipher } from '../../../../types/Tool';

function CipherCatalogGrid({ ciphers }: { ciphers: Cipher[] }) {
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