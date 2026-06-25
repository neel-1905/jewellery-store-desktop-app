import CustomerStatCard from "./customer-stat-card";
import { IconName } from "@/types/icon.types";

type Stats = {
  title: string;
  value: string;
  icon: IconName;
  color: "purple" | "green" | "blue" | "orange";
};

function CustomerStats() {
  const stats: Stats[] = [
    {
      title: "Total Orders",
      value: "10",
      icon: "Package",
      color: "purple",
    },
    {
      title: "Total Spent",
      value: "1000",
      icon: "IndianRupee",
      color: "green",
    },
    {
      title: "Last Order",
      value: "10 days ago",
      icon: "Calendar",
      color: "blue",
    },
    {
      title: "Outstanding",
      value: "10",
      icon: "Clock",
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <CustomerStatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default CustomerStats;
