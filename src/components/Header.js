import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchbar from './Searchbar';

function Header({ title, showButton }) {
  const [renderSearch, setRenderSearch] = useState(false);

  function disableSearchBar() {
    setRenderSearch(!renderSearch);
  }

  return (
    <header>
      <div className="d-flex justify-content-between">

        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="icone de perfil"
          />
        </Link>
        <h3 data-testid="page-title">
          {title}
        </h3>
        {
          showButton
            ? (
              <button
                onClick={ () => disableSearchBar() }
                type="button"
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="icone de pesquisa"
                />
              </button>
            )
            : null
        }
        {renderSearch ? <div /> : null}
      </div>
      {renderSearch ? <Searchbar /> : <div />}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  showButton: PropTypes.bool,
}.isRequired;
