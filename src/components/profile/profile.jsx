import { useEffect, useState } from 'react';
import axios from 'axios';
import { authToken } from '../../token/token';
import { useParams, Link } from 'react-router-dom';
import SplashScreen from '../splash';
import DeleteUser from '../deleteUser';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://alfacecode.adaptable.app/api/posts/users/${id}`,
          authToken()
        );
        setUser(response.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchUser();
  }, [id]);

  const handleUserDeleted = (deletedUserId) => {
    if (deletedUserId === user.id) {
      setUser(null);
    }
  };

  if (loading) return <SplashScreen />;

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-3xl rounded-lg bg-gray-200 p-6">
        <h1 className="mb-6 text-xl font-semibold">Perfil do Usuário</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome:
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.firstname}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sobrenome:
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.lastname}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Data de Nascimento:
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.birthdate || ''}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Telefone:
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.phone || ''}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Bio:
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.bio || ''}</p>
        </div>

        <div className="flex justify-end">
          <DeleteUser userId={user.id} onUserDeleted={handleUserDeleted} />
          <Link
            to={`edit/user/${id}`}
            className="ml-6 block rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 focus:bg-blue-500"
          >
            Editar a conta
          </Link>
        </div>
      </div>
    </div>
  );
}
