import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/pages/Calendar';

function App() {
  return (
    <div>
      <Router basename="/">
        <Routes>
        <Route path="/" element={<Calendar/>}/>       
        </Routes>
      </Router>
    </div>
  );
}

export default App;