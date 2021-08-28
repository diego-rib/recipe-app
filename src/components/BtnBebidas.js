import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Explorar.css';

export default function BtnBebidas({ push }) {
  const [idProduto, setIdProduto] = useState({});

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setIdProduto(data.drinks[0]));
  });

  return (
    <div className="explore-btns-container">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        className="explorar-btn explore-drink-btn medium-font"
        onClick={ () => push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        className="explorar-btn explore-drink-btn medium-font"
        onClick={ () => push(`/bebidas/${idProduto.idDrink}`) }
      >
        Me Surpreenda!
      </button>

    </div>
  );
}

BtnBebidas.propTypes = {
  push: PropTypes.func,
}.isRequired;
