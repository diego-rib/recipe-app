import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RenderCard({ filter }) {
  const [copyLink, setCopyLink] = useState(false);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [recipes, setRecipes] = useState(favoriteRecipes);

  useEffect(() => {
    let localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (filter !== '') {
      localRecipes = localRecipes.filter((recipe) => recipe.type === filter);
    }
    setRecipes(localRecipes);
  }, [filter]);

  function removeItem({ target }) {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favorite.splice(target.dataset.recipeindex, 1);
    setRecipes(favorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  }

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
      {recipes.map((object, index) => (
        <div key={ object.id }>
          <Link to={ `/${object.type}s/${object.id}` }>
            <Image
              thumbnail
              alt="imagem da receita"
              src={ object.image }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          {object.type === 'comida'
            ? (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {`${object.area} - ${object.category}`}
              </span>
            ) : (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {object.alcoholicOrNot}
              </span>
            )}
          <Link to={ `/${object.type}s/${object.id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>{object.name}</h4>
          </Link>
          <input
            data-recipetype={ object.type }
            onClick={ (event) => copyUrl(event) }
            data-recipeId={ object.id }
            alt="botao de compartilhar"
            type="image"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <input
            onClick={ (event) => removeItem(event) }
            data-recipeIndex={ index }
            alt="botao de favoritar"
            type="image"
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </div>
      ))}
    </div>
  );
}

RenderCard.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default RenderCard;
