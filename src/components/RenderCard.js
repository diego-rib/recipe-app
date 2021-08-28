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

  function removeItem(index) {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favorite.splice(index, 1);
    setRecipes(favorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  }

  function copyUrl(type, id) {
    const TWO_SECONDS = 2000;
    copy(`${window.location.origin}/${type}s/${id}`);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, TWO_SECONDS);
  }

  return (
    <div className="favorite-recipes-container">
      {copyLink ? <p className="link-warning">Link copiado!</p> : null}
      {recipes.map(({ id,
        type,
        image,
        area,
        category,
        alcoholicOrNot,
        name,
      }, index) => (
        <div key={ id } className="favorite-recipe-card">
          <div className="favorite-recipe-img-container">
            <Link to={ `/${type}s/${id}` }>
              <Image
                thumbnail
                alt="imagem da receita"
                src={ image }
                data-testid={ `${index}-horizontal-image` }
                className="favorite-recipe-card-img"
              />
            </Link>
          </div>
          <div className="favorite-recipe-info">
            <span
              data-testid={ `${index}-horizontal-top-text` }
              className="favorite-recipe-category"
            >
              {
                type === 'comida'
                  ? `${area} - ${category}`
                  : alcoholicOrNot
              }
            </span>
            <Link to={ `/${type}s/${id}` }>
              <h4
                data-testid={ `${index}-horizontal-name` }
                className="favorite-recipe-name"
              >
                {name}
              </h4>
            </Link>
            <div>
              <input
                onClick={ () => copyUrl(type, id) }
                alt="botao de compartilhar"
                type="image"
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                className="favorite-recipes-interaction-btns"
              />
              <input
                onClick={ () => removeItem(index) }
                alt="botao de favoritar"
                type="image"
                src={ blackHeartIcon }
                data-testid={ `${index}-horizontal-favorite-btn` }
                className="favorite-recipes-interaction-btns"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

RenderCard.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default RenderCard;
