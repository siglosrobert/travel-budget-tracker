import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BudgetTrackerPage from './pages/BudgetTrackerPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget/:id" element={<BudgetTrackerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
