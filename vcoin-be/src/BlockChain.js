const Block = require('./Block');
const ProofOfWork = require('./ProofOfWork');
const Transaction = require('./Transaction');
const UnspentTxOut = require('./UnspentTxOut');
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
      ProofOfWork.getAdjustedDifficulty(this)
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
    const blockchain = this.blocks;
    const unspentTxs = [];
    let spentTxOuts = new Map();

    for (let i = 0; i < blockchain.length; i++) {
      const block = blockchain[i];

      for (let j = 0; j < block.transactions.length; j++) {
        const transaction = block.transactions[j];

        if (!transaction.isCoinBase()) {
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

    for (let i = 0; i < blockchain.length; i++) {
      const block = blockchain[i];

      for (let j = 0; j < block.transactions.length; j++) {
        const transaction = block.transactions[j];

        Outputs: for (let i = 0; i < transaction.txOuts.length; i++) {
          const curTxOut = transaction.txOuts[i];
          if (spentTxOuts.get(transaction.id)) {
            const spentOuts = spentTxOuts.get(transaction.id);
            for (let j = 0; j < spentOuts.length; j++) {
              if (
                spentOuts[j] !== curTxOut &&
                curTxOut.canBeUnlockedWith(address)
              ) {
                unspentTxs.push(transaction);
                continue Outputs;
              }
            }
          } else if (curTxOut.canBeUnlockedWith(address)) {
            unspentTxs.push(transaction);
          }
        }
      }
    }

    return [spentTxOuts, unspentTxs];
  }

  findUnspentTxOuts(address) {
    const [spentTxOuts, unspentTXs] = this.findUnspentTx(address);

    const result = [];
    for (let i = 0; i < unspentTXs.length; i++) {
      const spentTxtOutsByT = spentTxOuts.get(unspentTXs[i].id);
      const txOuts = unspentTXs[i].txOuts;

      for (let j = 0; j < txOuts.length; j++) {
        if (txOuts[j].canBeUnlockedWith(address)) {
          if (spentTxtOutsByT === undefined) {
            result.push(
              new UnspentTxOut(
                unspentTXs[i].id,
                j,
                txOuts[j].address,
                txOuts[j].amount
              )
            );
          } else if (spentTxtOutsByT.includes(j) === false) {
            result.push(
              new UnspentTxOut(
                unspentTXs[i].id,
                j,
                txOuts[j].address,
                txOuts[j].amount
              )
            );
          }
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

  findSpendableOutputs(address, amount) {
    let resultAmount = 0;
    const resultOutputs = [];
    const unspentTxOuts = this.findUnspentTxOuts(address);

    for (let i = 0; i < unspentTxOuts.length && resultAmount < amount; i++) {
      const txOut = unspentTxOuts[i];
      resultOutputs.push(txOut);
      resultAmount += txOut.amount;
    }

    return [resultAmount, resultOutputs];
  }

  sendCoin(from, to, amount) {
    const lastestBlock = this.getLastestBlock();
    const transactions = [
      Transaction.newUTXOTransaction(from, to, amount, this),
    ];

    const block = ProofOfWork.findBlock(
      lastestBlock.index + 1,
      lastestBlock.blockHash,
      new Date().getTime() / 100,
      transactions,
      ProofOfWork.getAdjustedDifficulty(this)
    );

    return block;
  }

  updateChain(newBlock) {
    const verifyResult = ProofOfWork.verifyHash(newBlock, this);

    if (!verifyResult) {
    } else {
      this.blocks.push(newBlock);
      return true;
    }

    return false;
  }
}

module.exports = BlockChain;
