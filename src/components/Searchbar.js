import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import recipesContext from '../provider/recipesContext';

import '../styles/Searchbar.css';

function Searchbar() {
  const [inputRadio, setInputRadio] = useState('');
  const [searchBar, setSearchbar] = useState('');
  const { type, searchResults, setSearchResults } = useContext(recipesContext);

  let page = 'bebidas';
  let key = 'drinks';
  let itemKey = 'idDrink';
  if (type === 'meal') {
    page = 'comidas';
    key = 'meals';
    itemKey = 'idMeal';
  }

  function endPoint(value = '') {
    if (inputRadio === 'ingredient') {
      return `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${value}`;
    }
    if (inputRadio === 'name') {
      return `https://www.the${type}db.com/api/json/v1/1/search.php?s=${value}`;
    }
    if (inputRadio === 'firstWord' && searchBar.length > 1) {
      return 'error';
    }
    return `https://www.the${type}db.com/api/json/v1/1/search.php?f=${value}`;
  }

  function fetchApi() {
    const url = endPoint(searchBar);
    if (url === 'error') {
      // eslint-disable-next-line no-alert
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    fetch(url).then((response) => response.json()).then(
      (json) => (json[key] === null ? (
        // eslint-disable-next-line no-alert
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      ) : setSearchResults(json)),
    );
  }

  let resultSize = 0;
  if (searchResults[key]) {
    resultSize = searchResults[key].length;
  }

  return (
    <form className="searchbar-wrapper">
      { resultSize === 1 ? (
        <Redirect to={ `/${page}/${searchResults[key][0][itemKey]}` } />
      ) : null }
      <input
        onChange={ ({ target }) => setSearchbar(target.value) }
        type="text"
        className="searchbar-input"
        data-testid="search-input"
      />
      <div className="radio-btns-wrapper">
        <label htmlFor="radio-input">
          <input
            onClick={ ({ target }) => setInputRadio(target.value) }
            id="radio-input"
            name="radio-input"
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            className="radio-btn"
          />
          Ingrediente
        </label>
        <label htmlFor="radio-input-1">
          <input
            onClick={ ({ target }) => setInputRadio(target.value) }
            id="radio-input-1"
            name="radio-input"
            type="radio"
            value="name"
            data-testid="name-search-radio"
            className="radio-btn"
          />
          Nome
        </label>
        <label htmlFor="radio-input-2">
          <input
            onClick={ ({ target }) => setInputRadio(target.value) }
            id="radio-input-2"
            name="radio-input"
            type="radio"
            value="firstWord"
            data-testid="first-letter-search-radio"
            className="radio-btn"
          />
          Primeira letra
        </label>
      </div>
      <button
        onClick={ () => fetchApi() }
        type="button"
        className="btn search-btn"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </form>
  );
}

export default Searchbar;
