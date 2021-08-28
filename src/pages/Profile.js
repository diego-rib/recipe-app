import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Profile.css';

export default function Profile({ history }) {
  const data = JSON.parse(localStorage.getItem('user'));
  const email = data ? data.email : '';

  return (
    <div>
      <Header
        showButton={ false }
        title="Perfil"
      />
      <div className="profile-container">
        <h3
          data-testid="profile-email"
          className="profile-email"
        >
          {email}
        </h3>
        <div className="profile-btns-container">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
            className="profile-btn profile-done-btn"
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
            className="profile-btn profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              window.location.pathname = '/';
            } }
            className="profile-btn profile-quit-btn"
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: {
    push: PropTypes.func,
  },
}.isRequired;
