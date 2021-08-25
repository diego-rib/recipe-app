import { useEffect, useState } from 'react';

import getIngredients from '../services/getIngredients';
import getCurrentDate from '../services/getCurrentDate';
import {
  getMealIngredientsChecked,
  getDrinkIngredientsChecked } from '../services/localStorageChecks';

export function useCurrentMealRecipe(id) {
  const [currentMealRecipe, setCurrentMealRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState([]);
  const [recipeDone, setRecipeDone] = useState(false);

  useEffect(() => {
    const checkData = getMealIngredientsChecked(id);
    if (checkData) setChecked(checkData);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        response.json()
          .then(({ meals }) => {
            setCurrentMealRecipe(meals[0]);
            const data = getIngredients(meals[0]);
            setIngredients(data);
          });
      });
  }, [id]);

  function saveStorage(check) {
    if (check.length > 0) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let newData;
      if (inProgressRecipes) {
        localStorage.removeItem('inProgressRecipes');
        newData = {
          ...inProgressRecipes,
          meals: {
            ...inProgressRecipes.meals,
            [id]: [...check],
          },
        };
      } else {
        newData = {
          cocktails: {},
          meals: {
            [id]: [...check],
          },
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(newData));
    }
  }

  function handleCheck(index) {
    let checkedIngredients = checked.filter((item) => item !== []);
    if (checked.includes(index)) {
      checkedIngredients = checked.filter((item) => item !== index);
    } else {
      checkedIngredients = [...checked, index];
    }
    saveStorage(checkedIngredients);
    setChecked(checkedIngredients);
  }

  function handleDoneRecipe() {
    const isDoneData = localStorage.getItem('doneRecipes');
    const { strArea, strCategory, strMeal, strMealThumb, strTags } = currentMealRecipe;
    const localMeal = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: getCurrentDate(),
      tags: strTags.split(','),
    };
    let newData = [localMeal];
    if (isDoneData) {
      localStorage.removeItem('doneRecipes');
      const doneRecipes = JSON.parse(isDoneData);
      newData = [
        ...doneRecipes,
        localMeal,
      ];
    }
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete storageData.meals[id];
    localStorage.inProgressRecipes = JSON.stringify(storageData);
    localStorage.setItem('doneRecipes', JSON.stringify(newData));
  }

  return [currentMealRecipe,
    ingredients,
    checked,
    handleCheck,
    recipeDone,
    setRecipeDone,
    handleDoneRecipe];
}

export function useCurrentDrinkRecipe(id) {
  const [currentDrinkRecipe, setCurrentDrinkRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState([]);
  const [recipeDone, setRecipeDone] = useState(false);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        response.json()
          .then(({ drinks }) => {
            setCurrentDrinkRecipe(drinks[0]);
            const data = getIngredients(drinks[0]);
            setIngredients(data);
          });
      });
  }, [id]);

  useEffect(() => {
    const checkData = getDrinkIngredientsChecked(id);
    if (checkData) setChecked(checkData);
  }, [id]);

  function saveStorage(check) {
    if (check.length > 0) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let newData;
      if (inProgressRecipes) {
        localStorage.removeItem('inProgressRecipes');
        newData = {
          ...inProgressRecipes,
          cocktails: {
            ...inProgressRecipes.cocktails,
            [id]: [...check],
          },
        };
      } else {
        newData = {
          cocktails: {
            [id]: [...check],
          },
          meals: {},
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(newData));
    }
  }

  function handleCheck(index) {
    let checkedIngredients = checked.filter((drink) => drink !== []);
    if (checked.includes(index)) {
      checkedIngredients = checked.filter((drink) => drink !== index);
    } else {
      checkedIngredients = [...checked, index];
    }
    saveStorage(checkedIngredients);
    setChecked(checkedIngredients);
  }

  function handleDoneRecipe() {
    const isDoneData = localStorage.getItem('doneRecipes');
    const { strCategory, strAlcoholic, strDrink, strDrinkThumb } = currentDrinkRecipe;
    const localDrink = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: getCurrentDate(),
      tags: [],
    };
    let newData = [localDrink];
    if (isDoneData) {
      localStorage.removeItem('doneRecipes');
      const doneRecipes = JSON.parse(isDoneData);
      newData = [
        ...doneRecipes,
        localDrink,
      ];
    }
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete storageData.cocktails[id];
    localStorage.inProgressRecipes = JSON.stringify(storageData);
    localStorage.setItem('doneRecipes', JSON.stringify(newData));
  }

  return [currentDrinkRecipe,
    ingredients,
    checked,
    handleCheck,
    recipeDone,
    setRecipeDone,
    handleDoneRecipe];
}
