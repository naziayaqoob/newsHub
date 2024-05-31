import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="flex items-center space-x-2 p-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >Search</button>
        </form>
    );
};

export default SearchBar;
