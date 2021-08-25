export default async function getCategories(type) {
  const url = `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}
