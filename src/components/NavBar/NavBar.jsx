import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import logo from './potato2.jpeg'; 
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Favorites</Link></li>
        <li><Link to="/search">Search Film & TV</Link></li>
        <li><Link to="/stream">Stream Search</Link></li>
        <li><Link to="/new">New+Upcoming</Link></li>
        {user ? (
          <>
            <li className="user-name">{user.name}</li>
            <li><Link to="" onClick={handleLogOut}>Log Out</Link></li>
          </>
        ) : (
          <li><Link to="/auth">Sign Up / Log In</Link></li>
        )}
      </ul>
    </nav>
  );
}
