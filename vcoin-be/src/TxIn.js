class TxIn {
  constructor(txOutId, txOutIndex, signature) {
    // id of transation has the output
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.signature = signature;
  }

  canUnlockOutputWith(unlockingData) {
    return this.signature === unlockingData;
  }
}

module.exports = TxIn;
