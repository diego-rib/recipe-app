import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

const INITIAL_STATE = {
  RecipesReducer: {
    recipesData: { meals: [] },
    recipeDetailsData: [],
    recipesRedirectData: [],
    isLoading: false,
    showRecipe: false,
  },
};

describe('Testes para página de Explorar comidas', () => {
  it('Verifica se há os itens procurados', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(),
    });
    const { findByText, findByTestId } = renderWithRouterAndRedux(
      <Login />,
      { route: '/' }, INITIAL_STATE,
    );
    const type = await findByText(/Login/i);
    const email = await findByTestId('email-input');
    const password = await findByTestId('password-input');
    const loginBtn = await findByTestId('login-submit-btn');
    expect(type).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute('disabled');
    userEvent.type(email, 'arthurhermann@hotmail.com');
    userEvent.type(password, '123456789');
    expect(loginBtn).not.toHaveAttribute('disabled');
  });

});

// Para utilizar o location
// <HomeRecipe location={ { state: 'chicken' } } />

// Para utilizar o match.param
// <HomeDetail match={ { params: { item: 'pamp' } } } />

// console.log(store.getState());
