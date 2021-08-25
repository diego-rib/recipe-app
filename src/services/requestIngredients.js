export async function requestByMainIngredient(domain, ingredient) {
  const url = `https://www.the${domain}db.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function fetchIngredients(domain, key) {
  const response = await fetch(`https://www.the${domain}db.com/api/json/v1/1/list.php?i=list`);
  const data = await response.json();
  const limit = 12;
  return data[key].slice(0, limit);
}
