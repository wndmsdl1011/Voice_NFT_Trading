import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SocialLoginPage from './pages/SocialLoginPage';
import CompleteProfilePage from './pages/CompleteProfilePage.jsx';
import AuthSuccess from './components/AuthSuccess';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<SocialLoginPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;