import React from "react";

const Search = ({searchfield, searchChange})=>{
    return(
        <div className="search-container">
        <input className="searchbar"
         type='search' placeholder="Search Exoplanets"
        onChange={searchChange} />
        </div>
    );

}

export default Search;