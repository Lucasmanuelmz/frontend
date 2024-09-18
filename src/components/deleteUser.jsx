import axios from 'axios';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { authToken } from '../token/token';

export default function DeleteUser({ userId, onUserDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleDeleteUser = (e) => {
    e.preventDefault();
    setIsDeleting(true);
    setError(null);
    axios
      .delete(`https://alfacecode.adaptable.app/api/posts/users/${userId}`, authToken())
      .then((response) => {
        if (response.status === 200) {
          setIsDeleting(false);
          setConfirmation(false);
          if (onUserDeleted) {
            onUserDeleted(postId);
          }
        }
      })
      .catch((error) => {
        setIsDeleting(false);
        setError('Ocorreu um erro ao deletar o artigo.');
      });
  };

  return (
    <div>
      <button
        onClick={() => setConfirmation(true)}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Apagar
      </button>

      {confirmation && (
        <form onSubmit={handleDeleteUser}>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="rounded bg-gray-200 p-6 shadow-md">
              <p className="text-lg">
                Tem certeza que deseja apagar a sua conta?
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="mr-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deletando...' : 'Sim, apagar'}
                </button>
                <button
                  onClick={() => setConfirmation(false)}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onUserDeleted: PropTypes.func.isRequired,
};
