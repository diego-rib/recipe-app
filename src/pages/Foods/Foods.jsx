import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import styles from './Foods.module.css';
import { fetchMeal } from '../../redux/actions';

function Foods({ match }) {
  const { meals, isLoading } = useSelector((state) => state.Meals);
  const { data, render } = useSelector((state) => state.Filter);
  console.log(meals);
  const dispatch = useDispatch();
  const mn = 12;

  React.useEffect(() => {
    async function getMeals() {
      await dispatch(fetchMeal());
    }
    getMeals();
  }, [dispatch]);

  function renderFoods() {
    if (render && data.meals) {
      return (
        <div className={ styles.foodsCardContainer }>
          {data.meals && data.meals.filter((_, index) => index < mn)
            .map((item, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className={ styles.cardDiv }

              >
                <img
                  src={ item.strMealThumb }
                  alt="thumbnail"
                  data-testid={ `${index}-card-img` }
                  className={ styles.cardImg }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal}
                </p>
              </div>
            ))}
        </div>
      );
    } if (render && !isLoading && !data.meals) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return null;
    }
    return (
      <div className={ styles.drinksCardContainer }>
        {meals.meals && meals.meals.filter((_, index) => index < mn)
          .map((item, index) => (
            <section
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className={ styles.cardDiv }
            >
              <img
                src={ item.strMealThumb }
                alt="thumbnail"
                data-testid={ `${index}-card-img` }
                className={ styles.cardImg }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {item.strMeal}
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
    <div className={ styles.foodsContainer }>
      <Header title="Comidas" glass="true" match={ match } />
      {renderFoods()}
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Foods;