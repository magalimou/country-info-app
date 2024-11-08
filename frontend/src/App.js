import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './pages/CountryList';
import CountryInfo from './pages/CountryInfo';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country-info/:code" element={<CountryInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

