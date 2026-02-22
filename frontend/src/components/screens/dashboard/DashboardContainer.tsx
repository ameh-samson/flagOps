import DashboardView from "./DashboardView";

const DashboardContainer = () => {
  const data = [
    { id: 1, title: "Active Flags", current: 24, previous: 19 },
    { id: 2, title: "Total Requests", current: 45, previous: 50 },
    { id: 3, title: "Users Impacted", current: 5, previous: 3 },
    { id: 4, title: "Stale Flags", current: 300, previous: 295 },
  ];

  const histogramData = [
    { date: "Mon", count: 12 },
    { date: "Tue", count: 19 },
    { date: "Wed", count: 15 },
    { date: "Thu", count: 25 },
    { date: "Fri", count: 22 },
    { date: "Sat", count: 18 },
    { date: "Sun", count: 20 },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "enabled",
      flag: "new-checkout-flow",
      time: "10 mins ago",
      environment: "Production",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "updated",
      flag: "dark-mode-beta",
      time: "1 hour ago",
      environment: "Staging",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "disabled",
      flag: "legacy-payment",
      time: "2 hours ago",
      environment: "Production",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      flag: "ai-recommendations",
      time: "3 hours ago",
      environment: "Development",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      flag: "ai-recommendations",
      time: "3 hours ago",
      environment: "Development",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      flag: "ai-recommendations",
      time: "3 hours ago",
      environment: "Development",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      flag: "ai-recommendations",
      time: "3 hours ago",
      environment: "Development",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      flag: "ai-recommendations",
      time: "3 hours ago",
      environment: "Development",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "created",
      flag: "ai-recommendations",
      time: "3 hours ago",
      environment: "Development",
    },
  ];

  return (
    <DashboardView
      cardData={data}
      histogramData={histogramData}
      recentActivities={recentActivities}
    />
  );
};

export default DashboardContainer;
