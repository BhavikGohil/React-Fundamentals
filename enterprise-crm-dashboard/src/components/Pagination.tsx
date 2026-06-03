import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 p-2 disabled:opacity-40 dark:border-slate-700"
      >
        <ChevronLeft size={18} />
      </button>

      <span className="text-sm text-slate-600 dark:text-slate-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-300 p-2 disabled:opacity-40 dark:border-slate-700"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;