import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useCategory } from '../containers/categoryContext';
import { Link } from 'react-router-dom';

export default function HeaderPublic() {
  const [open, setOpen] = useState(false);
  const { categories } = useCategory();

  const categoriesPosition1Row1 = categories.filter(
    (category) => category.position === 1
  );
  const categoriesPosition2Row2 = categories.filter(
    (category) => category.position === 2
  );

  return (
    <div className="bg-gray-200">
      <header className="relative">
        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="hidden bg-indigo-300 lg:flex">
            <div className="flex h-10 w-full items-center justify-between px-11">
              <div className="flex space-x-8">
                {categoriesPosition1Row1.map((category) => (
                  <Link
                    key={category.name}
                    to={`home/${category.slug}`}
                    className="text-sm font-medium capitalize text-gray-900 hover:text-gray-950"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-900 hover:text-gray-950"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-gray-900 hover:text-gray-950"
                >
                  Criar nova conta
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="flex h-14 items-center justify-between px-6">
              <Link to="/" className="font-serif text-2xl text-gray-800">
              <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
           <circle cx="40" cy="40" r="20" fill="darkblue"/>
            <text x="25" y="48" fontFamily="Arial" fontSize="22" fill="white" fontWeight="bold">A</text>
           <text x="80" y="50" fontFamily="Arial" fontSize="30" fontWeight="bold">
            <tspan fill="darkblue">A</tspan>
           <tspan fill="#3B82F6">Code</tspan>
           </text>
             </svg>

              </Link>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative rounded-md bg-gray-200 p-2 text-gray-800 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="hidden lg:ml-auto lg:flex lg:space-x-8">
                {categoriesPosition2Row2.map((category) => (
                  <Link
                    key={category.name}
                    to={`home/${category.slug}`}
                    className="text-sm font-medium capitalize text-gray-900 hover:text-gray-950"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {open && (
            <div className="lg:hidden">
              <div className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`home/${category.slug}`}
                    className="block px-4 py-2 text-xs font-medium text-gray-800"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
