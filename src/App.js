import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './provider/recipesProvider';
import Login from './pages/Login';
import TelaPrincipal from './pages/TelaPrincipal';
import DetalhesComida from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import ComidaEmProgresso from './pages/ComidaEmProgresso';
import BebidaEmProgresso from './pages/BebidaEmProgresso';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Explorar from './pages/Explorar';
import ExplorarComidaBebida from './pages/ExplorarComidaBebida';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExplorarArea from './pages/ExplorarArea';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ReadyRecipe from './pages/ReadyRecipe';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas" render={ () => <TelaPrincipal type="meal" /> } />
          <Route
            exact
            path="/bebidas"
            render={ () => <TelaPrincipal type="cocktail" /> }
          />
          <Route
            exact
            path="/comidas/:id"
            render={ (props) => <DetalhesComida { ...props } /> }
          />
          <Route
            exact
            path="/bebidas/:id"
            render={ (props) => <DetalhesBebida { ...props } /> }
          />
          <Route
            exact
            path="/comidas/:id/in-progress"
            render={ (props) => <ComidaEmProgresso { ...props } /> }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            render={ (props) => <BebidaEmProgresso { ...props } /> }
          />
          { /* não tem header/footer /\ */ }
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidaBebida } />
          <Route exact path="/explorar/bebidas" component={ ExplorarComidaBebida } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ ExplorarArea } />
          { /* não tem footer \/ */ }
          <Route exact path="/receitas-feitas" component={ ReadyRecipe } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          { /* não tem footer /\ */ }
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
