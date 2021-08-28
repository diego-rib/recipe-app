import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Explorar.css';

export default function BtnComidas({ push }) {
  const [idProduto, setIdProduto] = useState({});

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setIdProduto(data.meals[0]));
  });

  return (
    <div className="explore-btns-container">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        className="explorar-btn explore-food-btn medium-font"
        onClick={ () => push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        className="explorar-btn explore-food-btn medium-font"
        onClick={ () => push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        className="explorar-btn explore-food-btn medium-font"
        onClick={ () => push(`/comidas/${idProduto.idMeal}`) }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

BtnComidas.propTypes = {
  push: PropTypes.func,
}.isRequired;
