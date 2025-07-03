import { useEffect, useState } from "react";
import logo from "./assets.png";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loader-screen">
          <img src={logo} alt="Tune Wave Logo" className="logo" />
          <p className="loading-text">Loading TUNE WAVE...</p>
        </div>
      ) : (
        <div className="main-dashboard">
          <h1>Welcome to TUNE WAVE 🎧</h1>
        </div>
      )}
    </div>
  );
}

export default App;
