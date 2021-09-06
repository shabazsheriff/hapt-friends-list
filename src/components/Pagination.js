import React from "react";

export default function Pagination({
  usersPerPage,
  currentPage,
  totalUsers,
  paginateTo,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`nav-page ${currentPage === number ? "active" : ""}`}
            onClick={() => paginateTo(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}
