import React from "react";

const SearchResultsPage = ({ searchResults }) => {
    return (
        <div className="search-results">
            <h1>Wyniki wyszukiwania</h1>
            {searchResults && searchResults.results && searchResults.results.length > 0 ? (
                <div>
                    {searchResults.results.map(result => (
                        <div key={result.id}>
                            <h2>{result.name}</h2>
                            <p>{result.short_description}</p>
                            <p>Cena: {result.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Nie znaleziono wyników wyszukiwania.</div>
            )}
        </div>
    );
};

export default SearchResultsPage;
