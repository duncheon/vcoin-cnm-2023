import ProfileBar from '../../components/ProfileBar/ProfileBar';
import Content from './components/Content';
import AppBar from '../../components/AppBar/AppBar';
import './mywallet.css';
const MyWallet = () => {
  return (
    <div className="my-wallet">
      <ProfileBar accountName={'myAccount'} publicAddress={'0x000000'} />
      <Content />
      <AppBar />
    </div>
  );
};

export default MyWallet;
