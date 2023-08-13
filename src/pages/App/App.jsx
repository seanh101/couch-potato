import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import SearchMoviePage from '../SearchMoviePage/SearchMoviePage';
import FavoriteMoviePage from '../FavoriteMoviePage/FavoriteMoviePage';
import StreamSearchPage from '../StreamSearchPage/StreamSearchPage';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react'
import HomePage from '../HomePage/HomePage'

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar  />
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/movies" element={<FavoriteMoviePage user={user} />} />
            <Route path="/search" element={<SearchMoviePage user={user}  />} />
            <Route path="/stream" element={<StreamSearchPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}





