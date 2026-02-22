import activeIcon from "@/assets/svg/active-flags.svg";
import totalRequestsIcon from "@/assets/svg/total-request.svg";
import usersImpactedIcon from "@/assets/svg/user-impacted.svg";
import staleFlagsIcon from "@/assets/svg/stale-flags.svg";
import type { CardProps } from "@/types";
import ArrowUp from "@/assets/tsxSvg/arrow-up";
import ArrowDown from "@/assets/tsxSvg/arrow-down";

const Card = ({ title, value, change, trend }: CardProps) => {
  const iconMap: Record<string, string> = {
    "Active Flags": activeIcon,
    "Total Requests": totalRequestsIcon,
    "Users Impacted": usersImpactedIcon,
    "Stale Flags": staleFlagsIcon,
  };

  const trendColor = trend === "up" ? "text-[#16A34A]" : "text-red-500";

  return (
    <div className="bg-white rounded-lg p-5 drop-shadow-sm flex items-start justify-between min-h-35.25">
      <div className="space-y-4">
        <h2 className="text-xs text-subtext">{title}</h2>
        <p className="text-2xl font-bold text-secondary">{value}</p>
        <p className={`text-xs ${trendColor} flex items-center gap-1`}>
          <span className="flex items-center gap-1 font-medium">
            {trend === "up" ? (
              <ArrowUp />
            ) : trend === "down" ? (
              <ArrowDown />
            ) : null}
            {change}
          </span>
          <span className="text-subtext">from last week</span>
        </p>
      </div>

      <img src={iconMap[title]} alt={title} />
    </div>
  );
};

export default Card;
