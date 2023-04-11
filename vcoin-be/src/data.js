const BlockChain = require('./BlockChain');
const Transaction = require('./Transaction');
const Wallet = require('./Wallet');

let transactionPool = [];
const blockchain = new BlockChain([]);

const privateKey = Wallet.initWallet();
const address = Wallet.getPublicKey();

blockchain.newGenesisBlock(
  Transaction.newCoinBaseTX(address, 'first wallet, rewards pool')
);

const addTransactionToPool = (verifedTransactions) => {
  for (let i = 0; i < transactionPool.length; i++) {
    const transaction = transactionPool[i];
    for (let j = 0; j < verifedTransactions.length; j++) {
      if (transaction.id !== verifedTransactions[j].id) {
        transactionPool.push(verifedTransactions[j]);
      }
    }
  }
};

const removeTransactionFromPool = (verifedTransactions) => {
  let newPool = [];
  for (let i = 0; i < transactionPool.length; i++) {
    const transaction = transactionPool[i];
    for (let j = 0; j < verifedTransactions.length; j++) {
      if (transaction.id !== verifedTransactions[j].id) {
        newPool.push(verifedTransactions[j]);
      }
    }
  }
  transactionPool = newPool;
};

const getTransactionPool = () => {
  return transactionPool;
};

const updateTransactionsPool = (updated) => {
  transactionPool = updated;
};
module.exports = {
  blockchain,
  transactionPool,
  getTransactionPool,
  addTransactionToPool,
  removeTransactionFromPool,
  updateTransactionsPool,
  privateKey,
  address,
};
