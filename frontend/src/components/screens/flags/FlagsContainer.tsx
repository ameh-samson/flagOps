import type { FlagData } from "@/types";
import FlagsView from "./FlagsView";

const FlagsContainer = () => {
  const flagsData: FlagData[] = [
    {
      id: 1,
      name: "New Checkout Flow",
      key: "new-checkout-flow",
      status: true,
      rolloutPercentage: 75,
      lastUpdated: "2 hours ago",
      tags: ["production", "checkout"],
    },
    {
      id: 2,
      name: "Dark Mode Beta",
      key: "dark-mode-beta",
      status: true,
      rolloutPercentage: 50,
      lastUpdated: "5 hours ago",
      tags: ["beta", "ui"],
    },
    {
      id: 3,
      name: "Payment Gateway V2",
      key: "payment-gateway-v2",
      status: false,
      rolloutPercentage: 0,
      lastUpdated: "1 day ago",
      tags: ["payment", "critical"],
    },
    {
      id: 4,
      name: "AI Recommendations",
      key: "ai-recommendations",
      status: true,
      rolloutPercentage: 25,
      lastUpdated: "3 hours ago",
      tags: ["ai", "experimental"],
    },
  ];

  return <FlagsView flagsData={flagsData} />;
};

export default FlagsContainer;
