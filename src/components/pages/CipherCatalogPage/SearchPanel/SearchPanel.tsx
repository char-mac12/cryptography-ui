import ResultsCount from "./ResultsCount/ResultsCount"
import SearchBar from "./SearchBar/SearchBar"
import SidebarToggleButton from "./SidebarToggleButton/SidebarToggleButton"
import './SearchPanel.css'

function SearchPanel() {
    return (
        <div className="search-panel">
            <SidebarToggleButton />
            <SearchBar />
            <ResultsCount results={13} />
        </div>
    )
}

export default SearchPanel