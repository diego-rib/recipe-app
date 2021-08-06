import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import useLocalStorage from '../hooks/useLocalStorage';
import { getDrinkRecipeDetails } from '../services/getRecipeDetails';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';

export default function InProcessDrink() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);

  const ingredients = [];
  if (recipeData) {
    Object.entries(recipeData).forEach(
      (entry) => {
        const [key, value] = entry;
        if (key.includes('strIngredient') && value) {
          ingredients.push(value);
        }
      },
    );
  }

  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  function handleToggleFavorite() {
    if (isFavorite) {
      const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
      setFavoriteRecipes(newFavoriteRecipes);
    } else {
      setFavoriteRecipes([...favoriteRecipes, {
        id,
        type: 'bebida',
        alcoholicOrNot: recipeData.strAlcoholic,
        category: recipeData.strCategory,
        name: recipeData.strDrink,
        image: recipeData.strDrinkThumb,
        area: '',
      }]);
    }
  }

  useEffect(() => {
    getDrinkRecipeDetails(id)
      .then((data) => setRecipeData(data));
  }, [id]);

  return (
    <Container>
      <RecipeHeader
        isFavorite={ isFavorite }
        toggleFavorite={ handleToggleFavorite }
        imgUrl={ recipeData ? recipeData.strDrinkThumb : '' }
        title={ recipeData ? recipeData.strDrink : '' }
        category={ recipeData ? recipeData.strCategory : '' }
      />
      <IngredientsCheckList ingredients={ ingredients } />
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
          className="mt-3 ml-3"
        >
          {recipeData ? recipeData.strInstructions : ''}
        </p>
      </div>

      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            className="w-100 my-3 py-2"
            style={ {
              fontSize: '20px',
            } }
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
