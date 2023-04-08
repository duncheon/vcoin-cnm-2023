// // const CryptoJS = require('crypto-js');
// const dontenv = require('dotenv');
// const BlockChain = require('./BlockChain');

const BlockChain = require('./BlockChain');
const Transaction = require('./Transaction');
const Wallet = require('./Wallet');

// // const BLOCK_GENERATION_INTERVAL = 10;
// // const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

// // class Block {
// //   constructor(index, prevHash, timestamp, data, blockHash, difficulty, nonce) {
// //     this.index = index;
// //     this.prevHash = prevHash;
// //     this.timestamp = timestamp;
// //     this.data = data;
// //     this.blockHash = blockHash;
// //     this.difficulty = difficulty;
// //     this.nonce = nonce;
// //   }
// // }

// // class Node {
// //   constructor() {}
// // }

// // const getLatestBlock = () => {
// //   return;
// // };

// // const calculateHash = (index, prevHash, timestamp, data) => {
// //   return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
// // };

// // const calculateHashForBlock = ({ index, prevHash, timestamp, data }) => {
// //   return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
// // };

// // const generateNextBlock = (blockData) => {
// //   let prevBlock = getLatestBlock();
// //   let nextIndex = prevBlock.index + 1;
// //   let nextTimestamp = new Date().getTime() / 1000;
// //   let nextHash = calculateHash(
// //     nextIndex,
// //     prevBlock.hash,
// //     nextTimestamp,
// //     blockData
// //   );

// //   return new Block(
// //     nextIndex,
// //     prevBlock.hash,
// //     nextTimestamp,
// //     blockData,
// //     nextHash
// //   );
// // };

// // // first block
// // const getGenesisBlock = () => {
// //   const timeStamp = '1234567891';
// //   const data = 'my genesis block';
// //   return new Block(
// //     0,
// //     data,
// //     timeStamp,
// //     'my genesis block',
// //     calculateHash(0, '0', timeStamp, data)
// //   );
// // };

// // const isValidNewBlock = (newBlock, prevBlock) => {
// //   if (prevBlock.index + 1 !== newBlock.index) {
// //     return false;
// //   } else if (prevBlock.blockHash !== newBlock.prevHash) {
// //     return false;
// //   } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
// //     return false;
// //   }

// //   return true;
// // };

// // const replaceChain = (blockChain, newBlocks) => {
// //   if (isValidChain(newBlocks) && newBlocks.length > blockChain.length) {
// //     blockChain = newBlocks;
// //     broadcast(responseLastMsg());
// //   } else {
// //     return blockChain;
// //   }
// // };

// // const isValidChain = (blockChain) => {
// //   if (JSON.stringify(blockChain[0]) !== JSON.stringify(getGenesisBlock())) {
// //     return false;
// //   }

// //   let tempBlocks = [blockChain[0]];
// //   for (let i = 1; i < blockChain.length; i++) {
// //     if (isValidNewBlock(blockChain[i], tempBlocks[i - 1])) {
// //       tempBlocks.push(blockChain[i]);
// //     } else return false;
// //   }

// //   return true;
// // };

// // const hashMatchesDifficulty = (hash, difficulty) => {
// //   const hashInBinary = hexToBinary(hash);
// //   const requiredPrefix = '0'.repeat(difficulty);
// //   return hashInBinary.startsWith(requiredPrefix);
// // };

// // const getDifficulty = (blockChain) => {
// //   const latestBlock = blockChain[blockChain.length - 1];
// //   if (
// //     latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 &&
// //     latestBlock.index !== 0
// //   ) {
// //     return getAdjustedDifficulty(latestBlock, blockChain);
// //   } else {
// //     return latestBlock.difficulty;
// //   }
// // };

// // const getAdjustedDifficulty = (latestBlock, blockChain) => {
// //   const prevAdjustmentBlock =
// //     blockChain[blockChain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
// //   const timeExpected =
// //     BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
// //   const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
// //   if (timeTaken < timeExpected / 2) {
// //     return prevAdjustmentBlock.difficulty + 1;
// //   } else if (timeExpected > timeExpected * 2) {
// //     return prevAdjustmentBlock.difficulty - 1;
// //   } else return prevAdjustmentBlock.difficulty;
// // };
// // const findBlock = (index, prevHash, timestamp, data) => {
// //   let nonce = 0;
// //   while (true) {
// //     const hash = calculateHash(
// //       index,
// //       prevHash,
// //       timestamp,
// //       NETWORK_DIFFICULTY,
// //       nonce
// //     );

// //     if (hashMatchesDifficulty(hash, NETWORK_DIFFICULTY)) {
// //       return new Block(
// //         index,
// //         hash,
// //         prevHash,
// //         timestamp,
// //         data,
// //         NETWORK_DIFFICULTY,
// //         nonce
// //       );
// //     }
// //     nonce++;
// //   }
// // };
// const blockChain = new BlockChain();
// blockChain.newGenesisBlock();
// blockChain.addBlock('hello there');
// blockChain.addBlock('Hi');

// blockChain.printBlockChains();

// const server = require('http').createServer();
// const io = require('socket.io')(server);
// const p2p = require('socket.io-p2p-server').Server;

// io.use(p2p);

// server.listen(3000, () => {
//   console.log('server working on port 3000');
// });

const blockChain = new BlockChain();
blockChain.newGenesisBlock(Transaction.newCoinBaseTX('Vinh', 'rewards gen'));

console.log("Vinh's balance: ", blockChain.getBalance('Vinh'));
blockChain.printBlockChains();
