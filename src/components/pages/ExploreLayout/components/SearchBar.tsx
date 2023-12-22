import { Search } from "lucide-react";
import "./SearchBar.css"

const SearchBar = () => {
    return ( 
        <div className="search-and-filter">
            <div className="searchbar">
                <div className="search">
                    <input type="text" />
                    <button><Search /></button>
                </div>
            </div>
            <div className="filter">
                <button>filter</button>
            </div>
        </div>
     );
}
 
export default SearchBar;