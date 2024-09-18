import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [status, setStatus] = useState([]);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  console.log('funcao stado: ', status);
  function handleSubmit(event) {
    event.preventDefault();

    const createUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    };

    axios
      .post('https://alfacecode.adaptable.app/api/posts/users', createUser)

      .then((response) => {
        if (response.status === 201) {
          setStatus('Sua conta foi criada com sucesso');
          navigate('/dashboard')
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          console.log(error.response.status);
          const errors = error.response.data.errors;
          setStatus(errors);
        }
      });
  }

  return (
    <div className="mx-auto mt-8 max-w-xl rounded-lg bg-slate-300 p-6">
      <>
        <h2 className="mb-8 text-xl font-bold text-gray-700">Crie uma conta</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="firstname">
                Nome:
              </label>
              <input
                type="text"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                id="firstname"
                placeholder="Digita seu primeiro nome neste campo"
                className="mt-2 rounded-lg border-b border-gray-300 px-3 py-2 text-sm outline-none focus:bg-white focus:outline-none"
                autoComplete="current-firstname"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'firstname' ? (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    ) : null}
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
                value={user.lastname}
                onChange={handleChange}
                id="lastname"
                placeholder="Digita seu ultimo nome neste campo"
                className="mt-2 rounded-lg border-b border-gray-300 px-3 py-2 text-sm outline-none focus:bg-white focus:outline-none"
                autoComplete="current-lastname"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'lastname' ? (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    ) : null}
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
                value={user.email}
                onChange={handleChange}
                id="email"
                placeholder="Digita seu email neste campo"
                className="mt-2 rounded-lg border-b border-gray-300 px-3 py-2 text-sm outline-none focus:bg-white focus:outline-none"
                autoComplete="current-email"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'email' ? (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
            <div className="my-4 flex flex-col">
              <label className="text-sm text-gray-700" htmlFor="password">
                Senha:
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                id="password"
                autoComplete="current-password"
                className="mt-2 rounded-lg border-b border-gray-300 px-3 py-2 text-sm outline-none focus:bg-white focus:outline-none"
                placeholder="******"
              />
              {status.length > 0 &&
                status.map((error, index) => (
                  <div key={index}>
                    {error.path === 'password' ? (
                      <p className="text-xs font-bold text-red-800">
                        {error.msg}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
            <div className="mt-8 flex flex-col">
              <button
                className="rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-600 focus:bg-blue-500"
                type="submit"
              >
                Entrar na conta
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
