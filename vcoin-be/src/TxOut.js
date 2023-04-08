class TxOut {
  constructor(address, amount) {
    this.address = address;
    this.amount = amount;
  }

  canBeUnlockedWith(unlockingData) {
    return this.address === unlockingData;
  }
}

module.exports = TxOut;
