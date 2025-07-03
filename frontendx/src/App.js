// // import { useEffect, useState } from "react";
// // import logo from "./assets.png";
// // import "./App.css";

// // function App() {
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setLoading(false);
// //     }, 7000); // 10 seconds
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="App">
// //       {loading ? (
// //         <div className="loader-screen">
// //           <img src={logo} alt="Tune Wave Logo" className="logo" />
// //           <p className="loading-text">Loading TUNE WAVE...</p>
// //         </div>
// //       ) : (
// //         <div className="main-dashboard">
// //           <h1>Welcome to TUNE WAVE 🎧</h1>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;  

// import { useEffect, useState } from "react";
// import logo from "./assets.png";
// import "./App.css";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 5000); // 10 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="App">
//       {loading ? (
//         <div className="loader-screen">
//           <img src={logo} alt="Tune Wave Logo" className="logo" />
//           <div className="loading-animation">
//             <span className="dot"></span>
//             <span className="dot"></span>
//             <span className="dot"></span>
//           </div>
//         </div>
//       ) : (
//         <div className="main-dashboard">
//           <h1>Welcome to TUNE WAVE 🎧</h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import logo from "./assets.png"; // your original logo file
import "./App.css";

function App() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 7000);  // After 7s -> welcome
    const timer2 = setTimeout(() => setStep(2), 10000); // After 10s -> blank
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
        <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}></div>
      )}
    </div>
  );
}
export default App;
