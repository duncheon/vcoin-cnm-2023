import LogoContainer from './components/LogoContainer/LogoContainer';
import SearchBar from './components/SearchBar/SearchBar';
import './sidebar.css';
import VcoinIcon from '../../assets/vcoin-icon.png';
import React from 'react';
const networkList = [{ id: 'vcoin', text: 'VCoin', logoSrc: VcoinIcon }];

const SideBar = () => {
  const [selected, setSelected] = React.useState(-1);

  const networkChange = (idx) => {
    setSelected(idx);
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
    </div>
  );
};

export default SideBar;
