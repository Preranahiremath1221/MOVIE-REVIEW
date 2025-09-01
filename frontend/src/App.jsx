import React from 'react';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import MovieList from './components/MovieList.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import UserProfile from './components/UserProfile.jsx';
import Watchlist from './components/Watchlist.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Notifications from './components/Notifications.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
