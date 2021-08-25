export function checkDoneRecipes(id) {
  const doneRecipes = localStorage.getItem('doneRecipes');
  let isDone;
  if (doneRecipes) {
    isDone = JSON.parse(doneRecipes).find((recipe) => recipe.id === id);
  }
  return isDone;
}

export function checkInProgressDrinks(id) {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  let isInProgress;
  if (inProgressRecipes) {
    isInProgress = JSON.parse(inProgressRecipes).cocktails[id];
  }
  return isInProgress ? 'Continuar Receita' : 'Iniciar Receita';
}

export function checkInProgressMeals(id) {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  let isInProgress;
  if (inProgressRecipes) {
    isInProgress = JSON.parse(inProgressRecipes).meals[id];
  }
  return isInProgress ? 'Continuar Receita' : 'Iniciar Receita';
}

export function checkFavorite(id) {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  let isFavorite;
  if (favoriteRecipes) {
    const data = JSON.parse(favoriteRecipes);
    isFavorite = data.find((recipe) => recipe.id === id);
  }
  return isFavorite;
}

export function getMealIngredientsChecked(id) {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  let isInProgress;
  if (inProgressRecipes) {
    isInProgress = JSON.parse(inProgressRecipes).meals[id];
  }
  return isInProgress;
}

export function getDrinkIngredientsChecked(id) {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  let isInProgress;
  if (inProgressRecipes) {
    isInProgress = JSON.parse(inProgressRecipes).cocktails[id];
  }
  return isInProgress;
}
