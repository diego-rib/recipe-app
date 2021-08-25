import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import '../styles/Detalhes.css';
import RecommendMeal from '../components/RecommendMeal';
import {
  checkDoneRecipes,
  checkInProgressDrinks,
  checkFavorite } from '../services/localStorageChecks';
import { handleFavoriteDrinkBtn } from '../services/favoriteButton';
import getIngredients from '../services/getIngredients';

const copy = require('clipboard-copy');

export default function DetalhesBebida({ match }) {
  const { id } = match.params;
  const [drink, setDrink] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardLimit = 6;

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
            setDrink(data.drinks[0]);
            setFavorite(checkFavorite(id));
          });
      });
  }, [id]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        response.json()
          .then(({ meals }) => setRecommendations(meals.slice(0, cardLimit)));
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

  const ingredients = getIngredients(drink);

  const loading = !drink.idDrink && recommendations.length > 0;

  const isDone = checkDoneRecipes(id);
  const btnMessage = checkInProgressDrinks(id);

  return (
    loading
      ? <h1>Carregando....</h1>
      : (
        <div>
          <img
            data-testid="recipe-photo"
            alt=""
            src={ drink.strDrinkThumb }
            width="150px"
          />
          <p data-testid="recipe-title">{drink.strDrink}</p>
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
              handleFavoriteDrinkBtn(isFavorite, drink);
              setFavorite(!isFavorite);
            } }
          >
            <img
              data-testid="favorite-btn"
              alt="Toque para favoritar esta receita"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
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
          <p data-testid="instructions">{drink.strInstructions}</p>
          <RecommendMeal items={ recommendations } />
          {
            isDone
              ? null
              : (
                <Link to={ `/bebidas/${id}/in-progress` }>
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

DetalhesBebida.propTypes = {
  match: {
    params: {
      id: PropTypes.number,
    },
  },
}.isRequired;
