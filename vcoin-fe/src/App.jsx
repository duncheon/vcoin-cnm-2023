import { useState } from 'react';
import AppBar from './components/AppBar/AppBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import MyWallet from './pages/mywallet';
import './app.css';
import SendCoin from './pages/sendcoin';
import Activity from './pages/activity';
import axios from 'axios';
import { useEffect } from 'react';
import InitWallet from './pages/initwallet';

const serverUrl = 'http://localhost:3001';

function App() {
  const [wallet, setWallet] = useState({});
  const [firstGen, setFirstGen] = useState(true);

  const getCurLocation = () => {
    const arr = window.location.href.split('/');
    return arr[arr.length - 1];
  };

  getCurLocation();
  useEffect(() => {
    if (firstGen) {
      axios
        .get(`${serverUrl}/walletExists`)
        .then((data) => {
          const rs = data.data;
          setFirstGen(!rs.isExists);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    console.log(firstGen);
    if (firstGen === false) {
      axios
        .get(`${serverUrl}/walletInfo`)
        .then((data) => {
          const walletInfo = data.data;
          setWallet(walletInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [firstGen]);

  return (
    <div className="App">
      <Router>
        <SideBar />
        <div className="content">
          <Routes>
            <Route
              path="/mywallet"
              element={<MyWallet wallet={wallet} />}
            ></Route>
            <Route
              path="/activity"
              element={<Activity wallet={wallet} />}
            ></Route>
            <Route
              path="/sendCoin"
              element={<SendCoin wallet={wallet} />}
            ></Route>
            <Route path="/initWallet" element={<InitWallet />}></Route>
          </Routes>
          {getCurLocation() != 'initwallet' && <AppBar />}
        </div>
      </Router>
    </div>
  );
}

export default App;
