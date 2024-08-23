import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <div className='flex w-full relative'>
      <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      <input
        className='w-full py-1 pl-10 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        placeholder='Search here'
      />
    </div>
  );
}

export default Search;
