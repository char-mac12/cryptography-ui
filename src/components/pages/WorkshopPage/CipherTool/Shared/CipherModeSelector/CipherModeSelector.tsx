import './CipherModeSelector.css'

type CipherMode = 'encrypt' | 'decrypt';

type CipherModeSelectorProps = {
    mode: CipherMode;
    setMode: (mode: CipherMode) => void;
}

function CipherModeSelector({ mode, setMode }: CipherModeSelectorProps) {
    return (
        <div className="cipher-mode-selector">
            <button 
                className={mode === 'encrypt' ? 'active' : ''}
                onClick={() => setMode('encrypt')}
            >
                Encrypt
            </button>
            <button 
                className={mode === 'decrypt' ? 'active' : ''}
                onClick={() => setMode('decrypt')}
            >
                Decrypt
            </button>
        </div>
    )
}

export default CipherModeSelector