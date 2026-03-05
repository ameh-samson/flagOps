import type { FlagData } from "@/types";
import FlagsView from "./FlagsView";

const FlagsContainer = () => {
  const flagsData: FlagData[] = [
    {
      id: 1,
      name: "New Checkout Flow",
      description: "",
      environment: "development",
      status: true,
      rolloutPercentage: 75,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Dark Mode Beta",
      description: "",
      environment: "development",
      status: true,
      rolloutPercentage: 50,
      lastUpdated: "5 hours ago",
    },
    {
      id: 3,
      name: "Payment Gateway V2",
      description: "",
      environment: "development",
      status: false,
      rolloutPercentage: 0,
      lastUpdated: "1 day ago",
    },
    {
      id: 4,
      name: "AI Recommendations",
      description: "",
      environment: "development",
      status: true,
      rolloutPercentage: 25,
      lastUpdated: "3 hours ago",
    },
  ];

  return <FlagsView flagsData={flagsData} />;
};

export default FlagsContainer;
