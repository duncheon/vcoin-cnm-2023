const express = require('express');
const app = express();
const PORT = 5000;
const {
  addNewPassPhrase,
  addNewWallet,
  isPassPhraseExists,
  isWalletExists,
  isAddressValid,
  findWallets,
} = require('./data/walletCRUD');

app.use(express.json());

app.get('/address/valid/:address', (req, res) => {
  const address = req.params.address;
  return res.json({ isValid: isAddressValid(address) });
});

app.post('/passphrase/create', (req, res) => {
  const { passphrase, privateKey } = req.body;

  try {
    const [result, idx] = isPassPhraseExists(passphrase);
    if (result) {
      addNewWallet(privateKey, idx);
      return res.json({ status: 'failed', message: 'duplicate passphrase' });
    } else {
      addNewPassPhrase(passphrase);
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 'failed',
      message: 'server err',
    });
  }
});
app.post('/wallet/create', (req, res) => {
  const { passphrase, privateKey } = req.body;

  try {
    if (isPassPhraseExists(passphrase)) {
      addNewWallet(passphrase, privateKey);
      return res.json({ status: 'success' });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 'failed',
    });
  }
});

app.post('/passphrase/import', (req, res) => {
  const { passphrase } = req.body;
  try {
    const [result, idx] = isPassPhraseExists(passphrase);
    if (result) {
      const wallets = findWallets(idx);

      return res.json({
        passphrase,
        wallets,
      });
    } else {
      return res.json({
        status: 'failed',
        message: 'passphrase not found',
      });
    }
  } catch (err) {
    return res.json({
      status: 'failed',
      message: 'server err',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Import wallet server listening on port ${PORT}`);
});
