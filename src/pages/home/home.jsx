import { Link } from 'react-router-dom';
import { useArticle } from '../../containers/articleContext';
import defaultImage from '../../assets/default-image.jpg';

export default function HomePage() {
  const { articles } = useArticle();

  return (
    <main className="mx-auto my-7 mt-5 w-full max-w-7xl rounded-lg bg-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 md:grid-cols-3">
        {articles ? (
          articles.map((article) => (
            <div
              key={article.id}
              className="max-w-sm rounded-lg border border-gray-300 bg-gray-200 shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <Link to={`/home/read/article/${article.slug}`}>
                <img
                  className="h-48 w-full rounded-t-lg object-cover"
                  src={defaultImage}
                  alt={article.sinopse}
                />
              </Link>
              <div className="p-5">
                <Link to={`/home/read/article/${article.slug}`}>
                  <h5 className="mb-2 text-base font-bold tracking-tight text-blue-800 dark:text-white">
                    {article.title}
                  </h5>
                </Link>
                <p className="mb-3 text-sm font-normal text-gray-800 dark:text-gray-700">
                  {article.sinopse}
                </p>
                <Link
                  to={`/home/read/article/${article.slug}`}
                  className="text-g inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Leia mais
                  <svg
                    className="ml-2 h-3.5 w-3.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Nenhum artigo foi encontrado</p>
          </div>
        )}
      </div>
    </main>
  );
}
