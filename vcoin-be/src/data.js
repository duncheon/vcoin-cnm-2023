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
  if (!Wallet.privateKeyExists()) {
    privateKey = Wallet.initWallet();
  }
  address = Wallet.getPublicKey();
  blockchain.newGenesisBlock(
    Transaction.newCoinBaseTX(address, 'first wallet, rewards pool')
  );
}

const getBlockChain = () => {
  return blockchain;
};
const addBlock = (verfiedBlock) => {
  blockchain.blocks.push(verfiedBlock);
};

const replaceChain = (newChain) => {
  blockchain.blocks = newChain;
};
const addTransactionToPool = (verifedTransactions) => {
  for (let i = 0; i < verifedTransactions.length; i++) {
    const transaction = verifedTransactions[i];
    let count = 0;
    for (let j = 0; j < transactionPool.length; j++) {
      if (transactionPool[j].id === transaction.id) {
        count++;
        break;
      }
    }
    if (count === 0) {
      transactionPool.push(transaction);
    }
  }
};

const removeTransactionFromPool = (verifedTransactions) => {
  let newPool = [];
  for (let i = 0; i < transactionPool.length; i++) {
    const transaction = transactionPool[i];
    let count = 0;
    for (let j = 0; j < verifedTransactions.length; j++) {
      if (transaction.id === verifedTransactions[j].id) {
        count++;
        break;
      }
    }
    if (count === 0) {
      newPool.push(transaction);
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
  replaceChain,
  addBlock,
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
