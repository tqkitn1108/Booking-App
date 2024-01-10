import React, { useEffect } from 'react';
import './Pagi.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ currentPage, totalPages, onPageChange, searchParams }) => {
  const navigate = useNavigate();
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
  };
  const handlePageChange = (page) => {
    searchParams.set('page', page - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    onPageChange(page);
  };

  const handleClick = (i) => {
    handlePageChange(i);
    scrollToTop();
  };
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className="page-item">
          <button className="page-link" onClick={() => handleClick(i)}>{i}</button>
        </li>
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
    <div >
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={goToPrevPage} disabled={currentPage === 1}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {renderPagination()}
          <li className="page-item">
            <button className="page-link" aria-label="Next" onClick={goToNextPage} disabled={currentPage === totalPages}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;