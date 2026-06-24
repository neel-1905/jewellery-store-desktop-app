import { LoaderCircle } from "lucide-react";

const SplashScreen = () => {
  return (
    <div className="screen-center">
      <LoaderCircle className="animate-spin" size={50} />
    </div>
  );
};

export default SplashScreen;
