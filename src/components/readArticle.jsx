import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import parse, { domToReact } from 'html-react-parser';
import CommentComponent from './comment';
import Avatar from './avatar/avatar';
import LoadingScreen from './loadingScreen';
import defaultImage from '../assets/default-image.jpg';

export default function ReadArticles() {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { slug } = useParams();

  const transformStyleOfText = useCallback((node) => {
    if (node.name === 'p') {
      return (
        <p className="mb-4 leading-relaxed text-gray-800">
          {domToReact(node.children)}
        </p>
      );
    }
    if (node.name === 'h1') {
      return (
        <h1 className="mb-4 mt-8 text-3xl font-semibold text-gray-900">
          {domToReact(node.children)}
        </h1>
      );
    }
    if (node.name === 'h2') {
      return (
        <h2 className="mb-4 mt-6 text-2xl font-semibold text-gray-800">
          {domToReact(node.children)}
        </h2>
      );
    }
    if (node.name === 'h3') {
      return (
        <h3 className="mb-3 mt-4 text-xl font-semibold text-gray-800">
          {domToReact(node.children)}
        </h3>
      );
    }
    if (node.name === 'ul') {
      return (
        <ul className="mb-6 list-disc pl-5 text-gray-800">
          {domToReact(node.children)}
        </ul>
      );
    }
    if (node.name === 'ol') {
      return (
        <ol className="mb-6 list-decimal pl-5 text-gray-800">
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
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://alfacecode.adaptable.app/api/posts/${slug}`)
      .then((response) => {
        if (response.status === 200) {
          const article = response.data.post;
          const comments = response.data.post.Comments;
          const relatedArticles = response.data.relatedPosts;
          setArticle(article);
          setComments(comments);
          setRelatedArticles(relatedArticles);
        }
      })
      .catch((error) => {
        setError('Ocorreu um erro ao carregar o artigo.');
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, [slug]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-200">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 px-4 py-8 sm:px-6 lg:px-8">
      {article && article.text ? (
        <div>
          <div className="mx-auto max-w-3xl rounded-md p-6 text-gray-800">
            {article.imageUrl?(
            <img
              className="h-80 w-full rounded-t-lg object-cover"
              src={defaultImage}
              alt={article.sinapse}
            />):(
              <img
              className="h-80 w-full rounded-t-lg object-cover"
              src={defaultImage}
              alt='imagem padrao - imagem para este artigo nao existe'
            />
            )}
            <div className="prose prose-lg dark:prose-dark">
              {parse(article.text, { replace: transformStyleOfText })}
            </div>
            <div className="mt-8 flex flex-col justify-end border-t-2">
              <p className="m-2 italic">Autor do artigo:</p>
              {article.User && (
                <Avatar
                  urlAvatar={article.User?.urlAvatar ?? ''}
                  firstname={article.User?.firstname ?? ''}
                  lastname={article.User?.lastname ?? ''}
                  created={article.createdAt}
                  bio={article.User?.bio ?? ''}
                />
              )}
            </div>
          </div>
          {relatedArticles.length > 0 && (
            <div className="mx-auto mt-8 max-w-3xl">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Artigos relacionados:
              </h3>
              <ul className="list-disc pl-5 text-gray-800">
                {relatedArticles.map((related) => (
                  <li key={related.id} className="mb-2">
                    <Link
                      to={`/home/read/article/${related.slug}`}
                      className="text-gray-800 hover:text-gray-700"
                    >
                      {related.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CommentComponent postId={article.id} />
          <div className="mx-auto mt-10 max-w-3xl p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-800">
              Ler comentários:
            </h4>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id}>
                  {comment.User && (
                    <Avatar
                      urlAvatar={comment.User?.urlAvatar ?? ''}
                      firstname={comment.User?.firstname ?? ''}
                      lastname={comment.User?.lastname ?? ''}
                      created={comment.createdAt}
                    />
                  )}
                  <p className="text-sm text-gray-600">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>Ainda não há comentários para este artigo.</p>
            )}
          </div>
        </div>
      ) : (
        <p>O artigo está carregando...</p>
      )}
    </main>
  );
}
