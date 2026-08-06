import ModeSelector from '../../Shared/ModeSelector/ModeSelector';

type CipherMode = "encrypt" | "decrypt";

type CipherModeSelectorProps = {
    mode: CipherMode;
    setMode: (mode: CipherMode) => void;
};

function CipherModeSelector({
    mode,
    setMode
}: CipherModeSelectorProps) {
    return (
        <ModeSelector
            mode={mode}
            setMode={setMode}
            options={[
                { value: "encrypt", label: "Encrypt" },
                { value: "decrypt", label: "Decrypt" }
            ]}
        />
    );
}

export default CipherModeSelector;