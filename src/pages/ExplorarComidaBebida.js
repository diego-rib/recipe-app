import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BtnBebidas from '../components/BtnBebidas';
import BtnComidas from '../components/BtnComidas';

export default function Explorar({ history: { push } }) {
  function LocationAtual() {
    const location = useLocation();
    return location.pathname;
  }

  return (
    <div>
      <Header
        showButton={ false }
        title={ LocationAtual() === '/explorar/bebidas'
          ? 'Explorar Bebidas'
          : 'Explorar Comidas' }
      />
      { LocationAtual() === '/explorar/comidas'
        ? <BtnComidas push={ push } />
        : <BtnBebidas push={ push } /> }
      <Footer />
    </div>
  );
}

Explorar.propTypes = {
  history: {
    push: PropTypes.func,
  },
}.isRequired;
