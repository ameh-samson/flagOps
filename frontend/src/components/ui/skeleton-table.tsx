interface SkeletonTableProps {
  columns: number;
  rows?: number;
  showAction?: boolean;
}

const SkeletonTable = ({
  columns,
  rows = 10,
  showAction = false,
}: SkeletonTableProps) => {
  return (
    <>
      {/* Mobile skeleton - hidden on md and up */}
      <div className="md:hidden space-y-4 sm:space-y-0 grid sm:grid-cols-2 items-center sm:gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="border border-[#E6E6E6] rounded-[10px] p-4 space-y-3 animate-pulse"
          >
            <div className="flex items-center justify-between mb-3 gap-1 border-b border-b-[#ECECEC] pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="h-3 bg-gray-200 rounded w-8"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table skeleton - hidden below md */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg border border-[#EAECF0]">
      <table className="min-w-full text-left border-collapse">
        <thead className="text-[#595959] bg-[#FAFBFB] text-xs font-medium border-b border-b-[#EAECF0]">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="py-3.5 px-6">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </th>
            ))}
            {showAction && (
              <th className="py-3.5 px-6">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-b-[#EAECF0]">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-30"></div>
                </td>
              ))}
              {showAction && (
                <td className="p-6">
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default SkeletonTable;
