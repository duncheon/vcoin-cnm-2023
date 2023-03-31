import defaultAvatar from './../../assets/default-avatar.png';
import './profilebar.css';

const ProfileBar = ({ publicAddress, accountName }) => {
  const truncateText = (text) => {
    return text.slice(0, 6) + '...' + text.slice(text.length - 4);
  };

  return (
    <div className="profile-bar">
      <div className="profile-container">
        <img
          className="profile-img"
          src={defaultAvatar}
          alt="User's avatar"
        ></img>
        <div className="text-container">
          <p className="bold text-capitalize">{accountName}</p>
          <p className="light">{truncateText(publicAddress)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
