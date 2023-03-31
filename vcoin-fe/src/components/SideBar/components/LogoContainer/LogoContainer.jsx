import './logocontainer.css';
import Logo from '../../../../assets/logo.png';

const LogoContainer = () => {
  return (
    <div className="logo-container">
      <img src={Logo} alt="logo" className="logo-img"></img>
      <p className="logo-text">Blockchain</p>
    </div>
  );
};

export default LogoContainer;
