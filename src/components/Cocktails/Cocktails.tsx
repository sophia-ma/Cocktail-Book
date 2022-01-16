import React from 'react';
import { Cocktail } from '../../interfaces';
import './Cocktails.scss';

export interface CocktailsProps {
    cocktails: Cocktail[];
}

export function Cocktails({ cocktails }: CocktailsProps) {
    const createArrayFromProperties = (cocktail: Cocktail, propertyName: string, arr: string[]) => {
        for (const [key, value] of Object.entries(cocktail)) {
            if (key.startsWith(propertyName) && value) {
                const index = Number(key.slice(-1));

                arr[index - 1] = arr[index - 1] ? `${arr[index - 1]} ${value}` : value;
            }
        }
    };

    const renderIngredients = (cocktail: Cocktail) => {
        const ingredients: string[] = [];

        createArrayFromProperties(cocktail, 'strMeasure', ingredients);
        createArrayFromProperties(cocktail, 'strIngredient', ingredients);

        return ingredients.map((item) => <li key={item}>{item}</li>);
    };

    return (
        <div className="cocktails">
            {cocktails?.map((cocktail) => (
                <div className="cocktails__card card bg-success mb-4" key={cocktail.idDrink}>
                    <div className="card-header fs-2">{cocktail?.strDrink}</div>

                    <div className="cocktails__card-body card-body">
                        <img className="cocktails__image" src={cocktail?.strDrinkThumb} alt={cocktail?.strDrink} />

                        <div className="cocktails__card-info">
                            <h3 className="card-text">Ingredients</h3>
                            <ul>{renderIngredients(cocktail)}</ul>

                            <h3 className="card-text">Recipe</h3>
                            <p className="card-text">{cocktail?.strInstructions}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
