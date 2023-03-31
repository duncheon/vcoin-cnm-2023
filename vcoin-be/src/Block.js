const CryptoJS = require('crypto-js');

class Block {
  constructor(index, prevHash, timestamp, data, blockHash, difficulty, nonce) {
    this.index = index;
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.data = data;
    this.blockHash = blockHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static calculateHash(index, prevHash, timestamp, data, difficulty, nonce) {
    return CryptoJS.SHA256(
      index + prevHash + timestamp + data + difficulty + nonce
    ).toString();
  }

  //   static generateNextBlock = (blockData, prevBlock) => {
  //     let prevHash = '';
  //     let nextIndex = 0;
  //     let nextTimestamp = new Date().getTime() / 1000;

  //     if (prevBlock !== null) {
  //       nextIndex = prevBlock.index + 1;
  //       prevHash = prevBlock.blockHash;
  //     }

  //     let nextHash = this.calculateHash(
  //       nextIndex,
  //       prevHash,
  //       nextTimestamp,
  //       blockData,

  //     );

  //     return new Block(nextIndex, prevHash, nextTimestamp, blockData, nextHash);
  //   };
}

module.exports = Block;
