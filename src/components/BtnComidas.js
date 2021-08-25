import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BtnComidas() {
  const [idProduto, setIdProduto] = useState({});

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setIdProduto(data.meals[0]));
  });

  return (
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${idProduto.idMeal}` }>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>

    </div>
  );
}
