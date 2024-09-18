import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('https://alfacecode.adaptable.app/api/categories')

      .then((response) => {
        if (response.status === 200 && isMounted) {
          const categories = response.data.categories;
          setCategories(categories);
        } else {
          return 'Nao foi possivel obter as categorias';
        }
      })

      .catch((error) => {
        if (isMounted) {
          console.log('Categorias nao foram encontradas ', {
            details: error.message,
          });
          return setError(error.message);
        }
      });

    return () => (isMounted = false);
  }, []);

  const value = {
    categories,
    error,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
