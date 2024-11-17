import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">PrixMalin</Link>
          <SearchBar />
          <nav className="hidden md:flex space-x-6">
            <Link to="/categories" className="hover:text-blue-200">Catégories</Link>
            <Link to="/deals" className="hover:text-blue-200">Bons Plans</Link>
            <Link to="/favorites" className="hover:text-blue-200">Favoris</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;