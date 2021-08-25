export async function getFoodById(id) {
  const url = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals[0];
}

export async function getDrinkById(id) {
  const url = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks[0];
}
