const CryptoJs = require('crypto-js');
const TxIn = require('./TxIn');
const TxOut = require('./TxOut');
const { START_REWARD_COINS, START_AWARD_COINS } = require('./constVal');
const ec = require('elliptic').ec;
const EC = new ec('secp256k1');
const Wallet = require('./Wallet');

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

  static newUTXOTransaction(from, to, amount, blockchain, privateKey) {
    const inputs = [];
    const outputs = [];
    let result = null;

    const [outputAmount, validOutputs] = blockchain.findSpendableOutputs(
      from,
      amount
    );

    if (outputAmount < amount) {
      console.log(`${from} doesnt have enough balance`);
      return result;
    }

    for (let i = 0; i < validOutputs.length; i++) {
      const unspendOutput = validOutputs[i];
      let newInput = new TxIn(
        unspendOutput.txOutId,
        unspendOutput.txOutIndex,
        from
      );

      inputs.push(newInput);
    }

    outputs.push(new TxOut(to, amount));

    if (outputAmount > amount) {
      outputs.push(new TxOut(from, outputAmount - amount));
    }

    result = new Transaction(null, inputs, outputs);
    result.id = result.getTransactionId();

    //result = result.signTxIns(result, privateKey, validOutputs);
    return result;
  }

  signTxIns(transaction, privateKey, unspentTxOuts) {
    const dataToSign = this.id;
    const key = EC.keyFromPrivate(privateKey, 'hex');
    for (let i = 0; i < transaction.txIns.length; i++) {
      const txIn = transaction.txIns[i];

      const refUnspentTxOut = [];
      unspentTxOuts.forEach((unspentTxOut) => {
        if (
          unspentTxOut.txOutId === txIn.txOutId &&
          unspentTxOut.txOutIndex === txIn.txOutIndex
        ) {
          refUnspentTxOut.push(unspentTxOut);
        }
      });

      if (refUnspentTxOut === null) {
        console.log('Could not find ref txOut');
        throw Error();
      }

      const refAddress = refUnspentTxOut.address;

      if (Wallet.getPublicKey(privateKey) !== refAddress) {
        console.log('Not match address that is ref in txIn');
        throw Error();
      }

      const signature = key.sign(dataToSign).toDER().toString();
      transaction.txIns[i].signature = signature;
    }
    return transaction;
  }

  // validateTransaction(blockchain, transaction, from) {
  //   // valid id
  //   if (typeof transaction.id !== 'string') {
  //     return false;
  //   }

  //   const reCalId = this.getTransactionId(transaction);
  //   if (reCalId !== transaction.id) {
  //     return false;
  //   }

  //   // valid tXIns
  //   const unspentTxOuts = blockchain.findUnspentTxOuts(from);
  //   const txIns = transaction.txIns;
  //   for (let i = 0 ; i < txIns.length ;i++) {
  //     let count = 0;
  //   for (let i = 0; i < unspentTxOuts.length; i++) {
  //     if (unspentTxOuts.tx)
  //   }
  //   if (count <= 0) {
  //     return false;
  //   }
  //   }

  //   const key = EC.keyFromPublic()

  // }
}

module.exports = Transaction;
