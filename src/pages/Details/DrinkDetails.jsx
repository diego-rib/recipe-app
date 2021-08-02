import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './DrinkDetails.module.css';

function DrinkDetails({ match }) {
  const [drinks, setDrinks] = useState({});
  const [foodRecomendation, setRecomendation] = useState([]);
  const { id } = match.params;
  const mN = 6;
  React.useEffect(() => {
    const fetchDrink = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setDrinks(data.drinks[0]));
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecomendation(data.meals.filter((_, index) => index < mN)));
    };
    fetchDrink();
  }, [id]);

  console.log(foodRecomendation);
  if (Object.keys(drinks).length === 0) {
    return (<h1>Carregando...</h1>);
  }
  const ingredients = Object.keys(drinks)
    .filter((item) => item.includes('Ingredient'))
    .filter((item) => drinks[item]).map((item) => drinks[item]);

  const measures = Object.keys(drinks)
    .filter((item) => item.includes('Measure'))
    .filter((item) => drinks[item]).map((item) => drinks[item]);
  return (
    <div>

      <img
        src={ drinks.strDrinkThumb }
        alt="recipe"
        style={ { width: '200px' } }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { drinks.strDrink }
      </h1>

      <p
        data-testid="recipe-category"
      >
        { drinks.strCategory }
        &nbsp; - &nbsp;
        { drinks.strAlcoholic }
      </p>
      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favorite
      </button>
      <h1>Instruções</h1>
      <p
        data-testid="instructions"
      >
        { drinks.strInstructions }
      </p>
      <h1>Ingredientes</h1>
      {ingredients.map((item, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ item }
        >
          {item}
          &nbsp; - &nbsp;
          { measures[index] }
        </p>
      ))}
      <h1>Recomendação</h1>
      <div
        className={ styles.carousel }
      >
        {foodRecomendation && foodRecomendation.map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className={ styles.carouselItemDiv }
          >
            <img
              src={ item.strMealThumb }
              alt="recipe"
              className={ styles.carouselImg }
            />
            <p>{ item.strCategory }</p>
            <h5
              data-testid={ `${index}-recomendation-title` }
            >
              { item.strMeal }
            </h5>
          </div>
        ))}
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className={ styles.startRecipeBttn }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkDetails;
