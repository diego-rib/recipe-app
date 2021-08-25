export async function requestAreas() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
}

export async function requestByArea(area) {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  if (area === '') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(url);
  const { meals } = await response.json();
  return meals;
}
