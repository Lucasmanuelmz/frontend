import { useState, useEffect } from 'react';
import DeletePost from '../../components/deletePost';
import { useArticle } from '../../containers/articleContext';
import { useUser } from '../../containers/protect';
import { Link } from 'react-router-dom';

export default function PostsList() {
  const { articles } = useArticle();
  const { user } = useUser();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      setPostList(articles.filter((article) => article.User.id === user.id));
    }
  }, [articles, user.id]);

  const handlePostDeleted = (deletedPostId) => {
    setPostList(postList.filter((post) => post.id !== deletedPostId));
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {user ? (
          <table className="mx-auto my-10 max-w-7xl text-left text-sm text-gray-500 dark:text-green-400 rtl:text-right">
            <thead className="bg-blue-500 text-xs uppercase text-gray-700 dark:bg-blue-500 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-gray-200">
                  Artigo Título
                </th>
                <th scope="col" className="px-6 py-3 text-gray-200">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-gray-200">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-gray-200">
                  Autor do Artigo
                </th>
                <th scope="col" className="px-6 py-3 text-gray-200">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {postList.length > 0 ? (
                postList.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b bg-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-800 dark:text-white"
                    >
                      <Link
                        className="text-gray-800 hover:text-gray-700"
                        to={`/home/read/article/${article.slug}`}
                      >
                        {article.title}
                      </Link>
                      <span
                        className="ml-2 cursor-help text-gray-500"
                        title="Clique no titulo para ler o artigo. Para editar, use o slug do título. Esta organização é para aprendizado das técnicas."
                      >
                        &#9432;
                      </span>
                    </th>

                    <td className="px-4 py-4 text-xs capitalize text-gray-700">
                      {article.Category.name}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-700">
                      <Link
                        className="text-gray-800 hover:text-gray-700"
                        to={`/dashboard/edit/${article.id}/post/${article.slug}`}
                      >
                        {article.slug}
                      </Link>
                      <span
                        className="ml-2 cursor-help text-gray-500"
                        title="Clique no titulo para ler o artigo. Para editar, use o slug do título. Esta organização é para aprendizado das técnicas."
                      >
                        &#9432;
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-700">
                      {article.User.firstname} {article.User.lastname}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-red-800">
                      <DeletePost
                        postId={article.id}
                        onPostDeleted={handlePostDeleted}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Nenhum artigo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
