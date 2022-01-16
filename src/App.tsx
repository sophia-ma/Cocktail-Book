import React, { useEffect, useState } from 'react';
import { Cocktail } from './interfaces';
import './App.scss';

function App() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const cocktailsApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

    const getThreeRandomCocktails = (array: []) => array?.sort(() => 0.5 - Math.random()).slice(0, 3);

    useEffect(() => {
        fetchCocktails('z');
    }, []);

    const fetchCocktails = (queryParam: string) => {
        fetch(`${cocktailsApiUrl}${queryParam}`)
            .then((res) => res.json())
            .then((response) => {
                setCocktails(getThreeRandomCocktails(response?.drinks));
            });
    };

    const onSearchChange = (newSearchTerm: string) => setSearchTerm(newSearchTerm);

    const onSearchClick = () => fetchCocktails(searchTerm);

    useEffect(() => {
        console.log('%c⧭', 'color: #00a3cc', cocktails);
    }, [cocktails]);

    return (
        <div className="app">
            <h1 className="app__title">The Cocktails Book</h1>

            <nav className="app__nav bg-primary d-flex">
                <input className="form-control me-2" type="text" placeholder="Search" onChange={(e) => onSearchChange(e.target.value)} />
                <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={onSearchClick}>
                    Search
                </button>
            </nav>
        </div>
    );
}

export default App;
