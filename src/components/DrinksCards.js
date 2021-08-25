import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function DrinksCards({ drinks }) {
  const cardLimit = 12;
  return (
    <div>
      {
        drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          index < cardLimit
            ? (
              <Link key={ index } to={ `/bebidas/${idDrink}` }>
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ strDrinkThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                  <p data-testid={ `${index}-card-name` }>{strDrink}</p>
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
