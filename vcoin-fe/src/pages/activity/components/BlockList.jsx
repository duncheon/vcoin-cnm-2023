import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../../../assets/default-avatar.png';
import './blocklist.css';
import { useEffect } from 'react';
import { getBlocks } from '../../../redux/reducers/blockReducer';

const BlockList = () => {
  const blocks = useSelector((state) => state.blocks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlocks(1));
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <h3>Lastest blocks</h3>
      </div>

      {blocks.blocks.map((block) => (
        <div key={block.index} className="block">
          <div className="block-info">
            <p>Block id: {block.index}</p>
          </div>
          <div className="miner-info">
            <p>{block.miner ? `Miner: ${block.miner}` : 'Genesis block'}</p>
            <p>Txtns: {block.transactions.length}</p>
          </div>
          <div className="reward-info">
            <p>Rewards: 0</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
