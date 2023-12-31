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
        <Link to="/stream">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/movies">Favorites</Link>
      &nbsp; | &nbsp;
      <Link to="/search">Search Film & TV</Link>
      &nbsp; | &nbsp;
      <Link to="/stream">Stream Search</Link>
      &nbsp;&nbsp;
      {user ? (
        <>
          <span> {user.name}</span>
          &nbsp;&nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      ) : (
        <>
          <Link to="/auth">Sign Up / Log In</Link>
        </>
      )}
    </nav>
  );
}
