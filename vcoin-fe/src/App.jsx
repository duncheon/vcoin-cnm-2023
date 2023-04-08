import { useState } from 'react';
import AppBar from './components/AppBar/AppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import MyWallet from './pages/mywallet';
import './app.css';
import SendCoin from './pages/sendcoin';
function App() {
  return (
    <div className="App">
      <Router>
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/mywallet" element={<MyWallet />}></Route>
            <Route path="/activity"></Route>
            <Route path="/sendCoin" element={<SendCoin />}></Route>
          </Routes>
          <AppBar />
        </div>
      </Router>
    </div>
  );
}

export default App;
