import './address.css';
import avatarUrl from '../../../assets/default-avatar.png';
import { useEffect, useState } from 'react';
const Address = ({ type, disabled, address, handleTextChange }) => {
  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, []);

  return (
    <div className="address-container">
      <img className="address-img" src={avatarUrl}></img>
      <div className="text-container">
        <p>{type}</p>
        <input
          type="text"
          disabled={disabled}
          value={address}
          onChange={(e) => handleTextChange(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default Address;
