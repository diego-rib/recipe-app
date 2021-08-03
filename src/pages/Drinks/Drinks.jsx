import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import styles from './Drinks.module.css';
import { fetchDrink } from '../../redux/actions';

function Drinks({ match }) {
  const { isLoading, drinks } = useSelector((state) => state.Drinks);
  const { data, render } = useSelector((state) => state.Filter);
  const dispatch = useDispatch();
  const mn = 12;

  React.useEffect(() => {
    async function getDrinks() {
      await dispatch(fetchDrink());
    }
    getDrinks();
  }, [dispatch]);

  function renderDrinks() {
    if (render && data.drinks) {
      return (
        <div className={ styles.drinksCardContainer }>
          {data.drinks && data.drinks.filter((_, index) => index < mn)
            .map((item, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className={ styles.cardDiv }
              >
                <img
                  src={ item.strDrinkThumb }
                  alt="thumbnail"
                  data-testid={ `${index}-card-img` }
                  className={ styles.cardImg }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {item.strDrink}
                </p>
              </div>
            ))}
        </div>
      );
    } if (render && !isLoading && !data.drinks) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return null;
    }
    return (
      <div className={ styles.drinksCardContainer }>
        {drinks.drinks && drinks.drinks.filter((_, index) => index < mn)
          .map((item, index) => (
            <section
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className={ styles.cardDiv }
            >
              <img
                src={ item.strDrinkThumb }
                alt="thumbnail"
                data-testid={ `${index}-card-img` }
                className={ styles.cardImg }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {item.strDrink}
              </p>
            </section>
          ))}
      </div>
    );
  }

  if (isLoading) {
    return (<h1>Carregando...</h1>);
  }

  return (
    <div className={ styles.drinksContainer }>
      <Header title="Bebidas" glass="true" match={ match } />
      {renderDrinks()}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drinks;