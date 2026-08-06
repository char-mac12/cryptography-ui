import './ModeSelector.css'

type ModeSelectorProps<T extends string> = {
    mode: T;
    setMode: (mode: T) => void;
    options: {
        value: T;
        label: string;
    }[];
};

function ModeSelector<T extends string>({
    mode,
    setMode,
    options,
}: ModeSelectorProps<T>) {
    return (
        <div className="mode-selector">
            {options.map(option => (
                <button
                    key={option.value}
                    className={mode === option.value ? "active" : ""}
                    onClick={() => setMode(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default ModeSelector;