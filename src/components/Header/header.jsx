import {
  Disclosure,
  DisclosureButton,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useUser } from '../../containers/protect';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardHeader() {
  const { user } = useUser();

  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    {
      name: 'Nova categoria',
      href: user ? `/dashboard/user/${user.id}/create/categories` : '#',
      current: false,
    },
    { name: 'Projects', href: '#', current: false },
    { name: 'Lista de artigos', href: '/dashboard/posts/list', current: false },
    { name: 'Home', href: '/', current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-300 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="block h-6 w-6 group-open:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden h-6 w-6 group-open:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>

          {/* Logo and navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <svg
                width="150"
                height="40"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 80"
              >
                <circle cx="40" cy="40" r="30" fill="darkblue" />
                <text
                  x="25"
                  y="48"
                  fontFamily="Arial"
                  fontSize="18"
                  fill="white"
                  fontWeight="bold"
                >
                  A
                </text>
                <text
                  x="80"
                  y="50"
                  fontFamily="Arial"
                  fontSize="20"
                  fontWeight="bold"
                >
                  <tspan fill="darkblue">A</tspan>
                  <tspan fill="#3B82F6">Code</tspan>
                </text>
              </svg>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-200 text-gray-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-600',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile and notifications */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-gray-200 p-1 text-gray-700 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.urlAvatar}
                    alt="User"
                  />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-200 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <Link
                    to={`/dashboard/profile/${user.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Seu perfil
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-200 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
