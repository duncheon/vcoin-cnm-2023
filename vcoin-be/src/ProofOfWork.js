const Block = require('./Block');
const BlockChain = require('./BlockChain');
const BLOCK_GENERATION_INTERVAL = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

class ProoFOfWork {
  static getAdjustedDifficulty(latestBlock, blockChain) {
    let prevAdjustmentBlock =
      blockChain[blockChain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];

    if (!prevAdjustmentBlock) {
      prevAdjustmentBlock = blockChain[0];
    }

    const timeExpected =
      BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;

    const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
    if (timeTaken < timeExpected / 2) {
      return prevAdjustmentBlock.difficulty + 1;
    } else if (timeExpected > timeExpected * 2) {
      return prevAdjustmentBlock.difficulty - 1;
    } else return prevAdjustmentBlock.difficulty;
  }

  static verifyHash = (newBlock) => {
    const reHash = Block.calculateHash(
      newBlock.index,
      newBlock.prevHash,
      newBlock.timestamp,
      newBlock.data,
      newBlock.difficulty,
      newBlock.nonce
    );

    if (reHash === newBlock.blockHash) {
      return this.hashMatchesDifficulty(
        newBlock.blockHash,
        newBlock.difficulty
      );
    }

    return false;
  };

  static hashMatchesDifficulty(hash, difficulty) {
    const requiredPrefix = '0'.repeat(difficulty);
    return hash.startsWith(requiredPrefix);
  }

  static findBlock = (index, prevHash, timestamp, data, difficulty) => {
    let nonce = 0;
    console.log(index, prevHash, timestamp, data, difficulty);
    console.log(`Mining new block containing data:  ${data}`);

    while (true) {
      const blockHash = Block.calculateHash(
        index,
        prevHash,
        timestamp,
        data,
        difficulty,
        nonce
      );

      if (this.hashMatchesDifficulty(blockHash, difficulty)) {
        console.log(`Found hash: ${blockHash}, nonce: ${nonce} \n`);
        return new Block(
          index,
          prevHash,
          timestamp,
          data,
          blockHash,
          difficulty,
          nonce
        );
      }
      nonce++;
    }
  };
}

module.exports = ProoFOfWork;
