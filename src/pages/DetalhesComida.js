import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import { RiArrowGoBackFill as GoBackBtn } from 'react-icons/ri';
import Loading from '../components/Loading';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import RecommendDrink from '../components/RecommendDrink';
import {
  checkDoneRecipes,
  checkInProgressMeals,
  checkFavorite } from '../services/localStorageChecks';
import { handleFavoriteMealBtn } from '../services/favoriteButton';
import getIngredients from '../services/getIngredients';

import '../styles/RecipeDetails.css';

const copy = require('clipboard-copy');

export default function DetalhesComida({ match, history }) {
  const { id } = match.params;
  const [meal, setMeal] = useState({});
  const [isFavorite, setFavorite] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loadingRecommends, setLoadingRecommends] = useState(true);
  const [loading, setLoading] = useState(true);
  const cardLimit = 6;

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    setLoading(true);
    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
            setMeal(data.meals[0]);
            setFavorite(checkFavorite(id));
            setLoading(false);
          });
      });
  }, [id]);

  useEffect(() => {
    setLoadingRecommends(true);
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        response.json()
          .then(({ drinks }) => {
            setRecommendations(drinks.slice(0, cardLimit));
            setLoadingRecommends(false);
          });
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

  const isDone = checkDoneRecipes(id);
  const btnMessage = checkInProgressMeals(id);

  return (
    loading
      ? (
        <Loading />
      )
      : (
        <div className="recipe-details-page">
          <button
            type="button"
            className="go-home-button"
            onClick={ () => history.push('/comidas') }
          >
            <GoBackBtn size="1.5em" />
          </button>
          <img
            data-testid="recipe-photo"
            alt=""
            src={ meal.strMealThumb }
            className="details-img"
          />
          <p
            data-testid="recipe-title"
            className="details-title"
          >
            {meal.strMeal}
          </p>
          <div className="title-interactions-wrapper">
            <p
              data-testid="recipe-category"
              className="details-category"
            >
              {meal.strCategory}
            </p>
            { copied ? <p className="link-warning">Link copiado!</p> : null }
            <div>
              <button
                type="button"
                onClick={ handleShareBtn }
                className="interaction-btn"
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
                className="interaction-btn"
              >
                <img
                  data-testid="favorite-btn"
                  alt="Toque para favoritar esta receita"
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                />
              </button>
            </div>
          </div>
          <div className="details-section-container">
            <p className="details-section-title">Ingredientes:</p>
            <div className="details-section-list">
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
          </div>
          <div className="details-section-container">
            <p className="details-section-title">Instruções</p>
            <p
              data-testid="instructions"
              className="details-section-list"
            >
              {meal.strInstructions}
            </p>
          </div>
          <div className="details-video">
            <ReactPlayer
              data-testid="video"
              url={ meal.strYoutube }
              width="100%"
            />
          </div>
          { loadingRecommends
            ? <Loading />
            : <RecommendDrink items={ recommendations } /> }
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
          <div className="clear-start-recipe-btn" />
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
