import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import Footer from '../components/MenuInferior';

import { requestAreas, requestByArea } from '../services/requestAreas';

function ExplorarArea() {
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentArea, setCurrentArea] = useState('');

  useEffect(() => {
    requestAreas()
      .then((data) => setAreas(data));
  }, []);

  useEffect(() => {
    requestByArea(currentArea)
      .then((data) => setRecipes(data));
  }, [currentArea]);

  return (
    <div>
      <Header showButton title="Explorar Origem" />
      <select
        onChange={ ({ target }) => setCurrentArea(target.value) }
        data-testid="explore-by-area-dropdown"
      >
        <option data-testid="All-option" value="">All</option>
        {
          areas.map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))
        }
      </select>
      <MealsCards meals={ recipes } />
      <Footer />
    </div>
  );
}

export default ExplorarArea;
