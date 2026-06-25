import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { cn } from "@/lib/utils";
import { IconName } from "@/types/icon.types";

const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500",
    icon: "text-purple-500",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500",
    icon: "text-green-500",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500",
    icon: "text-blue-500",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500",
    icon: "text-orange-500",
  },
};

interface CustomerStatCardProps {
  title: string;
  value: string;
  icon: IconName;
  color: keyof typeof colorMap;
}

function CustomerStatCard({
  title,
  value,
  icon,
  color,
}: CustomerStatCardProps) {
  const { bg, border, icon: iconColor } = colorMap[color];

  return (
    <div className={cn("stat-card", bg)}>
      <div className={cn("stat-card-icon", border)}>
        <DynamicLucideIcon name={icon} className={iconColor} size={16} />
      </div>
      <div className="stat-card-content">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-title">{title}</div>
      </div>
    </div>
  );
}

export default CustomerStatCard;
