import React, { useState, useEffect } from 'react';
import './Pagi.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange, searchParams }) => {
  const navigate = useNavigate();
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    searchParams.set('page', page - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    onPageChange(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button classname="pagination-button"
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: '0.5rem',
            padding: '0.17rem 0.5rem 0.3rem 0.47rem',
            border: '1px solid #ccc',
            borderRadius: '10px',
            background: currentPage === i ? '#a4d0f4' : 'transparent',
            justifyContent: 'center',
            height: '30px',
            width: '30px',
            borderRadius: '100%',
            fontSize: '14px',

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
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  return (
    <div className="pagination-container">
      <button onClick={goToPrevPage} disabled={currentPage === 1} className="pagination-button">
        <i className="fas fa-arrow-left"></i>
      </button >
      {renderPagination()}
      <button onClick={goToNextPage} disabled={currentPage === totalPages} className="pagination-button">
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Pagination;