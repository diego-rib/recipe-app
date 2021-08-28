import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/RecipeCards.css';

export default function MealsCards({ meals }) {
  const cardLimit = 12;
  return (
    <div className="cards-container">
      {
        meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
          index < cardLimit
            ? (
              <Link
                key={ index }
                to={ `/comidas/${idMeal}` }
                className="recipe-container"
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  className="recipe-card"
                >
                  <img
                    src={ strMealThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                    className="recipe-img"
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                    className="recipe-title"
                  >
                    {strMeal}
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

MealsCards.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
