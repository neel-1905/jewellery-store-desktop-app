import { icons, LucideProps } from "lucide-react";

type IconName = keyof typeof icons;

function DynamicLucideIcon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}

export default DynamicLucideIcon;
