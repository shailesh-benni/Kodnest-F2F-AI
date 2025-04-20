import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import F2FInterview from './pages/F2FInterview';
import HomePage from './pages/HomePage';
import brokod from '/src/assets/brokodbg.png'; 


function App() {
    return (
      <Router>
        <div>
          {/* Sticky yellow dot in top-right corner */}
          <div className="w-12 h-12 bg-yellow-400  rounded-full fixed bottom-6 left-7 z-50 shadow-md flex items-center justify-center text-3xl font-bold">
  ?
</div>
<div className="w-10 h-40 bg-yellow-400 rounded-md fixed top-69 right-0 z-50 shadow-md flex flex-col-reverse items-center justify-between pt-3">
  <img 
    src={brokod}
    alt="icon" 
    className="w-15 h-15"
    />
  <span className="vertical-text-up text-md font-semibold mt-9">BroKod</span>
</div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/f2f-interview" element={<F2FInterview />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
