import React from 'react';

const Pagination = ({pageInfo, onPageChange}) => {
  const totalPages = Math.ceil(pageInfo.total / pageInfo.pageSize);
  const currentPage = pageInfo.pageIndex + 1;

  const handlePageChange = (page) => {
    onPageChange(page - 1);
  };

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="flex space-x-2">
        {Array.from({length: totalPages}).map((_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
