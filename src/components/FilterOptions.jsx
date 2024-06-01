import React from 'react';

const FilterOptions = ({ filters, onChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="flex flex-wrap space-x-4 p-4 bg-gray-100 rounded shadow-md">
      <select
        name="category"
        className="p-2 border rounded"
        onChange={handleFilterChange}
        value={filters.category || ''}
      >
        <option value="">All Categories</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
      </select>
      <select
        name="source"
        className="p-2 border rounded"
        onChange={handleFilterChange}
        value={filters.source || ''}
      >
        <option value="">All Sources</option>
        <option value="newsOrg">News Org</option>
        <option value="guardian">The Guardian</option>
        <option value="nytimes">The New York Times</option>
      </select>
      <input
        type="date"
        name="date"
        className="p-2 border rounded"
        onChange={handleFilterChange}
        value={filters.date || ''}
      />
    </div>
  );
};

export default FilterOptions;
