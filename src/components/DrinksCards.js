import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/RecipeCards.css';

export default function DrinksCards({ drinks }) {
  const cardLimit = 12;
  return (
    <div className="cards-container">
      {
        drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          index < cardLimit
            ? (
              <Link
                key={ index }
                to={ `/bebidas/${idDrink}` }
                className="recipe-container"
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  className="recipe-card"
                >
                  <img
                    src={ strDrinkThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                    className="recipe-img"
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                    className="recipe-title"
                  >
                    {strDrink}
                  </p>
                </div>
              </Link>
            )
            : null
        ))
      }
    </div>
  );
}

DrinksCards.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
