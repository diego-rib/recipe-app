import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import { getFoodFromApi } from '../actions';
import FiltersFromCategories from '../components/FiltersFromCategories';

class Comidas extends React.Component {
  componentDidMount() {
    const { getFoods } = this.props;
    getFoods();
  }

  render() {
    const { foodsDataBase } = this.props;
    return (
      <div>
        <FiltersFromCategories />
        <Cards itemsToRender={ foodsDataBase } typeFood="food" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodsDataBase: state.foodsReducer.foodsFromApi,
});

const mapDispatchToProps = (dispatch) => ({
  getFoods: () => dispatch(getFoodFromApi()),
});

Comidas.propTypes = {
  getFoods: PropTypes.func.isRequired,
  foodsDataBase: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
