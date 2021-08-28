export default function getIngredients(item) {
  let ingredientsKeys = [];
  if (item.strIngredient1) {
    // filtra as chaves dos ingredientes
    ingredientsKeys = Object.keys(item)
      .filter((key) => key.match(/strIngredient/) && item[key]);
    // remove os ingredientes que tem valor ""(string vazia)
    ingredientsKeys = ingredientsKeys.filter((key) => item[key].trim() !== '');
  }
  const ingredients = ingredientsKeys.map((ingredient, index) => {
    const tempMeasure = item[`strMeasure${index + 1}`] || 'null';
    const measure = tempMeasure === 'null' ? '' : `- ${tempMeasure}`;
    return `${item[ingredient]} ${measure}`;
  });
  return ingredients;
}
