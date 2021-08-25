import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipesRender({ filter }) {
  const [copyLink, setCopyLink] = useState(false);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const [recipes, setRecipes] = useState(doneRecipes);

  useEffect(() => {
    let localRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (filter !== '') {
      localRecipes = localRecipes.filter((recipe) => recipe.type === filter);
    }
    setRecipes(localRecipes);
  }, [filter]);

  function copyUrl({ target: { dataset } }) {
    const { recipetype, recipeid } = dataset;
    const TWO_SECONDS = 2000;
    copy(`http://localhost:3000/${recipetype}s/${recipeid}`);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, TWO_SECONDS);
  }

  return (
    <div>
      {copyLink ? <p>Link copiado!</p> : null}
      {recipes.map((recipe, index) => (
        <div key={ index } className="cartao">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className="imagem"
              alt="imagem da receita"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div>

            <div>
              {recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
            </Link>
            {recipe.type === 'comida'
              ? (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.area} - ${recipe.category}`}
                </span>
              ) : (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </span>
              )}
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <input
              data-recipetype={ recipe.type }
              onClick={ (event) => copyUrl(event) }
              data-recipeId={ recipe.id }
              alt="botao de compartilhar"
              type="image"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

DoneRecipesRender.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default DoneRecipesRender;
