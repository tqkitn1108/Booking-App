import React, { useState, useEffect } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    onPageChange(currentPage);
    // Do something when currentPage changes, like fetching new data
  }, [currentPage, onPageChange]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: '0.5rem',
            padding: '0.3rem 0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: currentPage === i ? '#eee' : 'transparent',
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPagination()}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;