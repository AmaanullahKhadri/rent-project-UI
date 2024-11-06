// src/App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar component
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Addhouse from "./pages/AddHome/AddHome";
import Addtenant from "./pages/AddTenant/AddTenant";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Redirect to Login */}
        <Route path="/login" element={<Login />} /> {/* Actual Login Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addhouse" element={<Addhouse />} />
        <Route path="/addtenant" element={<Addtenant />} />
        {/* Dashboard route */}
      </Routes>
    </Router>
  );
};
const NavbarWrapper: React.FC = () => {
  const location = useLocation(); // Get the current location (path)

  // If we're on the /login page, don't render the Navbar
  if (location.pathname === "/login") {
    return null;
  }

  return <Navbar />;
};

export default App;
