import { useState } from 'react';
import './initwallet.css';
import lockImg from '../../assets/padlock.png';
const InitWallet = () => {
  const [displayState, setDisplayState] = useState('password');
  const [password, setPassword] = useState('');
  const [passphrase, setPassPhrase] = useState('');

  const handleSendPassword = () => {};

  return (
    <div className="init-container">
      {displayState === 'password' && (
        <div className="password-container">
          <img className="lock-img" src={lockImg} alt="lock-img"></img>
          <h3>Set up password to unlock wallet</h3>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="init-btn" onClick={() => handleSendPassword()}>
            Ok
          </button>
        </div>
      )}
      {displayState === 'passphrase' && (
        <div className="passphrase-container">
          <h3>Remember this in order: {passphrase}</h3>
        </div>
      )}
    </div>
  );
};

export default InitWallet;
