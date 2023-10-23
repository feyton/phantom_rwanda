import React from 'react';

const SearchFilter = ({ filter, setfilter, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        value={filter || ''}
        onChange={(e) => setfilter(e.target.value)}
        placeholder={placeholder}
        name="search"
        className="p-1 rounded-md border-2"
      />
    </div>
  );
};

export default SearchFilter;
