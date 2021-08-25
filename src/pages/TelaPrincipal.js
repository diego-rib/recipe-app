import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import getCategories from '../services/getCategories';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import DrinksCards from '../components/DrinksCards';
import MenuInferior from '../components/MenuInferior';

import recipesContext from '../provider/recipesContext';

export default function TelaPrincipal() {
  const {
    handleCategory,
    searchResults,
    setType,
    setUpdate,
    update } = useContext(recipesContext);

  const [categories, setCategories] = useState([]);

  const { pathname } = window.location;
  const type = pathname === '/bebidas' ? 'cocktail' : 'meal';

  const shouldFetch = useRef(update);
  useEffect(() => {
    if (shouldFetch) {
      const fetchCategories = async () => {
        const response = await getCategories(type);
        if (type === 'meal') setCategories(response.meals);
        else setCategories(response.drinks);
      };
      setType(type);
      fetchCategories();
    }
    return () => {
      setUpdate(true);
    };
  }, [type, setType, setUpdate]);

  let data = [];
  if (searchResults.meals) data = searchResults.meals;
  if (searchResults.drinks) data = searchResults.drinks;

  const categoryLimit = 5;
  return (
    <div>
      <Header
        title={ type === 'meal' ? 'Comidas' : 'Bebidas' }
        showButton
      />
      <div>
        <button
          type="button"
          onClick={ () => handleCategory(type, '') }
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          categories.map(({ strCategory }, index) => (
            index < categoryLimit
              ? (
                <button
                  type="button"
                  key={ strCategory }
                  onClick={ () => handleCategory(type, strCategory) }
                  data-testid={ `${strCategory}-category-filter` }
                >
                  {strCategory}
                </button>
              )
              : null
          ))
        }
      </div>
      {
        type === 'meal'
          ? <MealsCards meals={ data } cardLimit={ 12 } />
          : <DrinksCards drinks={ data } cardLimit={ 12 } />
      }
      <MenuInferior />
    </div>
  );
}

TelaPrincipal.propTypes = {
  type: PropTypes.string,
}.isRequired;
