import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import FooterBar from './Components/FooterBar';
// import PropTypes from 'prop-types';

function Explore() {
  return (
    <>
      <div>
        <h1 data-testid="page-title">Explorar</h1>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Botão que direciona para a tela de perfil"
        />
      </div>
      <FooterBar />
    </>
  );
}

export default Explore;