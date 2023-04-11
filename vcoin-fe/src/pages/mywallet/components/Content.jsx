import axios from 'axios';
import './content.css';
import { useState, useEffect } from 'react';
const serverUrl = 'http://localhost:3001';

const Content = ({ wallet }) => {
  const { publicAddress } = wallet;
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicAddress) {
      axios.get(`${serverUrl}/balance/${publicAddress}`).then((data) => {
        setLoading(false);
        setBalance(data.data);
      });
    }
  }, [publicAddress]);

  return (
    <>
      <div className="wallet-value">
        {!loading && <p className="wallet-value-text">{balance} VCOIN</p>}
      </div>
    </>
  );
};

export default Content;
