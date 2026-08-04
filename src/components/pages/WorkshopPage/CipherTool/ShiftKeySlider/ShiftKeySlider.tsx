import './ShiftKeySlider.css'

type ShiftKeySliderProps = {
    shift: number;
    setShift: (shift: number) => void;
}

function ShiftKeySlider({ shift, setShift }: ShiftKeySliderProps) {
    const from = "A";
    const to = String.fromCharCode(65 + shift);
    
    return (
        <div className="shift-key-slider">
            <label htmlFor="shift-slider">
                Shift (0 - 25)
            </label>
            <input
                id="shift-slider"
                type="range"
                min={0}
                max={25}
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
            />

            <div className="shift-info">
                <span className="shift-value">{shift} </span>
                <span className="shift-mapping">{from} → {to}</span>
            </div>
        </div>
    )
}

export default ShiftKeySlider