import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuth';
import { Guest } from '@/lib/Guest';

const MainNavigation = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="bg-gray-800 relative w-full h-24">
      <div className="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
        <Link
          to="/"
          className="relative flex items-center inline-block h-5 h-full font-black leading-none"
        >
          <span className="text-xl text-gray-300">
            Golang<span className="text-blue-500">.</span>zone
          </span>
        </Link>

        <nav
          id="nav"
          className="absolute top-0 left-0 z-50 flex flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-sm text-gray-300 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
        >
          <NavLink
            end
            activeClassName="text-gray-50 underline"
            to="/"
            className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-gray-100"
          >
            Home
          </NavLink>

          <NavLink
            activeClassName="text-gray-50 underline"
            to="/posts"
            className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-gray-100"
          >
            Posts
          </NavLink>
        </nav>

        <Guest>
          <div className="absolute left-0 flex-col items-center justify-center hidden w-full text-gray-300 pb-8 mt-48 md:relative md:w-auto md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
            <NavLink
              activeClassName="text-gray-50 underline"
              to="/auth/login"
              className="relative z-40 px-3 py-2 mr-0 text-sm font-bold hover:text-gray-100 md:px-5 sm:mr-3 md:mt-0"
            >
              Login
            </NavLink>

            <NavLink
              activeClassName="text-gray-50 underline"
              to="/auth/register"
              className="relative z-40 px-3 py-2 mr-0 text-sm font-bold hover:text-gray-100 md:px-5 sm:mr-3 md:mt-0"
            >
              Register
            </NavLink>
          </div>
        </Guest>

        {user ? (
          <div className="absolute left-0 flex-col items-center justify-center hidden w-full text-gray-300 pb-8 mt-48 md:relative md:w-auto md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
            {user.name}
          </div>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="flex mt-10 items-center justify-center w-full overflow-x-hidden">
      <span className="py-6 text-center text-gray-500">
        © 2020 golang.zone. All rights reserved.
      </span>
    </footer>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <MainNavigation />

      <main className="relative items-center justify-center w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />
    </>
  );
};
