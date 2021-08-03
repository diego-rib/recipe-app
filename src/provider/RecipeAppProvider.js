import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '../context/RecipeAppContext';

function RecipeAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [foodsList, setFoodList] = useState('');
  const [drinksList, setDrinksList] = useState('');
  const [drinkCategoryList, setDrinkCategory] = useState('');
  const [foodCategoryList, setFoodCategory] = useState('');
  const [toggleOn, setToggleOn] = useState(false);
  const [recipesDone, setRecipesDone] = useState([{
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/05/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '24/06/2020',
    tags: [],
  },
  ]);

  const [filteredRecipesDone, setFilteredRecipesDone] = useState([{
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
  ]);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleDisabled = () => {
    const minLength = 6;
    const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailIsValid = validRegex.test(login.email);
    if (emailIsValid && login.password.length > minLength) {
      return false;
    }
    return true;
  };

  const data = {
    handleChange,
    handleDisabled,
    email: login.email,
    setFoodList,
    setDrinksList,
    foodsList,
    drinksList,
    setDrinkCategory,
    setFoodCategory,
    drinkCategoryList,
    foodCategoryList,
    setLogin,
    toggleOn,
    setToggleOn,
    recipesDone,
    setRecipesDone,
    filteredRecipesDone,
    setFilteredRecipesDone,
  };

  return (
    <RecipeAppContext.Provider value={ data }>
      { children }
    </RecipeAppContext.Provider>
  );
}

RecipeAppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.array),
}.isRequire;

export default RecipeAppProvider;