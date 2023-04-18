import axios from 'axios';
import Address from './components/Address';
import './sendcoin.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const serverUrl = 'http://localhost:3001';

const SendCoin = () => {
  const userData = useSelector((state) => state.wallets);
  const getWallet = (userData) => {
    const publicAddress = userData.addresses[userData.selected];
    const balance = userData.balance;
    return { publicAddress, balance };
  };
  const { publicAddress, balance } = getWallet(userData);

  if (userData.firstGen === true) {
    return <Navigate to="/initWallet" />;
  }

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (publicAddress !== from && publicAddress) {
      setFrom(publicAddress);
    }
  }, [userData.selected]);

  const handleTextChange = (val) => {
    setTo(val);
  };

  const handleAmountChange = (val) => {
    if (val > balance) {
      setAmount(balance);
    } else if (val < 0 || !val) {
      setAmount(0);
    } else setAmount(val);
  };
  const handleSendCoin = () => {
    axios
      .post(`${serverUrl}/sendcoin`, {
        from,
        to,
        amount,
      })
      .then((data) => {
        window.alert('Successfully create a transaction, waiting for miner');
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Address type="from" disabled={true} address={from}></Address>
      <Address
        type="to"
        address={to}
        handleTextChange={handleTextChange}
      ></Address>

      <div className="coin-container">
        <div className="amount-container">
          <label htmlFor="amount">Amount send</label>
          <input
            name="amount"
            type="number"
            style={{ display: 'flex' }}
            min={0}
            max={balance}
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          ></input>
        </div>

        <div className="btn-container">
          <button className="btn" style={{ width: '35%' }}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ width: '60%' }}
            onClick={() => handleSendCoin()}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default SendCoin;
