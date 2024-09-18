import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { authToken } from '../token/token';
import { useUser } from './protect';
import { useCategory } from './categoryContext';
import {useNavigate} from 'react-router-dom';

export default function FormContainer() {
  const [title, setTitle] = useState('');
  const [textSinopse, setTextSinopse] = useState('');
  const [textContent, setTextContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useUser();
  const { categories } = useCategory();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);

  function statusMessage() {
    if(messageSuccess) {
      return <div className='p-6 mx-auto max-w-3xl'>
        <h1 className='font-bold text-center text-3xl text-green-600 bg-green-100'>
          {messageSuccess}
        </h1>
      </div>
    } else if(sendMessage && !messageSuccess) {
      return <div className='p-6 mx-auto max-w-3xl'>
      <h1 className='font-bold text-center text-3xl text-red-600 bg-red-100'>
        Erro ao enviar artigo
      </h1>
    </div>
  }
  }

  function handleEditorChange() {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setTextContent(content);
    }
  }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleChangeTex(e) {
    setTextSinopse(e.target.value);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', textContent);
    formData.append('sinopse', textSinopse);
    formData.append('categoryId', categoryId);
    formData.append('userId', user.id);
    if (file) {
      formData.append('file', file);
    }

    axios
      .post('https://alfacecode.adaptable.app/api/posts', formData, {
        headers: {
          ...authToken().headers,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if ((response.status === 201)) {
          const Message = response.data.msg;
          setMessageSuccess(Message);
          setSendMessage(true)
          setTimeout(() => {
            navigate('/dashboard/posts/list');
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          console.log('statys: '+error.status, 'response: '+error.response.status)
          setErrors(error.response?.data?.errors ?? []);
        } else {
          setSendMessage(true)
        }
      }); 
  }

  return (
    <>
    {statusMessage()}
      {user ? (
        <div className="flex min-h-screen items-center justify-center border-gray-500 bg-gray-200 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-gray-50 p-6">
            <div className="mb-6 bg-green-200 p-3">
              <h2 className="text-sm font-semibold text-green-700">
                Bem-vindo, {user.firstname}!
              </h2>
              <p className="text-sm text-gray-700">
                Estamos felizes em ver você. Crie algo incrível hoje!
              </p>
            </div>

            <h1 className="mb-6 text-2xl font-semibold text-gray-700">
              Crie um novo artigo
            </h1>

            <form className="rounded-lg bg-gray-50 p-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  value={title}
                  className="mt-1 block w-full rounded border-b bg-gray-50 px-4 py-2 text-sm text-gray-700 shadow-sm outline-none focus:outline-none"
                  placeholder="Digite o título do artigo"
                />
                {errors.length > 0 &&
                  errors.map((error, index) => (
                    <div key={index}>
                      {error.path === 'title' ? (
                        <p className="text-sm italic text-red-800">
                          {error.msg}
                        </p>
                      ) : null}
                    </div>
                  ))}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="sinopse"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrição:
                </label>
                <input
                  type="text"
                  id="sinopse"
                  name="sinopse"
                  onChange={handleChangeTex}
                  value={textSinopse}
                  className="mt-1 block w-full rounded border-b bg-gray-50 px-4 py-2 text-sm text-gray-700 shadow-sm outline-none focus:outline-none"
                  placeholder="Digite a descrição do artigo"
                />
                {errors.length > 0 &&
                  errors.map((error, index) => (
                    <div key={index}>
                      {error.path === 'sinopse' ? (
                        <p className="text-sm italic text-red-800">
                          {error.msg}
                        </p>
                      ) : null}
                    </div>
                  ))}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-50"
                ></label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="block rounded-md border border-none border-gray-300 bg-blue-700 px-4 py-2 font-medium text-gray-100 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {file ? file.name : 'Escolha uma imagem'}
                </button>
              </div>

              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Este é o texto inicial no editor.</p>"
                onEditorChange={handleEditorChange}
                apiKey="8d1v1qdgpz4dpvymqmk87cec15ji2wiho2yme8ue8qg2432o"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                  block_formats:
                    'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Code=code',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
                }}
                className="custom-tiny-editor"
              />
              {errors.length > 0 ? (
                <>
                  {errors.map((error, index) => (
                    <div key={index}>
                      {error.path === 'text' ? (
                        <p className="text-sm italic text-red-800">
                          {error.msg}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </>
              ) : null}

              <div className="my-6">
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Escolha uma categoria para o seu artigo:
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-3 block w-full rounded border-none border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option className="text-sm text-gray-500" value="">
                    Selecione uma categoria
                  </option>
                  {categories.map((category) => (
                    <option
                      className="text-sm text-gray-500"
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="mt-3.5 w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enviar artigo
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Inscreva-se ou faça login para ter acesso ao conteúdo</p>
      )}
    </>
  );
}