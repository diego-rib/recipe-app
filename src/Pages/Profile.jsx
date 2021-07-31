import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../Components/FooterMenu';
import HeaderWithoutSearch from '../Components/HeaderWithoutSearch';

export default class Profile extends Component {
  render() {
    const emailUser = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <HeaderWithoutSearch title="Perfil" />
        <div>
          <h2 data-testid="profile-email">{ emailUser.email }</h2>
          <Link
            to="/receitas-feitas"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Link>
          <Link
            to="/receitas-favoritas"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Link>
          <Link
            to="/"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </Link>
        </div>
        <FooterMenu />
      </div>
    );
  }
}
