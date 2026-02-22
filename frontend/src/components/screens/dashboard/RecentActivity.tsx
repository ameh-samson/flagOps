import { Link } from "react-router";
import clockIcon from "@/assets/svg/clock.svg";
import type { RecentActivityProps } from "@/types";

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getEnvironmentStyle = (env: string) => {
    switch (env) {
      case "Production":
        return "bg-[#DCFCE7] text-[#166534]";
      case "Staging":
        return "bg-[#FEF3C7] text-[#92400E]";
      case "Development":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div className="bg-white rounded-lg p-5 drop-shadow-sm drop-shadow-black/5 w-full max-w-102.5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-secondary">
          Recent Activity
        </h2>
        <Link to="/analytics" className="text-[#4B5563] text-xs font-medium">
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3 overflow-y-auto max-h-80">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="size-8 rounded-full bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center shrink-0">
              <span className="text-xs font-medium">
                {activity.user.charAt(0)}
              </span>
            </div>

            <div className="flex-1">
              <p className="text-secondary font-medium text-xs">
                {activity.user}{" "}
                <span className="font-normal">{activity.action} </span>
                <span className="bg-[#EEF2FF] text-primary p-1 rounded-sm">
                  {activity.flag}
                </span>
              </p>

              <div className="flex items-center gap-2 text-subtext text-[10px] mt-1">
                <div className="flex items-center">
                  <img
                    src={clockIcon}
                    alt="Clock icon"
                    className="size-3 mr-1"
                  />
                  <p>{activity.time}</p>
                </div>

                <div className="size-1 rounded-full bg-[#D1D5DB]" />

                <div
                  className={`${getEnvironmentStyle(activity.environment)} rounded-full flex items-center gap-1.5 py-1.5 px-2.5`}
                >
                  <div className="size-2 rounded-full bg-current opacity-60" />
                  <p className="text-[10px]">{activity.environment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
