import axios from 'axios';
import { useState } from 'react';
import { authToken } from '../token/token';
import { useUser } from '../containers/protect';

export default function CreateCategoryPage() {
  const [position, setPosition] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const { user } = useUser();
  const [errors, setErrors] = useState(null);
  const [response, setResponse] = useState(null);

  function handleSetPosition() {
    setPosition(position === 1 ? 2 : 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const createCategory = {
      name: categoryName,
      position: position,
      UserId: user.id,
    };

    axios
      .post('https://alfacecode.adaptable.app/api/categories', createCategory, authToken())

      .then((response) => {
        console.loh(authToken())
        if (response.status === 201) {
          setResponse('Categoria criado com sucesso!');
          setErrors(null);
        }
      })

      .catch((error) => {
        if (error) {
          setErrors(error.response.data.errors);
          setResponse(null);
        }
      });
  }

  if (response) {
    return (
      <div className="bg-white p-6">
        <p className="bg-blue-200 p-3 text-lg text-green-800">{response}</p>
      </div>
    );
  }
  return (
    <main>
      <div className="mx-auto my-28 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <p className="bg-gray-50 p-4 text-sm italic text-blue-600">
          Voce e{' '}
          <span className="font-bold text-green-950">{user.firstname}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Crie uma nova categoria
          </h5>
          <div>
            <label
              htmlFor="categoryName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome da categoria
            </label>
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              id="categoryName"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Nome da categoria"
              required
            />
            {errors ? (
              <div>
                {errors.map((error, index) => (
                  <p key={index} className="text-sm italic text-red-800">
                    {error.msg}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleSetPosition}
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Posição
            <span className="ms-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
              {position}
            </span>
          </button>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Criar Categoria
          </button>
        </form>
      </div>
    </main>
  );
}
