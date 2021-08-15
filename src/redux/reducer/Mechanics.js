const INITIAL_STATE = {
  searcResults: [],
  categoryList: [],
  recipeDetailsStore: [],
  recipeFoodMeasures: [],
};

function Mechanics(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'MODIFY_SEARCH_RESULTS':
    return { ...state, searcResults: action.payload };
  case 'GET_CATEGORY_LIST':
    return {
      ...state,
      categoryList: action.payload,
    };
  case 'SEND_DETAILS_TO_STORE':
    return {
      ...state,
      recipeDetailsStore: action.details,
    };
  case 'SEND_FOOD_MEASURES_TO_STORE':
    return {
      ...state,
      recipeFoodMeasures: action.payload,
    };
  default:
    return state;
  }
}

export default Mechanics;
