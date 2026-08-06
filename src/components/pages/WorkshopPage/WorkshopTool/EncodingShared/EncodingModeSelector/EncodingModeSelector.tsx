import ModeSelector from "../../Shared/ModeSelector/ModeSelector";

type EncodingMode = "encode" | "decode";

type EncodingModeSelectorProps = {
    mode: EncodingMode;
    setMode: (mode: EncodingMode) => void;
};

function EncodingModeSelector({
    mode,
    setMode
}: EncodingModeSelectorProps) {
    return (
        <ModeSelector
            mode={mode}
            setMode={setMode}
            options={[
                { value: "encode", label: "Encode" },
                { value: "decode", label: "Decode" }
            ]}
        />
    );
}

export default EncodingModeSelector;