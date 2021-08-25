import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MealsCards({ meals }) {
  const cardLimit = 12;
  return (
    <div>
      {
        meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
          index < cardLimit
            ? (
              <Link key={ index } to={ `/comidas/${idMeal}` }>
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ strMealThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                  <p data-testid={ `${index}-card-name` }>{strMeal}</p>
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
