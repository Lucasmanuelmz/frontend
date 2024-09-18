import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authToken } from '../token/token';
import { useUser } from '../containers/protect';
import { PropTypes } from 'prop-types';

export default function CommentComponent({ postId }) {
  const [comment, setComments] = useState('');
  const [error, setError] = useState([]);
  const { user } = useUser();

  function handleSubmit(e) {
    e.preventDefault();
    const createComment = {
      comment: comment,
      postId: postId,
      userId: user.id,
    };
    console.log(createComment);
    axios
      .post(
        `https://alfacecode.adaptable.app/api/posts/${postId}/comments`,
        createComment,
        authToken()
      )
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
        }
      })
      .catch((error) => {
        if (error.status) {
          setError(error.response.data.errors);
          setComments(null);
        }
      });
  }

  return (
    <div className="mx-auto mt-14 max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Seu comentário
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
              className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Escreva um comentário..."
              required
            ></textarea>
            {error.length > 0 ? (
              <>
                {error.map((error, index) => (
                  <>
                    {error.path === 'comment' ? (
                      <p
                        className="text-sm font-normal italic text-red-800"
                        key={index}
                      >
                        {error.msg}
                      </p>
                    ) : null}
                  </>
                ))}
              </>
            ) : null}
          </div>
          <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            >
              Postar comentário
            </button>
          </div>
        </div>
      </form>
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
    </div>
  );
}

CommentComponent.propTypes = {
  postId: PropTypes.number.isRequired,
};
