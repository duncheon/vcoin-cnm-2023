import Address from './components/Address';
import './sendcoin.css';

const SendCoin = () => {
  return (
    <>
      <Address type="from"></Address>
      <Address type="to"></Address>
      <div className="btn-container">
        <button className="btn" style={{ width: '35%' }}>
          Cancel
        </button>
        <button className="btn" style={{ width: '60%' }}>
          Ok
        </button>
      </div>
    </>
  );
};

export default SendCoin;
