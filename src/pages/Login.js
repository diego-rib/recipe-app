import React from 'react';
import { Redirect } from 'react-router-dom';
import useLoginForm from '../hooks/useLoginForm';

export default function Login() {
  // Faz uso do hook personalizado
  const [redirect, valid, handleChange, handleSubmit] = useLoginForm();

  return (
    <div>
      { redirect ? <Redirect to="/comidas" /> : null }
      <form>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          onKeyUp={ handleChange }
          placeholder="Insira seu email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onKeyUp={ handleChange }
          placeholder="Insira sua senha"
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !valid }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
