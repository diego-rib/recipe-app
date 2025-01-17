import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [type, setType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  async function handleCategory(domain, category) {
    setUpdate(true);
    setLoading(true);
    if (category !== categoryFilter && category !== '') {
      setCategoryFilter(category);
      fetch(`https://www.the${domain}db.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => {
          res.json()
            .then((json) => {
              setSearchResults(json);
              setLoading(false);
            });
        });
    } else {
      setCategoryFilter('');
      fetch(`https://www.the${domain}db.com/api/json/v1/1/search.php?s=`)
        .then((res) => {
          res.json()
            .then((json) => {
              setLoading(false);
              setSearchResults(json);
            });
        });
    }
  }

  useEffect(() => {
    const fetchApi = () => {
      let domain = 'cocktail';
      if (type === 'meal') domain = 'meal';
      setLoading(true);
      fetch(`https://www.the${domain}db.com/api/json/v1/1/search.php?s=`)
        .then((res) => {
          res.json()
            .then((data) => {
              setSearchResults(data);
              setLoading(false);
            });
        });
    };
    if (update) {
      fetchApi();
    }
  }, [type, update]);

  const context = {
    type,
    setType,
    searchResults,
    setSearchResults,
    categoryFilter,
    handleCategory,
    update,
    setUpdate,
    loading,
    setLoading,
  };

  return (
    <recipesContext.Provider value={ context }>
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
