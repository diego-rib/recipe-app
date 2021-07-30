import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button">
        <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
