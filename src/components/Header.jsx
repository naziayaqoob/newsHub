import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:underline text-white">News Aggregator</Link>
                </h1>
                <nav className="space-x-4">
                    <Link to="/" className="hover:underline text-white">Home</Link>
                    <Link to="/about" className="hover:underline text-white">About</Link>
                    <Link to="/contact" className="hover:underline text-white">Contact</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
