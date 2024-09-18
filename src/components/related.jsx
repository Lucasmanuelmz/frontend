import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse, { domToReact } from 'html-react-parser';

export default function ReadRelatedArticles() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  function transformStyleOfText(node) {
    if (node.name === 'p') {
      return (
        <p className="mb-4 leading-relaxed text-gray-100">
          {domToReact(node.children)}
        </p>
      );
    }

    if (node.name === 'h1') {
      return (
        <h1 className="mb-4 mt-8 text-3xl font-semibold text-gray-200">
          {domToReact(node.children)}
        </h1>
      );
    }

    if (node.name === 'h2') {
      return (
        <h2 className="mb-4 mt-6 text-2xl font-semibold text-gray-100">
          {domToReact(node.children)}
        </h2>
      );
    }

    if (node.name === 'h3') {
      return (
        <h3 className="mb-3 mt-4 text-xl font-semibold text-gray-100">
          {domToReact(node.children)}
        </h3>
      );
    }

    if (node.name === 'ul') {
      return (
        <ul className="mb-6 list-disc pl-5 text-gray-200">
          {domToReact(node.children)}
        </ul>
      );
    }

    if (node.name === 'ol') {
      return (
        <ol className="mb-6 list-decimal pl-5 text-gray-200">
          {domToReact(node.children)}
        </ol>
      );
    }

    if (node.name === 'li') {
      return <li className="m-6">{domToReact(node.children)}</li>;
    }

    if (node.name === 'blockquote') {
      return (
        <blockquote className="my-4 border-l-4 border-indigo-500 pl-4 italic text-gray-200">
          {domToReact(node.children)}
        </blockquote>
      );
    }

    if (node.name === 'a') {
      return (
        <a
          href={node.attribs.href}
          className="text-indigo-600 underline hover:text-indigo-800"
        >
          {domToReact(node.children)}
        </a>
      );
    }

    return null;
  }

  useEffect(() => {
    axios
      .get(`https://alfacecode.adaptable.app/api/posts/${slug}`)
      .then((response) => {
        if (response.status === 200) {
          const article = response.data.post;
          setArticle(article);
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar o artigo:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  return (
    <main className="min-h-screen bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      {loading ? (
        <p className="text-gray-200">O artigo está carregando...</p>
      ) : (
        <div className="mx-auto max-w-3xl rounded-md p-6 text-gray-200 shadow-md">
          {article ? (
            <>
              <div className="prose prose-lg dark:prose-dark">
                {parse(article.text, { replace: transformStyleOfText })}
              </div>
            </>
          ) : (
            <p className="text-gray-200">O artigo não foi encontrado.</p>
          )}
        </div>
      )}
    </main>
  );
}
