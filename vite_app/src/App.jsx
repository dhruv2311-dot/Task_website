import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Api1 from './firstA1.jsx';
import Api2 from './secondA2.jsx';
import Api3 from './thirdA3.jsx';
import Api4 from './fourA4.jsx';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/Api1" style={{ margin: '0 10px' }}>Api1</Link>
        <Link to="/Api2" style={{ margin: '0 10px' }}>Api2</Link>
        <Link to="/Api3" style={{ margin: '0 10px' }}>Api3</Link>
        <Link to="/Api4" style={{ margin: '0 10px' }}>Api4</Link>
      </nav>
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