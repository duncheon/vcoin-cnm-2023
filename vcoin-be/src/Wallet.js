require('dotenv');

const ec = require('elliptic').ec;
const EC = new ec('secp256k1');
const privateKeyLocation = process.env.PRIVATE_KEY || '../data/wallet.json';
const fs = require('fs');

class Wallet {
  constructor() {}

  privateKeyExists(location) {
    try {
      let walletData = JSON.parse(fs.readFileSync(privateKeyLocation));
      if (walletData.privateKey) {
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  }

  initWallet() {
    if (this.privateKeyExists(privateKeyLocation)) {
      return;
    }

    const newPrivateKey = this.generatePrivateKey();

    const walletData = JSON.stringify({
      newPrivateKey,
    });

    try {
      fs.writeFileSync(privateKeyLocation, walletData);
    } catch (err) {}
  }

  generatePrivateKey() {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  }

  getPublicKey() {
    const privateKey = this.getPrivateKey();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
  }
}

module.exports = Wallet;
