import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Api1 from './firstA1.jsx';
import Api2 from './secondA2.jsx';
import Api3 from './thirdA3.jsx';
import Api4 from './fourA4.jsx';
import Navbar from './Navbar.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/Api1" element={<Api1 />} />
        <Route path="/Api2" element={<Api2 />} />
        <Route path="/Api3" element={<Api3 />} />
        <Route path="/Api4" element={<Api4 />} />
      </Routes>
    </Router>
  );
};

export default App;
