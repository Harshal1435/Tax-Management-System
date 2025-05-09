import React, { useEffect ,useState} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  useEffect(() => {
    setMenuOpen(false); // close menu on route change
  }, [location]);
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const linkClass = (path) =>
    `px-4 py-2 rounded-full text-white font-bold transition duration-200 ${
      location.pathname === path
        ? 'bg-pink-500'
        : 'bg-pink-400 hover:bg-pink-500'
    }`;

  return (
    <nav className="bg-gray-900 border-b-2 border-gradient-to-r from-cyan-500 to-pink-500 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center text-white text-xl font-bold">
          <i className="fas fa-star mr-2"></i>
          TaxStore
        </div>

        {/* Links */}
     {/* Desktop Nav Links */}
<div className="hidden md:flex space-x-4">
  <Link to="/" className={linkClass('/')}>
    Home
  </Link>
  <Link to="/about" className={linkClass('/about')}>
    About
  </Link>
  <Link to="/Tax-Details" className={linkClass('/Tax-Details')}>
    Taxes
  </Link>
</div>

{/* Mobile Nav Links (only visible when menu is open) */}
{menuOpen && (
  <div className="flex flex-col md:hidden space-y-2 mt-2">
    <Link to="/" className={linkClass('/')}>
      Home
    </Link>
    <Link to="/about" className={linkClass('/about')}>
      About
    </Link>
    <Link to="/Tax-Details" className={linkClass('/Tax-Details')}>
      Taxes
    </Link>
  </div>
)}


        {/* Auth Buttons */}
        <div>
          {!localStorage.getItem('adminToken') ? (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
