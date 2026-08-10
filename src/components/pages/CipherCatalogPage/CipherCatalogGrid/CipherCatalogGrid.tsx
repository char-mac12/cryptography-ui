import CipherCard from './CipherCard/CipherCard';
import "./CipherCatalogGrid.css"
import type { Tool } from '../../../../types/Tool';

function CipherCatalogGrid({ ciphers }: { ciphers: Tool[] }) {
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