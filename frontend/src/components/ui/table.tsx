import { useState } from "react";
import emptyImg from "@/assets/svg/empty-table.svg";
import LeftArrow from "@/assets/tsxSvg/left-arrow";
import SkeletonTable from "./skeleton-table";

interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  showAction?: boolean;
  renderAction?: (row: T, index?: number) => React.ReactNode;
  rowsPerPage?: number;
  showPagination?: boolean;
  rowClassName?: (row: T) => string;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string;
  totalTablePages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  emptyMessage?: string;
  emptySubMessage?: string;
  onPageChange?: (direction: "next" | "prev") => void;
  actionColumnWidth?: string;
}

const Table = <T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data = [],
  showAction = false,
  renderAction,
  rowsPerPage = 20,
  totalTablePages,
  hasNextPage,
  hasPrevPage,
  showPagination = true,
  rowClassName,
  isLoading = false,
  isEmpty = false,
  error,
  emptyMessage,
  emptySubMessage,
  onPageChange,
  actionColumnWidth = "10%",
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = totalTablePages || Math.ceil(data.length / rowsPerPage);

  const isApiMode = Boolean(onPageChange);

  const currentData = isApiMode
    ? data
    : data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const goToPage = (page: number) => {
    if (page < 1) return;

    if (isApiMode) {
      if (!hasNextPage && page > currentPage) return;
      setCurrentPage(page);
      if (onPageChange) {
        const direction = page > currentPage ? "next" : "prev";
        onPageChange(direction);
      }
    } else {
      if (page > totalPages) return;
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <SkeletonTable columns={columns.length} showAction={showAction} />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-[#EAECF0] p-12 text-center">
        <div className="text-red-500 text-lg font-medium mb-2">Error</div>
        <div className="text-[#6C6C6C] text-sm">{error}</div>
      </div>
    );
  }

  if (isEmpty || currentData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#EAECF0] p-12 text-center flex flex-col items-center justify-center">
        <img src={emptyImg} alt="empty" />
        <p className="font-bold text-[#303030] text-sm mt-4 mb-1">
          {emptyMessage ?? "No data available"}
        </p>
        <p className="text-[#A0A0A0] text-sm">
          {emptySubMessage ?? "There are no records to display at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
      <div className="overflow-x-auto table-scroll">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="text-[#6B7280] bg-[#FAFBFB] lg:text-xs text-[10px] text-nowrap border-b border-b-[#EAECF0]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-3.5 px-6 font-normal"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
              {showAction && (
                <th
                  className="py-3.5 px-6 font-normal"
                  style={{ width: actionColumnWidth }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="lg:text-sm text-xs font-normal text-[#303030]">
            {(isApiMode ? data : currentData).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-[#FAFAFA] lg:p-6 p-3 border-b border-b-[#EAECF0] ${
                  rowClassName ? rowClassName(row) : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-6">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
                {showAction && (
                  <td className="p-6 relative">
                    {renderAction ? renderAction(row, rowIndex) : null}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex justify-between items-center p-6 text-sm text-[#6C6C6C] bg-white">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={isApiMode ? !hasPrevPage : currentPage === 1}
            className={`px-3.5 py-2 rounded-lg border flex items-center gap-2 ${
              (isApiMode ? !hasPrevPage : currentPage === 1)
                ? "text-[#BFBFBF] cursor-not-allowed border-[#ECECEC]"
                : "text-[#595959] border-[#DEDEDE]"
            }`}
          >
            <span>
              <LeftArrow />
            </span>
            Previous
          </button>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={isApiMode ? !hasNextPage : currentPage === totalPages}
            className={`px-3.5 py-2 rounded-lg border flex items-center gap-2 ${
              (isApiMode ? !hasNextPage : currentPage === totalPages)
                ? "text-[#BFBFBF] cursor-not-allowed border-[#ECECEC]"
                : "text-[#595959] border-[#DEDEDE]"
            }`}
          >
            Next
            <span className="-rotate-180">
              <LeftArrow />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
