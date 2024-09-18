import axios from 'axios';
import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const UsersContext = createContext();

export function useUsers() {
  useContext(UsersContext);
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('https://alfacecode.adaptable.app/api/posts/users')

      .then((response) => {
        if (response.status === 200 && isMounted) {
          setUsers(response.data.users);
          setErrors(null);
        }
      })

      .catch((error) => {
        if (isMounted) {
          setTimeout(() => {
            setErrors(error.response.data.errors);
          }, 3000);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    users,
    errors,
  };

  return (
    <UsersProvider.Provider value={value}>{children}</UsersProvider.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
