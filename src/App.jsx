import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import F2FInterview from './pages/F2FInterview';
import BroKodSection from './components/BrokodSection';
import LiveClassCards from './components/LiveClassCard';

function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <BroKodSection/>
          <LiveClassCards/>
          <Routes>
            <Route path="/f2f-interview" element={<F2FInterview />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;