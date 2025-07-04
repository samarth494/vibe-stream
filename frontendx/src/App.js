import { useEffect, useState } from "react";
import logo from "./assets.png";
import "./App.css";
import SearchBar from "./components/searchBar";
import MusicPlayer from "./components/musicPlayer";
import NavBar from "./components/navBar"; 
function App() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 7000);
    const timer2 = setTimeout(() => setStep(2), 10000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="App">
      {step === 0 && (
        <div className="loader-screen">
          <img src={logo} alt="Logo" className="logo" />
          <div className="loading-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="main-dashboard">
          <h1>Welcome to TUNE WAVE 🎧</h1>
        </div>
      )}

      {step === 2 && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
            padding: "20px",
          }}
        >
          <NavBar /> {/* ✅ NavBar added here */}
          <SearchBar onSearch={(query) => console.log("Searching for:", query)} /> 
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default App;
