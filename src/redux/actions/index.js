export const REQUEST_API = 'REQUEST_API';
export const GET_RECIPES_API = 'GET_RECIPES_API';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_LIST = 'GET_LIST';
export const GET_CATEGORIES_MEALS = 'GET_CATEGORIES_MEALS';
export const GET_CATEGORIES_DRINK = 'GET_CATEGORIES_DRINK';

// ESTÁ ACTION ALTERA isLoading PARA true
export const requestApiAction = () => ({ type: REQUEST_API });

// ESTÁ ACTION ALTERA isLoading PARA false E SALVA O RETORNO DA API EM recipesData
export const getRecipesAction = (data) => ({ type: GET_RECIPES_API, data });

// ESTÁ ACTION CRIA O AMBIENTE THUNK PARA REQUISIÇÃO API E OBTENÇÃO DA LISTA DE RECEITAS
export const fetchRecipesAPIAction = (url, recipeType) => async (dispatch) => {
  dispatch(requestApiAction());
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    if (!json[recipeType]) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    dispatch(getRecipesAction(json));
  } catch (error) {
    console.log(error);
  }
};

const responseApiRecipes = () => ({ type: GET_RECIPES });

const responseApiDrinks = () => ({ type: GET_DRINKS });

const responseApiList = () => ({ type: GET_LIST });

const responseCategoryMeals = () => ({ type: GET_CATEGORIES_MEALS });

const responseCategoryDrinks = () => ({ type: GET_CATEGORIES_DRINK });

export const fetchRecipesMain = (url) => async (dispatch) => {
  dispatch(responseApiRecipes());
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkMain = (url) => async (dispatch) => {
  dispatch(responseApiDrinks());
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchList = (url) => async (dispatch) => {
  dispatch(responseApiList());
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipesListDrinks = (url, type) => async (dispatch) => {
  if (type === GET_CATEGORIES_MEALS) {
    dispatch(responseCategoryMeals());
  } else {
    dispatch(responseCategoryDrinks());
  }
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response.categories;
  } catch (error) {
    console.log(error);
  }
};
