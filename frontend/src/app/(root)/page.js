import React from "react";
import { BsCoin } from "react-icons/bs";

const DashboardCard = () => {
  return (
    <div className="flex items-center justify-between border p-3">
      <BsCoin className="text-3xl" />
      <div className="flex flex-col gap-y-2">
        <p>Amount</p>
        <h1>&#x20A8; 45</h1>
      </div>
    </div>
  );
};

function HomePage() {
  return (
    <div className="py-10 flex flex-col gap-y-4 ">
      <div className="">
        <h1 className="text-5xl font-bold">Husna</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3">
        {Array(10)
          .fill(null)
          .map((cur, i) => {
            return <DashboardCard key={i} />;
          })}
      </div>
    </div>
  );
}

export default HomePage;
