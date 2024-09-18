import { useState } from 'react';

export default function ProfileImageUpload({ onFileUploaded, avatar }) {
  const [previewImage, setPreviewImage] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      onFileUploaded(file);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {previewImage || avatar ? (
          <img
            src={previewImage || avatar}
            alt="Imagem do Perfil"
            className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover shadow-md"
          />
        ) : (
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <svg
              className="w-23 h-23 absolute -left-1 object-cover text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}

        <label
          htmlFor="profileImage"
          className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 12a3 3 0 110-6 3 3 0 010 6zm5.5-3h2.3a.7.7 0 00.2-1.4l-.6-1.3c-.2-.5-.7-.8-1.2-.8H6.9c-.5 0-1 .3-1.2.8L5 7.6a.7.7 0 00.2 1.4h2.3a5 5 0 0011 0zM5.7 16a2.5 2.5 0 01-1.9-4.2 7 7 0 0112.4 0A2.5 2.5 0 0114.3 16H5.7z" />
          </svg>
        </label>

        <input
          id="profileImage"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      {previewImage && (
        <p className="text-xs text-gray-500">Sua imagem vai aparecer assim.</p>
      )}
    </div>
  );
}
