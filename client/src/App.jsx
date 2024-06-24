import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import Dashboard from './components/Board/Board';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import PublicLayout from './components/PublicLayout/PublicLayout';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/app/*" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard/>} /> 
            <Route path="analytics" element={<Analytics/>} />
            <Route path="settings" element={<Settings/>} />

          </Route>

          <Route path="/public" element={<PublicLayout />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
