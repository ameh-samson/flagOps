import Card from "./Card";
import RecentActivity from "./RecentActivity";
import RequestVolume from "./RequestVolume";

type DashboardViewProps = {
  cardData: { id: number; title: string; current: number; previous: number }[];
  histogramData?: { date: string; count: number }[];
  recentActivities: {
    id: number;
    user: string;
    action: string;
    flag: string;
    time: string;
    environment: string;
  }[];
};

const DashboardView = ({
  cardData,
  histogramData,
  recentActivities,
}: DashboardViewProps) => {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cardData.map((card) => {
          const change = card.current - card.previous;
          const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral";
          const changeText = `${change > 0 ? "+" : ""}${change}`;

          return (
            <Card
              key={card.id}
              title={card.title}
              value={card.current}
              change={changeText}
              trend={trend}
            />
          );
        })}
      </section>

      <section className="mt-6 flex flex-wrap-reverse gap-5 w-full">
        <RequestVolume data={histogramData} />
        <RecentActivity activities={recentActivities} />
      </section>
    </>
  );
};

export default DashboardView;
