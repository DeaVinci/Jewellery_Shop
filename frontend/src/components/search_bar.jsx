import React, { useCallback, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import SearchResultsPage from "../pages/search_results_page";

// Debounce to avoid frequent api calls
export const debounce = (func, waitFor) => {
    let timeout = null;

    const debounced = (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => func(...args), waitFor);
    };

    return debounced;
};

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // debounce the function so that we send api calls once user stops typing
    const searchSomething = useCallback(
        debounce(async (value) => {
            try {
                const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/bizuteria/product?name=${value}`)
                setSearchResults(response.data)
                setError(null);
                // Przekierowanie do strony wyników wyszukiwania po uzyskaniu odpowiedzi
                navigate("/search");
            } catch (error) {
                console.log(error);
                setError("Wystąpił błąd podczas wyszukiwania.");
            }
        }, 500),
        [navigate]
    );

    const handleSearch = (e) => {
        e.preventDefault(); // Zapobiegaj domyślnemu zachowaniu formularza
        searchSomething(searchQuery);
    };

    return (
        <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" aria-label="Search" value={searchQuery} onChange={(e) => {
                    setSearchQuery(e.target.value);
                    //searchSomething(e.target.value);
                }} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Szukaj" required />
                <button onClick={handleSearch} type="button" className="text-black absolute end-2.5 bottom-2.5 bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Szukaj</button>
            </div>
        </form>
    );
};

export default SearchBar;
