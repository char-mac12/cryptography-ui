import { useState } from 'react';
import './SearchBar.css'

function SearchBar() {
    const [searchText, setSearchText] = useState("");

    return <div className="search-bar">
        <span className="search-icon">⌕</span>

        <input
            type="text"
            placeholder="Search ciphers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />

        {searchText && (
            <button 
                className="cancel-search"
                onClick={() => setSearchText("")}
            >
                X
            </button>
        )}
    </div>
}

export default SearchBar