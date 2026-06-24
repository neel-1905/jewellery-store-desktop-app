import { useEffect, useState } from "react";
import { initializeDatabase } from "./db/init";
import SplashScreen from "./components/common/splash-screen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function boot() {
      await initializeDatabase();
      setLoading(false);
    }

    boot();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <>Home</>;
}

export default App;
