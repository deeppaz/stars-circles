import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, total }) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return; 
    }
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <a
        className="flex items-center cursor-pointer px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 light:bg-gray-900 light:text-gray-200 light:border-gray-700 light:hover:bg-gray-800"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>

        <span>Previous</span>
      </a>

      <div className="items-center hidden md:flex gap-x-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <a
            key={index}
            className={`px-2 py-1 cursor-pointer text-sm rounded-md ${
              currentPage === index + 1
                ? "text-blue-500 bg-blue-100/60"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </a>
        ))}
        <span
          style={{
            border: "1px solid gray",
            padding: "2px",
            color: "gray",
            fontSize: "12px",
          }}
        >
          Per page: 10 - Total Page: {totalPages} - Total Item: {total}
        </span>
      </div>

      <a
        className="flex items-center cursor-pointer px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 light:bg-gray-900 light:text-gray-200 light:border-gray-700 light:hover:bg-gray-800"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span>Next</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </a>
    </div>
  );
};

export default Pagination;
