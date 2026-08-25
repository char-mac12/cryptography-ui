import './SearchBar.css'

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
    return <div className="search-bar">
        <span className="search-icon">⌕</span>

        <input
            type="text"
            placeholder="Search ciphers..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />

        {value && (
            <button 
                className="cancel-search"
                onClick={() => onChange("")}
            >
                X
            </button>
        )}
    </div>
}

export default SearchBar