import ResultsCount from "./ResultsCount/ResultsCount"
import SearchBar from "./SearchBar/SearchBar"
import SidebarToggleButton from "./SidebarToggleButton/SidebarToggleButton"
import './SearchPanel.css'

type SearchPanelProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void
    results: number;
}

function SearchPanel({
    searchTerm,
    onSearchChange,
    results
}: SearchPanelProps) {
    return (
        <div className="search-panel">
            <SidebarToggleButton />
            <SearchBar 
                value={searchTerm}
                onChange={onSearchChange}
            />
            <ResultsCount results={results} />
        </div>
    )
}

export default SearchPanel