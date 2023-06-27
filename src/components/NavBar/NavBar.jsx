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
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <Link to="/movies">Favorites</Link>
      &nbsp; | &nbsp;
      <Link to="/search">Search Movie</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}