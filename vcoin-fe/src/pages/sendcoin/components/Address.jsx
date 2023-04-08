import './address.css';
import avatarUrl from '../../../assets/default-avatar.png';
const Address = ({ type }) => {
  return (
    <div className="address-container">
      <img className="address-img" src={avatarUrl}></img>
      <div className="text-container">
        <p>{type}</p>
        <input type="text"></input>
      </div>
    </div>
  );
};

export default Address;
