import React from "react";
import Navbar from "./components/Navbar";
import StudentPage from "./pages/StudentPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <StudentPage />
    </div>
  );
};

export default App;