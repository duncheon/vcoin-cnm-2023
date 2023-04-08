const Block = require('./Block');
const ProofOfWork = require('./ProofOfWork');
const { START_DIFFICULTY } = require('./constVal');

class BlockChain {
  constructor(blocks) {
    this.blocks = blocks;
  }

  getLastestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  newGenesisBlock(coinBaseTransaction) {
    const timestamp = new Date().getTime() / 100;
    const index = 0;
    const prevHash = '';
    const genesisBlock = ProofOfWork.findBlock(
      index,
      prevHash,
      timestamp,
      [coinBaseTransaction],
      START_DIFFICULTY
    );

    this.blocks = [];
    this.blocks.push(genesisBlock);
  }
  addBlock(transaction) {
    const lastestBlock = this.getLastestBlock();
    const nextIndex = lastestBlock.index + 1;
    const timeStamp = new Date().getTime() / 1000;
    const newBlock = ProofOfWork.findBlock(
      nextIndex,
      lastestBlock.blockHash,
      timeStamp,
      transaction,
      ProofOfWork.getAdjustedDifficulty(lastestBlock, this.blocks)
    );

    this.blocks.push(newBlock);
  }

  printBlockChains() {
    this.blocks.forEach((block) => {
      console.log(`Prev hash: ${block.prevHash}`);
      console.log(`Transactions: ${block.transactions}`);
      console.log(`Hash: ${block.blockHash}`);
      console.log('\n');
    });
  }

  findUnspentTx(address) {
    console.log(address);
    const blockchain = this.blocks;
    const unspentTxOuts = [];
    let spentTxOuts = new Map();

    for (let i = 0; i < blockchain.length; i++) {
      const block = blockchain[i];

      for (let j = 0; j < block.transactions.length; j++) {
        const transaction = block.transactions[j];

        Outputs: for (let i = 0; i < transaction.txOuts.length; i++) {
          const curTxOut = transaction.txOuts[i];
          if (spentTxOuts.get(transaction.id)) {
            const spentOuts = spentTxOuts.get(transaction.id);
            for (let j = 0; j < spentOuts.length; j++) {
              if (spentOuts[j] === curTxOut) {
                console.log('hi');
                continue Outputs;
              }
            }
          }

          if (curTxOut.canBeUnlockedWith(address)) {
            unspentTxOuts.push(transaction);
          }
        }

        if (transaction.isCoinBase()) {
          for (let k = 0; k < transaction.txIns.length; k++) {
            const txIn = transaction.txIns[k];
            if (txIn.canUnlockOutputWith(address)) {
              if (!spentTxOuts.get(txIn)) {
                spentTxOuts.set(txIn.txOutId, [txIn.txOutIndex]);
              } else
                spentTxOuts.set(txIn.txOutId, [
                  ...spentTxOuts.get(txIn),
                  txIn.txOutIndex,
                ]);
            }
          }
        }
      }
    }

    return unspentTxOuts;
  }

  findUnspentTxOuts(address) {
    const unspentTXs = this.findUnspentTx(address);
    const result = [];
    for (let i = 0; i < unspentTXs.length; i++) {
      const txOuts = unspentTXs[i].txOuts;
      for (let j = 0; j < txOuts.length; j++) {
        if (txOuts[j].canBeUnlockedWith(address)) {
          result.push(txOuts[j]);
        }
      }
    }

    return result;
  }
  getBalance(address) {
    return this.findUnspentTxOuts(address)
      .map((uTxO) => uTxO.amount)
      .reduce((a, b) => a + b, 0);
  }
}

module.exports = BlockChain;
