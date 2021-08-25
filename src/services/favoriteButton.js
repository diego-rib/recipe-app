export function handleFavoriteMealBtn(favoriteState, meal) {
  const data = localStorage.getItem('favoriteRecipes');
  let favoriteRecipes = [];
  if (data) {
    favoriteRecipes = JSON.parse(data);
    localStorage.removeItem('favoriteRecipes');
  }

  const { idMeal, strCategory, strArea, strMeal, strMealThumb } = meal;
  const localMeal = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  let favorites = [];
  if (favoriteState) {
    favorites = favoriteRecipes.filter(({ id }) => id !== idMeal);
  } else {
    favorites = [...favoriteRecipes, localMeal];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}

export function handleFavoriteDrinkBtn(favoriteState, drink) {
  const data = localStorage.getItem('favoriteRecipes');
  let favoriteRecipes = [];
  if (data) {
    favoriteRecipes = JSON.parse(data);
    localStorage.removeItem('favoriteRecipes');
  }

  const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = drink;
  const localDrink = {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: strDrink,
    image: strDrinkThumb,
  };
  let favorites = [];
  if (favoriteState) {
    favorites = favoriteRecipes.filter(({ id }) => id !== idDrink);
  } else {
    favorites = [...favoriteRecipes, localDrink];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}
