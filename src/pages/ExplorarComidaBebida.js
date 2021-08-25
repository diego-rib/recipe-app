import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import BtnBebidas from '../components/BtnBebidas';
import BtnComidas from '../components/BtnComidas';

function Explorar() {
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
        ? BtnComidas()
        : BtnBebidas() }
      <MenuInferior />
    </div>
  );
}

export default Explorar;
