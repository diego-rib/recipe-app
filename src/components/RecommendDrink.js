import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Recommendations.css';

export default function RecommendDrink({ items }) {
  return (
    <div className="carousel">
      {
        items.map(({ strDrink, strDrinkThumb }, index) => (
          <div
            className="item-carousel"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              alt={ `Recomendação: ${strDrink} visto de frente` }
              src={ strDrinkThumb }
            />
            <p data-testid={ `${index}-recomendation-title` }>{strDrink}</p>
          </div>
        ))
      }
    </div>
  );
}

RecommendDrink.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
