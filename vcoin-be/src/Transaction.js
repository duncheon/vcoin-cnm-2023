const CryptoJs = require('crypto-js');
const TxIn = require('./TxIn');
const TxOut = require('./TxOut');
const { START_REWARD_COINS, START_AWARD_COINS } = require('./constVal');

class Transaction {
  constructor(id, txIns, txOuts) {
    this.id = id;
    this.txIns = txIns;
    this.txOuts = txOuts;
  }

  getTransactionId() {
    const txInContent = this.txIns
      .map((txIn) => txIn.txOutId + txIn.txOutIndex)
      .reduce((a, b) => a + b, '');

    const txOutContent = this.txOuts
      .map((txOut) => txOut.address + txOut.amount)
      .reduce((a, b) => a + b, '');

    return CryptoJs.SHA256(txInContent + txOutContent).toString();
  }

  isCoinBase() {
    return (
      this.txIns.length === 1 &&
      this.txIns[0].txOutIndex === -1 &&
      this.txIns[0].txOutId === ''
    );
  }
  static newCoinBaseTX(to, data) {
    if (data === '') {
      data = 'Reward to ' + to;
    }

    const txin = new TxIn('', -1, data);
    const txout = new TxOut(to, START_REWARD_COINS);
    const newTX = new Transaction(null, [txin], [txout]);
    newTX.id = newTX.getTransactionId();

    return newTX;
  }

  static newUTXOTransaction(from, to, amount, blockchain) {
    const input = [];
    const output = [];

    const [balance, validOutput] = blockchain.blocks.findSpendableOutputs(
      from,
      amount
    );
  }
}

module.exports = Transaction;
