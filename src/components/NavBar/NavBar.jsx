import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import logo from './potato2.jpeg';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className={`navbar ${mobileMenuOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <Link to="/">
          <img className={`logo ${mobileMenuOpen ? 'hidden' : ''}`} src={logo} alt="Logo" />
        </Link>
      </div>
      <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {/* Display the "Couch Potato" title on mobile */}
      <div className={`mobile-title ${mobileMenuOpen ? 'open' : ''}`}>
        Couch Potato
      </div>
      <div className={`nav-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li><Link to="/stream">Stream Search</Link></li>
          <li><Link to="/new">New+Upcoming</Link></li>
          {/* Other links... */}
        </ul>
      </div>
    </nav>
  );
}
