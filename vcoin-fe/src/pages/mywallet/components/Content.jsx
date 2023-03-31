import './content.css';

const Content = () => {
  const curCoin = 1412;
  return (
    <>
      <div className="wallet-value">
        <p className="wallet-value-text">{curCoin} VCOIN</p>
      </div>
    </>
  );
};

export default Content;
