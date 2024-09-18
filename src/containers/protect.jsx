import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authToken } from '../token/token';
import { PropTypes } from 'prop-types';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://alfacecode.adaptable.app/api/current-user', authToken())
      .then((response) => {
        setUser(response.data.currentUser);
        setLoading(false);
      })
      .catch((error) => {
        setError('Não foi possível carregar os dados do usuário.', {
          error: error.message,
        });
        setLoading(false);
      });
  }, []);

  const value = {
    user,
    loading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
