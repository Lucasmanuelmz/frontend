import { Link } from 'react-router-dom';

export function FooterPage() {
  return (
    <footer className="mx-auto mt-11 bg-indigo-500 py-6 text-gray-900">
      <div className="container mx-auto text-center sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 flex justify-center space-x-6 sm:mb-0">
          <Link to="/about" className="text-xs hover:text-gray-800">
            Sobre
          </Link>
          <Link
            to="/politicas-de-privacidade-e-termos-de-uso"
            className="text-xs hover:text-gray-800"
          >
            Politicas de privacidade
          </Link>
          <Link to="#" className="text-xs hover:text-gray-800">
            Contato
          </Link>
        </div>
      </div>

      <div className="my-4 border-t border-indigo-400"></div>

      <div className="text-center text-sm">
        <p className="text-xs">
          &copy; 2024 Lucas Manuel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
