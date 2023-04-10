import defaultAvatar from '../../../assets/default-avatar.png';
import './blocklist.css';

const blocks = [
  {
    blockIdx: '0',
    miner: 'asdqwdpkow',

    totalTxts: 10,
    rewards: 2,
  },
];
const BlockList = () => {
  return (
    <div className="list-container">
      <div className="list-header">
        <h3>Lastest blocks</h3>
      </div>

      {blocks.map((block) => (
        <div key={block.blockIdx} className="block">
          <div className="block-info">
            <p>Block id: {block.blockIdx}</p>
          </div>
          <div className="miner-info">
            <p>Miner: {block.miner}</p>
            <p>Txtns: {block.totalTxts}</p>
          </div>
          <div className="reward-info">
            <p>Rewards: {block.rewards}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
