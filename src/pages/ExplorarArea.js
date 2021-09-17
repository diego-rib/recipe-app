import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import { requestAreas, requestByArea } from '../services/requestAreas';

function ExplorarArea() {
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentArea, setCurrentArea] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestAreas()
      .then((data) => setAreas(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    requestByArea(currentArea)
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });
  }, [currentArea]);

  return (
    <div>
      <Header showButton title="Explorar Origem" />
      <select
        onChange={ ({ target }) => setCurrentArea(target.value) }
        data-testid="explore-by-area-dropdown"
        className="form-select explore-area-select"
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
      {
        loading
          ? <Loading />
          : <MealsCards meals={ recipes } />
      }
      <Footer />
    </div>
  );
}

export default ExplorarArea;
