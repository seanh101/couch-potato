import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function handleTitleClick() {
    window.location.reload();
  }

  return (
    <nav>
     
      <Link to="/" className="app-title" onClick={handleTitleClick}>COUCH POTATO</Link>
     
      {user && (
        <>
          <Link to="/movies">Favorites</Link>
          &nbsp; | &nbsp;
          <Link to="/search">Search Film & TV</Link>
        </>
      )}
      {user && (
        <>
          &nbsp;&nbsp;
          <span> {user.name}</span>
          &nbsp;&nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      )}
    </nav>
  );
}




