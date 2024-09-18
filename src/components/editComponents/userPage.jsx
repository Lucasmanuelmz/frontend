import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../containers/protect';
import { authToken } from '../../token/token';
import ProfileImageUpload from '../../containers/uploadAvatarFile';
import { Link, useParams } from 'react-router-dom';

export default function SignupUpdatePage() {
  const [status, setStatus] = useState([]);
  const { user } = useUser();
  const [onFileUploaded, setOnFileUploaded] = useState(null);
  const [users, setUsers] = useState(user);
  const [successMessage, setSuccessMessage] = useState('');
  const [sendMessage, setSendMessage] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setUsers(user);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('firstname', users.firstname);
    formData.append('lastname', users.lastname);
    formData.append('email', users.email);
    formData.append('cpf', users.cpf);
    formData.append('birthdate', users.birthdate);
    formData.append('phone', users.phone);
    formData.append('bio', users.bio);
    formData.append('id', users.id);

    if (onFileUploaded) {
      formData.append('avatar', onFileUploaded);
    }

    axios
      .put(`https://alfacecode.adaptable.app/api/posts/users/${id}`, formData, {
        headers: {
          ...authToken().headers,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage('Sua conta foi criada com sucesso');
          setSendMessage(true);

          setTimeout(() => {
            setSendMessage(false);
            setSuccessMessage('');
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          const errors = error.response.data.errors;
          setStatus(errors);
          setSendMessage(false);

          setTimeout(() => {
            setStatus([]);
          }, 3000);
        }
      });
  }

  return (
    <div className="mx-auto my-8 max-w-xl rounded-lg bg-gray-200 p-6">
      <>
        <h2 className="mb-8 text-xl font-bold text-gray-700">
          Atualize a sua conta
        </h2>
        <div>
          {sendMessage && (
            <div className="flex items-center justify-center bg-blue-50 p-6">
              <p className="font-semibold text-green-500">{successMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <ProfileImageUpload
                onFileUploaded={setOnFileUploaded}
                avatar={users.urlAvatar}
              />
            </div>
            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="firstname">
                Nome:
              </label>
              <input
                type="text"
                name="firstname"
                value={users.firstname}
                onChange={handleChange}
                id="firstname"
                placeholder="Digite seu primeiro nome"
                className="mt-2 rounded-lg border-none bg-gray-200 px-3 py-2 text-sm outline-none focus:bg-gray-100 focus:outline-none"
                autoComplete="current-firstname"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'firstname' && (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    )}
                  </div>
                ))}
            </div>
            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="lastname">
                Sobrenome:
              </label>
              <input
                type="text"
                name="lastname"
                value={users.lastname}
                onChange={handleChange}
                id="lastname"
                placeholder="Digite seu sobrenome"
                className="mt-2 rounded-lg border-none bg-gray-200 px-3 py-2 text-sm outline-none focus:bg-gray-100 focus:outline-none"
                autoComplete="current-lastname"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'lastname' && (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    )}
                  </div>
                ))}
            </div>
            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={users.email}
                onChange={handleChange}
                id="email"
                placeholder="Digite seu email"
                className="mt-2 rounded-lg border-none bg-gray-200 px-3 py-2 text-sm outline-none focus:bg-gray-100 focus:outline-none"
                autoComplete="current-email"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'email' && (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    )}
                  </div>
                ))}
            </div>

            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="birthdate">
                Data de Nascimento:
              </label>
              <input
                type="date"
                name="birthdate"
                value={users.birthdate}
                onChange={handleChange}
                id="birthdate"
                className="mt-2 rounded-lg border-none bg-gray-200 px-3 py-2 text-sm outline-none focus:bg-gray-100 focus:outline-none"
              />
            </div>
            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="phone">
                Telefone:
              </label>
              <input
                type="tel"
                name="phone"
                value={users.phone}
                onChange={handleChange}
                id="phone"
                placeholder="Digite seu telefone"
                className="mt-2 rounded-lg border-none bg-gray-200 px-3 py-2 text-sm outline-none focus:bg-gray-100 focus:outline-none"
                autoComplete="current-phone"
              />
            </div>
            <input
              type="hidden"
              name="id"
              value={users.id}
              onChange={handleChange}
            />

            <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
              <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
                <label htmlFor="bio" className="sr-only">
                  Escreva um resumo
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={users.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="Escreva uma pequena bio..."
                  required
                ></textarea>
              </div>
            </div>
            <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
              Lembre-se, as contribuições para este tópico devem seguir nossas{' '}
              <Link
                to="/regras/da/comunidade"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Diretrizes da Comunidade
              </Link>
              .
            </p>

            <div className="mt-8 flex flex-col">
              <button
                className="rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-600 focus:bg-blue-500"
                type="submit"
              >
                Atualizar a conta
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
