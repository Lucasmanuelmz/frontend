import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';

const ArticleContext = createContext();

export function useArticle() {
  return useContext(ArticleContext);
}

export function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('https://alfacecode.adaptable.app/api/posts')

      .then((response) => {
        if (response.status === 200 && isMounted) {
          const posts = response.data.posts;
          setArticles(posts);
        }
      })

      .catch((error) => {
        if (isMounted) {
          console.log('Error: ', error.message);
          setError(error.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    articles,
    error,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
}

ArticleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
