import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [auth, setAuth] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('https://alfacecode.adaptable.app/api/auth', auth)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors([{ msg: 'Erro interno ou credenciais inválidas.' }]);
        }
        setTimeout(() => setErrors([]), 3000);
      });
  }

  return (
    <div className='mt-40'>
    <div className="mx-auto max-w-sm rounded-lg bg-slate-300 p-6">
      <h2 className="mb-8 text-xl font-bold text-gray-700">
        Entre na sua conta
      </h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="my-4 flex flex-col">
            <label className="text-sm text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={auth.email}
              id="email"
              placeholder="Digite seu email neste campo"
              className="mt-2 rounded-lg border-b border-gray-300 px-3 py-2 text-sm focus:bg-white focus:outline-none"
              autoComplete="current-email"
            />

            {errors.length > 0 &&
              errors.map((error, index) =>
                error.path === 'email' ? (
                  <p
                    key={index}
                    className="bg-red-200 p-2 text-xs italic text-red-500"
                  >
                    {error.msg}
                  </p>
                ) : null
              )}
          </div>
          <div className="my-4 flex flex-col">
            <label className="text-sm text-gray-700" htmlFor="password">
              Senha:
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={auth.password}
              name="password"
              id="password"
              autoComplete="current-password"
              className="mt-2 rounded-lg border-b border-gray-300 px-3 py-2 text-sm focus:bg-white focus:outline-none"
              placeholder="******"
            />

            {errors.length > 0 &&
              errors.map((error, index) =>
                error.path === 'password' ? (
                  <p
                    key={index}
                    className="bg-red-200 p-2 text-xs italic text-red-500"
                  >
                    {error.msg}
                  </p>
                ) : null
              )}
          </div>

          {errors.length > 0 &&
            errors.map((error, index) =>
              !error.path ? (
                <p
                  key={index}
                  className="bg-red-200 p-2 text-xs italic text-red-500"
                >
                  {error.msg}
                </p>
              ) : null
            )}

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
    </div>
    </div>
  );
}
