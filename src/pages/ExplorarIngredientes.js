import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import recipesContext from '../provider/recipesContext';

import getImage from '../services/requestImage';
import {
  fetchIngredients,
  requestByMainIngredient,
} from '../services/requestIngredients';

import '../styles/Explorar.css';

export default function ExplorarIngredientes() {
  const { setSearchResults, setUpdate, setLoading } = useContext(recipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loadingIngredient, setLoadingIngredient] = useState(true);

  const { pathname } = window.location;
  let domain = 'cocktail';
  let key = 'drinks';
  let ingredientKey = 'strIngredient1';
  if (pathname.match(/comidas/i)) {
    domain = 'meal';
    key = 'meals';
    ingredientKey = 'strIngredient';
  }

  useEffect(() => {
    setLoadingIngredient(true);
    fetchIngredients(domain, key)
      .then((data) => {
        setIngredients(data);
        setLoadingIngredient(false);
      });
  }, [domain, key]);

  function handleClick(ingredient) {
    setRedirect(true);
    setUpdate(false);
    setLoading(true);
    requestByMainIngredient(domain, ingredient)
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      });
  }

  let redirectPage = <Redirect to="/bebidas" />;
  if (domain === 'meal') redirectPage = <Redirect to="/comidas" />;
  return (
    <div>
      { redirect ? redirectPage : null }
      <Header title="Explorar Ingredientes" showButton={ false } />
      <div className="explore-btns-container">
        { loadingIngredient && <Loading /> }
        {
          !loadingIngredient && ingredients.map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(ingredient[ingredientKey]) }
              className="explorar-btn explore-ingredient"
            >
              <img
                alt=""
                src={ getImage(domain, ingredient[ingredientKey]) }
                data-testid={ `${index}-card-img` }
                className="explore-ingredient-img"
              />
              <p data-testid={ `${index}-card-name` }>{ingredient[ingredientKey]}</p>
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
