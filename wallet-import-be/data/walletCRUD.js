const fs = require('fs');
const path = './data/data.json';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const getData = () => {
  return JSON.parse(fs.readFileSync(path));
};
const updateData = (newData) => {
  try {
    const result = fs.writeFileSync(path, newData);
    return true;
  } catch (err) {}

  return false;
};

const isPassPhraseExists = (passphrase) => {
  const data = getData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].passphrase === passphrase) {
      return true;
    }
  }
  return false;
};

const findWallets = (idx) => {
  const data = getData();
  return data[idx].wallets;
};

const addNewPassPhrase = (passphrase) => {
  const data = getData();
  data.push({
    passphrase,
    wallets: [],
  });

  updateData(result);
};

const addNewWallet = (privateKey, idx) => {
  const data = getData();
  data[idx].wallets.push(privateKey);

  updateData(data);
};

const isAddressValid = (address) => {
  const data = getData();
  for (let i = 0; i < data.length; i++) {
    const wallets = data[i].wallets;
    for (let j = 0; j < wallets.length; j++) {
      if (ec.keyFromPrivate(wallets[j]) === address) {
        return true;
      }
    }
  }
  return false;
};

module.exports = {
  addNewPassPhrase,
  addNewWallet,
  isPassPhraseExists,
  findWallets,
  isAddressValid,
  getData,
};
