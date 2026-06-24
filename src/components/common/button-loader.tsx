import { Loader2 } from "lucide-react";

function ButtonLoader({ size = 20 }: { size?: number }) {
  return (
    <div className="flex-center">
      <Loader2 className="animate-spin" size={size} />
    </div>
  );
}

export default ButtonLoader;
