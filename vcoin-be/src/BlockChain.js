const Block = require('./Block');
const ProofOfWork = require('./ProofOfWork');
const START_DIFFICULTY = 3;

class BlockChain {
  constructor(blocks) {
    this.blocks = blocks;
  }

  getLastestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  newGenesisBlock() {
    const timestamp = new Date().getTime() / 100;
    const index = 0;
    const prevHash = '';
    const genesisBlock = ProofOfWork.findBlock(
      index,
      prevHash,
      timestamp,
      'My genesis block',
      START_DIFFICULTY
    );
    this.blocks = [];
    this.blocks.push(genesisBlock);
  }
  addBlock(data) {
    const lastestBlock = this.getLastestBlock();
    const nextIndex = lastestBlock.index + 1;
    const timeStamp = new Date().getTime() / 1000;
    const newBlock = ProofOfWork.findBlock(
      nextIndex,
      lastestBlock.blockHash,
      timeStamp,
      data,
      ProofOfWork.getAdjustedDifficulty(lastestBlock, this.blocks)
    );

    this.blocks.push(newBlock);
  }

  printBlockChains() {
    this.blocks.forEach((block) => {
      console.log(`Prev hash: ${block.prevHash}`);
      console.log(`Data: ${block.data}`);
      console.log(`Hash: ${block.blockHash}`);
      console.log('\n');
    });
  }
}

module.exports = BlockChain;
