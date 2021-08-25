import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import '../styles/Detalhes.css';
import RecommendDrink from '../components/RecommendDrink';
import {
  checkDoneRecipes,
  checkInProgressMeals,
  checkFavorite } from '../services/localStorageChecks';
import { handleFavoriteMealBtn } from '../services/favoriteButton';
import getIngredients from '../services/getIngredients';

const copy = require('clipboard-copy');

export default function DetalhesComida({ match }) {
  const { id } = match.params;
  const [meal, setMeal] = useState({});
  const [isFavorite, setFavorite] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [copied, setCopied] = useState(false);
  const cardLimit = 6;

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
            setMeal(data.meals[0]);
            setFavorite(checkFavorite(id));
          });
      });
  }, [id]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        response.json()
          .then(({ drinks }) => setRecommendations(drinks.slice(0, cardLimit)));
      });
  }, []);

  function handleShareBtn() {
    copy(window.location.href);
    setCopied(true);
    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  }

  const ingredients = getIngredients(meal);

  const loading = !meal.idMeal && recommendations.length > 0;

  const isDone = checkDoneRecipes(id);
  const btnMessage = checkInProgressMeals(id);

  return (
    loading
      ? <h1>Carregando....</h1>
      : (
        <div>
          <img
            data-testid="recipe-photo"
            alt=""
            src={ meal.strMealThumb }
            width="150px"
          />
          <p data-testid="recipe-title">{meal.strMeal}</p>
          { copied ? <p>Link copiado!</p> : null }
          <button
            type="button"
            onClick={ handleShareBtn }
          >
            <img
              data-testid="share-btn"
              alt="Toque para copiar o link da receita para o clipboard"
              src={ shareIcon }
            />
          </button>
          <button
            type="button"
            onClick={ () => {
              handleFavoriteMealBtn(isFavorite, meal);
              setFavorite(!isFavorite);
            } }
          >
            <img
              data-testid="favorite-btn"
              alt="Toque para favoritar esta receita"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
          <p data-testid="recipe-category">{meal.strCategory}</p>
          <div>
            <p>Ingredientes:</p>
            {
              ingredients.map((ingredient, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </p>
              ))
            }
          </div>
          <p data-testid="instructions">{meal.strInstructions}</p>
          <ReactPlayer data-testid="video" url={ meal.strYoutube } />
          <RecommendDrink items={ recommendations } />
          {
            isDone
              ? null
              : (
                <Link to={ `/comidas/${id}/in-progress` }>
                  <button
                    className="start-recipe-btn"
                    data-testid="start-recipe-btn"
                    type="button"
                  >
                    {btnMessage}
                  </button>
                </Link>
              )
          }
        </div>
      )
  );
}

DetalhesComida.propTypes = {
  match: {
    params: {
      id: PropTypes.number,
    },
  },
}.isRequired;
