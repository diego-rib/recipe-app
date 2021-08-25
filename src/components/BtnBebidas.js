import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BtnBebidas() {
  const [idProduto, setIdProduto] = useState({});

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setIdProduto(data.drinks[0]));
  });

  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${idProduto.idDrink}` }>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>

    </div>
  );
}
