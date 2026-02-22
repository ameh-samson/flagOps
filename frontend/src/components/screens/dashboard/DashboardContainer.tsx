import DashboardView from "./DashboardView";

const DashboardContainer = () => {
  const data = [
    { id: 1, title: "Active Flags", current: 24, previous: 19 },
    { id: 2, title: "Total Requests", current: 45, previous: 50 },
    { id: 3, title: "Users Impacted", current: 5, previous: 3 },
    { id: 4, title: "Stale Flags", current: 300, previous: 295 },
  ];

  return <DashboardView cardData={data} />;
};

export default DashboardContainer;
