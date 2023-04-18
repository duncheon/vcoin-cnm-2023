import LogoContainer from './components/LogoContainer/LogoContainer';
import SearchBar from './components/SearchBar/SearchBar';
import './sidebar.css';
import VcoinIcon from '../../assets/vcoin-icon.png';
import React from 'react';
import axios from 'axios';
import config from '../../config/config';

const networkList = [{ id: 'vcoin', text: 'VCoin', logoSrc: VcoinIcon }];

const SideBar = () => {
  const [selected, setSelected] = React.useState(-1);
  const [port, setPort] = React.useState('');
  const networkChange = (idx) => {
    setSelected(idx);
  };

  const handleConnectToPeer = async () => {
    const result = await axios.post(`${config.backend_url}/addPeer`, {
      peer: `ws://localhost:${port}`,
    });

    const { status } = result.data;
    if (status === 'success') {
      setPort('');
      alert(`Success connected to new peer at PORT ${port}`);
    } else {
      alert(`Failed connecting to new peer at PORT ${port}`);
    }
  };
  return (
    <div className="sidebar">
      <LogoContainer />
      <SearchBar />
      <ul className="network-list">
        {networkList.map((network, idx) => {
          return (
            <li
              className={`network-item ${
                selected === idx ? 'item-bg-active' : 'item-bg'
              }`}
              key={network.id}
              onClick={() => networkChange(idx)}
            >
              <img className="network-icon" src={network.logoSrc}></img>
              <p className="network-text">{network.text}</p>
            </li>
          );
        })}
      </ul>

      <div className="connect-to-peer-div">
        <input type="text"></input>
        <button
          className="connect-to-peer-btn"
          onClick={() => handlePeerConnect()}
        >
          Connect to peer
        </button>
      </div>
    </div>
  );
};

export default SideBar;
