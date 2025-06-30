import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KakaoPayButton from './KakaoPayBtn';
import KakaoPaySuccess from './KakaoPaySuccess';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KakaoPayButton />} />
        <Route path="/kakao/success" element={<KakaoPaySuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
