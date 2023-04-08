const Block = require('./Block');
const BlockChain = require('./BlockChain');
const {
  BLOCK_GENERATION_INTERVAL,
  DIFFICULTY_ADJUSTMENT_INTERVAL,
} = require('./constVal');

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
      newBlock.transactions,
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

  static findBlock = (index, prevHash, timestamp, transactions, difficulty) => {
    let nonce = 0;
    console.log(`Mining new block containing transactions:  ${transactions}`);

    while (true) {
      const blockHash = Block.calculateHash(
        index,
        prevHash,
        timestamp,
        transactions,
        difficulty,
        nonce
      );

      if (this.hashMatchesDifficulty(blockHash, difficulty)) {
        console.log(`Found hash: ${blockHash}, nonce: ${nonce} \n`);
        return new Block(
          index,
          prevHash,
          timestamp,
          transactions,
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
