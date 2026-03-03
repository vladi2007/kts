import React from 'react';

import styles from './Pagination.module.scss';
import leftArrow from './icons/arrow-left.svg';
import rightArrow from './icons/arrow-right.svg';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    for (let i = 1; i <= pageCount; i++) pages.push(i);

    return Array.from(new Set(pages));
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.arrow} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <img src={leftArrow} alt="prev" />
      </button>
      <div style={{ display: 'flex' }}>
        {pages.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={idx}
              className={`${styles.page} ${p === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className={styles.ellipsis}>
              ...
            </span>
          )
        )}
      </div>
      <button
        className={`${styles.arrow} ${currentPage === pageCount ? styles.disabled : ''}`}
        onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
      >
        <img src={rightArrow} alt="next" />
      </button>
    </div>
  );
};

export default Pagination;
