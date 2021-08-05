import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDrinkDetail } from '../services/theCockTailAPI';
import { getMealRecomendations } from '../services/theMealAPI';
import shareIcon from '../images/shareIcon.svg';
import Recommendations from '../components/Recommendations';
import VerifyStart from '../components/VerifyStart';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveFavorites } from '../helpers/handleLocalStorage';

const DrinkDetails = (props) => {
  const [drinkData, setdrinkData] = useState([]);
  const [recomendedFood, setRecomendedFood] = useState([]);
  const [copy, setCopy] = useState(false);
  const favoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ) || [{ id: '' }];
  const [lsFavorite, setLsFavorite] = useState(favoriteRecipes);
  const { match: { params: { id } } } = props;

  const maxResult = 6;

  useEffect(() => {
    const getDataDrinkDetail = async () => {
      const data = await getDrinkDetail(id);
      setdrinkData(...data);
    };
    getDataDrinkDetail();
  }, [id]);

  useEffect(() => {
    const fetchRecomended = async () => {
      const recomendedArray = await getMealRecomendations();
      setRecomendedFood(recomendedArray);
    };
    fetchRecomended();
  }, []);

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = drinkData;
  const maxIngredients = 20;

  function shareLink() {
    setCopy(true);
    return navigator.clipboard.writeText(window.location.href);
  }

  function setFavorites() {
    const recipe = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    saveFavorites(recipe);
    setLsFavorite(JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [{ id: '' }]);
  }

  function listIngredients() {
    const list = [];
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (drinkData[`strIngredient${index}`]) {
        list.push(
          `${drinkData[`strIngredient${index}`]} - ${drinkData[`strMeasure${index}`]}`,
        );
      }
    }
    return list;
  }

  function renderDetails() {
    return (
      <section>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h2 data-testid="recipe-title">{ strDrink }</h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => shareLink() }
        >
          {copy ? (
            <span>Link copiado!</span>
          ) : (<img src={ shareIcon } alt="Compartilhar" />)}
        </button>
        <button type="button" onClick={ setFavorites }>
          <img
            src={ lsFavorite.some(
              (favorite) => favorite.id === id,
            ) ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
            data-testid="favorite-btn"
          />
        </button>
        <h4 data-testid="recipe-category">{ `${strCategory} | ${strAlcoholic}` }</h4>
        <ol>

          {
            listIngredients().map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredient}` }
              </li>
            ))
          }
        </ol>
        <p data-testid="instructions">{strInstructions}</p>
        <Recommendations recommendations={ recomendedFood.slice(0, maxResult) } />
        <VerifyStart id={ id } />
      </section>
    );
  }

  return (
    <div>{ drinkData && renderDetails() }</div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape(PropTypes.any).isRequired,
};

export default DrinkDetails;