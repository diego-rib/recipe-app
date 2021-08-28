import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchbar from './Searchbar';

import '../styles/Header.css';

function Header({ title, showButton }) {
  const [renderSearch, setRenderSearch] = useState(false);

  function disableSearchBar() {
    setRenderSearch(!renderSearch);
  }

  return (
    <header>
      <div className="header-div">

        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="icone de perfil"
          />
        </Link>
        <h3 className="header-title" data-testid="page-title">
          {title}
        </h3>
        {
          showButton
            ? (
              <button
                onClick={ () => disableSearchBar() }
                type="button"
                className="header-search-btn"
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="icone de pesquisa"
                />
              </button>
            )
            : <div className="invisible-div" />
        }
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
