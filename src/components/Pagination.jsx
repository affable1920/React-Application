import React from "react";
import { useContext } from "react";
import TaskContext from "../context/taskContext";

const Pagination = () => {
  const context = useContext(TaskContext);
  const { currentPage, pageSize, tasks, onPageChange } = context;

  const pagesCount = Math.ceil(tasks.length / pageSize);
  if (pagesCount === 1) return null;

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) pages.push(i);

  return (
    <nav id="pagination" className="nav">
      <ul style={{ cursor: "pointer" }} className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
