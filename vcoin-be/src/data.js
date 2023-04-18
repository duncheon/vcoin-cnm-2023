const BlockChain = require('./BlockChain');
const Transaction = require('./Transaction');
const Wallet = require('./Wallet');
const mode = process.argv[4] ? 'genesis' : 'normal';

let transactionPool = [];
const blockchain = new BlockChain([]);

let privateKey = '';
let address = '';
console.log(mode);
if (mode === 'genesis') {
  privateKey = Wallet.initWallet();
  address = Wallet.getPublicKey();
  blockchain.newGenesisBlock(
    Transaction.newCoinBaseTX(address, 'first wallet, rewards pool')
  );
}

const getBlockChain = () => {
  return blockchain;
};
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

const getPrivateKey = () => privateKey;
const getTransactionPool = () => {
  return transactionPool;
};

const updateTransactionsPool = (updated) => {
  transactionPool = updated;
};

const setPrivateKey = (key) => (privateKey = key);
const setAddress = () => (address = Wallet.getPublicKey());
const getAddress = () => address;
module.exports = {
  blockchain,
  getBlockChain,
  transactionPool,
  getTransactionPool,
  addTransactionToPool,
  removeTransactionFromPool,
  updateTransactionsPool,
  getPrivateKey,
  privateKey,
  address,
  setAddress,
  setPrivateKey,
  getAddress,
};
