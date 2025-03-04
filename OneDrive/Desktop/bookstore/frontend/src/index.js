import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Optional: to include styling
import App from "./App";  // Import the main App component
import { BrowserRouter as Router } from "react-router-dom";  // React Router

// Render the App component wrapped with Router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
