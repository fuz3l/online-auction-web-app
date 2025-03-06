import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar z-10 bg-red-600 left-0 right-0 fixed top-0 w-full">
      <div className="nav-container">
        <Link to="/" className="logo">
        <img 
        className="w-38"
        src="/appLogo.png" alt="" />
        </Link>
        
        {/* Hamburger Menu Button */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
              <li><Link to="/add-item" onClick={() => setMenuOpen(false)}>Add Item</Link></li>
            
              <li><button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
              <li><Link to="/profile" onClick={() => setMenuOpen(false)}>profile</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
