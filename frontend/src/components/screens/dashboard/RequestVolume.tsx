import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Dropdown from "@/components/ui/drop-down";
import { useState } from "react";
import dropdownIcon from "@/assets/svg/dropdown-icon.svg";

interface HistogramProps {
  data?: { date: string; count: number }[];
}

const RequestVolume = ({ data = [] }: HistogramProps) => {
  const [period, setPeriod] = useState("7 days");

  const periods = ["7 days", "30 days", "90 days"];

  return (
    <div className="bg-white rounded-lg p-5 drop-shadow-sm drop-shadow-black/5 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-secondary">Request Volume</h2>
        <Dropdown
          trigger={({ isOpen }) => (
            <button className="flex items-center justify-between gap-2 px-3 py-2 text-sm border border-gray-300 min-w-30 rounded-md cursor-pointer">
              {period}
              <img
                src={dropdownIcon}
                alt="dropdown icon"
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
          align="right"
        >
          {({ closeMenu }) => (
            <div className="py-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94A3B8" />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip cursor={false} />
          <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RequestVolume;
