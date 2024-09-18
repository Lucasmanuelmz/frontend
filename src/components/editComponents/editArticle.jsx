import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { authToken } from '../../token/token';
import { useCategory } from '../../containers/categoryContext';
import { useState, useEffect } from 'react';

export default function EditArticle() {
  const [article, setArticle] = useState({
    title: '',
    sinopse: '',
    text: '',
    categoryId: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id, slug } = useParams();
  const { categories } = useCategory();

  function handleChange(e) {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditorChange(content) {
    setArticle((prev) => ({
      ...prev,
      text: content,
    }));
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://alfacecode.adaptable.app/api/posts/${slug}`)
      .then((response) => {
        if (response.status === 200) {
          const article = response.data.post;
          setArticle(article);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Ocorreu um erro ao carregar o artigo.');
        setLoading(false);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('sinopse', article.sinopse);
    formData.append('post', article.text);
    formData.append('categoryId', article.categoryId);
    if (file) {
      formData.append('file', file);
    }

    axios.put(`https://alfacecode.adaptable.app/api/posts/${id}`, formData, {
      headers: {
        ...authToken().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  return (
    <div className="rounded bg-gray-200 p-4">
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form
          className="mx-auto max-w-3xl rounded-lg bg-gray-50 p-6"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-lg font-bold">Editar Artigo</h2>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleChange}
              className="w-full rounded border-none border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Sinopse
            </label>
            <textarea
              name="sinopse"
              value={article.sinopse}
              onChange={handleChange}
              className="w-full rounded border-none border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Post
            </label>
            <Editor
              apiKey="8d1v1qdgpz4dpvymqmk87cec15ji2wiho2yme8ue8qg2432o"
              value={article.text}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Adicionar Imagem
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full rounded border-none border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Categoria
            </label>
            <select
              name="categoryId"
              value={article.categoryId}
              onChange={handleChange}
              className="w-full rounded border-none border-gray-300 p-2"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
