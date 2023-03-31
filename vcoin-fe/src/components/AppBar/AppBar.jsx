import appBarData from './data';
import './appbar.css';

const AppBar = () => {
  return (
    <div className="app-bar">
      <ul className="item-list">
        {appBarData.map((item, idx) => (
          <li className="item" key={idx}>
            {item.icon}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppBar;
