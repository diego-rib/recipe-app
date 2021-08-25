import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Recommendations.css';

export default function RecommendMeal({ items }) {
  return (
    <div className="carousel">
      {
        items.map(({ strMeal, strMealThumb }, index) => (
          <div
            className="item-carousel"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              alt=""
              src={ strMealThumb }
            />
            <p data-testid={ `${index}-recomendation-title` }>{strMeal}</p>
          </div>
        ))
      }
    </div>
  );
}

RecommendMeal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
