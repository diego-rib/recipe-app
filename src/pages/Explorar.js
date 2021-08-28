import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Explorar.css';

export default function Explorar({ history: { push } }) {
  return (
    <div>
      <Header showButton={ false } title="Explorar" />
      <div className="explore-btns-container">
        <button
          type="button"
          onClick={ () => push('/explorar/comidas') }
          data-testid="explore-food"
          className="explorar-btn explore-food-btn big-font"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          onClick={ () => push('/explorar/bebidas') }
          data-testid="explore-drinks"
          className="explorar-btn explore-drink-btn big-font"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explorar.propTypes = {
  history: {
    push: PropTypes.func,
  },
}.isRequired;
