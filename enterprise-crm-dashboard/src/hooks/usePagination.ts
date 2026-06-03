import { useMemo, useState } from "react";

export const usePagination = <T>(items: T[], pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  return { currentPage, totalPages, paginatedItems, setCurrentPage };
};
