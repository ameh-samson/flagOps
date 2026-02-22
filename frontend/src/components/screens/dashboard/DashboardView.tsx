import Card from "./Card";

type DashboardViewProps = {
  cardData: { id: number; title: string; current: number; previous: number }[];
};

const DashboardView = ({ cardData }: DashboardViewProps) => {
  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
    </div>
  );
};

export default DashboardView;
