import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import NoteState from './context/data/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import All_Tax_Details from './components/All_Tax_Details/All_Tax_Details';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('adminToken');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Main routing and navbar handling component
function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/Tax-Details" element={<PrivateRoute><All_Tax_Details /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

// App wrapper with NoteState and Router
function App() {
  return (
    <NoteState>
      <Router>
        <AppContent />
      </Router>
    </NoteState>
  );
}

export default App;
