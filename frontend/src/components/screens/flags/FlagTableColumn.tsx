import MoreDot from "@/assets/tsxSvg/more-dot";
import Dropdown from "@/components/ui/drop-down";
import type { FlagData, FlagTableColumn } from "@/types";

const flagTableColumns: FlagTableColumn[] = [
  {
    key: "status",
    label: "Status",
    width: "10%",
    render: (row: FlagData) => (
      <div className="relative inline-flex items-center">
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            row.status ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
              row.status ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    ),
  },
  {
    key: "name",
    label: "Flag Details",
    width: "20%",
    render: (row: FlagData) => (
      <div>
        <p className="text-sm font-medium text-secondary truncate">
          {row.name}
        </p>
        <p>{row.environment}</p>
      </div>
    ),
  },
  {
    key: "description",
    label: "Description",
    width: "20%",
    render: (row: FlagData) => (
      <p className="text-sm font-medium text-secondary truncate">
        {row.description}
      </p>
    ),
  },
  {
    key: "rolloutPercentage",
    label: "Rollout",
    width: "20%",
    render: (row: FlagData) => (
      <>
        <div className="flex items-center justify-between text-xs mb-1">
          <p className="text-xs text-subtext ">Percentage </p>

          <span className="font-medium text-secondary">
            {row.rolloutPercentage}%
          </span>
        </div>
        <div className="bg-[#D1D5DB] h-1.5 rounded-full w-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${row.rolloutPercentage}%` }}
          />
        </div>
      </>
    ),
  },
  {
    key: "lastUpdated",
    label: "Last Updated",
    width: "15%",
    render: (row: FlagData) => (
      <span className="text-sm text-subtext truncate block">
        {row.lastUpdated}
      </span>
    ),
  },
  {
    key: "action",
    label: "Action",
    width: "10%",
    render: () => (
      <Dropdown
        trigger={
          <button
            id="action"
            aria-label="more options"
            className="cursor-pointer"
          >
            <MoreDot />
          </button>
        }
      >
        {({ closeMenu }) => (
          <div className="py-1">
            <button
              type="button"
              id="edit"
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={closeMenu}
            >
              Edit
            </button>
            <button
              type="button"
              id="delete"
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              onClick={closeMenu}
            >
              Delete
            </button>
          </div>
        )}
      </Dropdown>
    ),
  },
];

export default flagTableColumns;
