import { useState } from 'react';
import AppBar from './components/AppBar/AppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import MyWallet from './pages/mywallet';
import './app.css';
function App() {
  return (
    <div className="App">
      <SideBar />
      <Router>
        <Routes>
          <Route path="/mywallet" element={<MyWallet />}></Route>
          <Route path="/activity"></Route>
          <Route path="/sendCoin"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
