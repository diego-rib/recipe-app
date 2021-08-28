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

  function copyUrl({ dataset }) {
    const { recipetype, recipeid } = dataset;
    const TWO_SECONDS = 2000;
    copy(`${window.location.origin}/${recipetype}s/${recipeid}`);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, TWO_SECONDS);
  }

  return (
    <div className="done-recipes-container">
      {copyLink ? <p className="link-warning">Link copiado!</p> : null}
      {recipes.map((recipe, index) => (
        <div key={ index } className="done-recipe-card">
          <div className="done-recipe-img-container">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="done-recipe-card-img"
                alt="imagem da receita"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div className="done-recipe-info">
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
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h5 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h5>
            </Link>
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
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Feito em: ${recipe.doneDate}`}
            </p>
            <input
              data-recipetype={ recipe.type }
              onClick={ ({ target }) => copyUrl(target) }
              data-recipeId={ recipe.id }
              alt="botao de compartilhar"
              type="image"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              className="done-recipe-share-btn"
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
