import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import F2FInterview from './pages/F2FInterview';
import HomePage from './pages/HomePage';

function App() {
    return (
      <Router>
        <div>
            <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/f2f-interview" element={<F2FInterview />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;