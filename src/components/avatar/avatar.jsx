import { PropTypes } from 'prop-types';

export default function Avatar({
  urlAvatar,
  firstname,
  lastname,
  created,
  bio,
}) {
  return (
    <div className="my-8 flex flex-col items-center gap-4">
      {urlAvatar ? (
        <img
          className="h-10 w-10 rounded-full"
          src={urlAvatar}
          alt={`Foto de perfil de ${firstname}}`}
        />
      ) : (
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <svg
            className="absolute -left-1 h-12 w-12 text-gray-400"
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
      <div className="font-medium dark:text-white">
        <div className="text-sm font-semibold italic text-gray-800">
          {firstname} {lastname}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Publicado em: {created}
        </div>
      </div>
      <div className="p-6 text-sm font-normal italic">
        <p>{bio}</p>
      </div>
    </div>
  );
}

Avatar.propTypes = {
  urlAvatar: PropTypes.string,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  created: PropTypes.string,
  bio: PropTypes.string,
};
