import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import SearchMoviePage from '../SearchMoviePage/SearchMoviePage';
import FavoriteMoviePage from '../FavoriteMoviePage/FavoriteMoviePage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const user = getUser();

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} />
          <Routes>
            <Route path="/movies" element={<FavoriteMoviePage />} />
            <Route path="/search" element={<SearchMoviePage />} />
            <Route path="*" element={<Navigate to="/movies" />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}




