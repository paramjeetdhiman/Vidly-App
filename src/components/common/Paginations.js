import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav className="ul pagination">
      {pages.map((page, i) => (
        <li
          key={i}
          className={page === currentPage ? "page-item active" : "page-item"}>
          <a className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>   
      ))}
    </nav>
  );
};

export default Pagination;
