import ProfileBar from '../../components/ProfileBar/ProfileBar';
import Content from './components/Content';
import AppBar from '../../components/AppBar/AppBar';
import './mywallet.css';
const MyWallet = ({ wallet }) => {
  const { publicAddress, balance } = wallet;
  console.log(wallet);
  return (
    <div className="my-wallet">
      <ProfileBar accountName={'myAccount'} publicAddress={publicAddress} />
      <Content wallet={wallet} />
    </div>
  );
};

export default MyWallet;
