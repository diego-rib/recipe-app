import React from 'react';
import { Redirect } from 'react-router-dom';
import useLoginForm from '../hooks/useLoginForm';

import '../styles/Login.css';

export default function Login() {
  // Faz uso do hook personalizado
  const [redirect, valid, handleChange, handleSubmit] = useLoginForm();

  return (
    <div className="login-page">
      { redirect ? <Redirect to="/comidas" /> : null }
      <h1 className="login-title">Recipe App</h1>
      <form className="login-form">
        <input
          data-testid="email-input"
          type="email"
          name="email"
          className="login-input"
          onKeyUp={ handleChange }
          onChange={ handleChange }
          placeholder="Insira seu email"
        />
        {/* <input
          data-testid="password-input"
          type="password"
          name="password"
          className="login-input"
          onKeyUp={ handleChange }
          onChange={ handleChange }
          placeholder="Insira sua senha"
        /> */}
        <button
          data-testid="login-submit-btn"
          type="button"
          className="btn btn-go"
          disabled={ !valid }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
