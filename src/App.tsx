import React, { useCallback, useEffect, useState } from 'react';
import { Cocktails } from './components';
import { Cocktail } from './interfaces';
import './App.scss';

function App() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const cocktailsApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

    const getRandomCocktails = (array: [], size: number) => array?.sort(() => 0.5 - Math.random()).slice(0, size);

    const fetchCocktails = useCallback(
        (queryParam: string = ' ', size = 3) => {
            fetch(`${cocktailsApiUrl}${queryParam}`)
                .then((res) => res.json())
                .then((response) => {
                    setCocktails(getRandomCocktails(response?.drinks, size));
                });
        },
        [cocktailsApiUrl],
    );

    useEffect(() => {
        fetchCocktails();
    }, [fetchCocktails]);

    const onSearchChange = (newSearchTerm: string) => setSearchTerm(newSearchTerm);

    const onSearchClick = () => fetchCocktails(searchTerm, 10);

    const renderNav = () => (
        <nav className="app__nav bg-primary d-flex">
            <input className="form-control me-2" type="text" placeholder="Search" onChange={(e) => onSearchChange(e.target.value)} />
            <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={onSearchClick}>
                Search
            </button>
        </nav>
    );

    return (
        <div className="app">
            <h1 className="app__title">The Cocktails Book</h1>

            {renderNav()}

            <Cocktails cocktails={cocktails} />
        </div>
    );
}

export default App;
