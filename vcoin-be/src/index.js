const express = require('express');
const {
  blockchain,
  transactionPool,
  getTransactionPool,
  addTransactionToPool,
  setPrivateKey,
  setAddress,
  getAddress,
} = require('./data');
const cors = require('cors');
const Wallet = require('./Wallet');
const ProofOfWork = require('./ProofOfWork');

const {
  broadCastTransactionPool,
  initP2PServer,
  connectToPeers,
  broadcastNewBlockMined,
  getSockets,
} = require('./p2p');
const BlockChain = require('./BlockChain');
// // // const CryptoJS = require('crypto-js');
// // const dontenv = require('dotenv');
// // const BlockChain = require('./BlockChain');

// const BlockChain = require('./BlockChain');
// const Transaction = require('./Transaction');
// const Wallet = require('./Wallet');

// // // const BLOCK_GENERATION_INTERVAL = 10;
// // // const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

// // // class Block {
// // //   constructor(index, prevHash, timestamp, data, blockHash, difficulty, nonce) {
// // //     this.index = index;
// // //     this.prevHash = prevHash;
// // //     this.timestamp = timestamp;
// // //     this.data = data;
// // //     this.blockHash = blockHash;
// // //     this.difficulty = difficulty;
// // //     this.nonce = nonce;
// // //   }
// // // }

// // // class Node {
// // //   constructor() {}
// // // }

// // // const getLatestBlock = () => {
// // //   return;
// // // };

// // // const calculateHash = (index, prevHash, timestamp, data) => {
// // //   return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
// // // };

// // // const calculateHashForBlock = ({ index, prevHash, timestamp, data }) => {
// // //   return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
// // // };

// // // const generateNextBlock = (blockData) => {
// // //   let prevBlock = getLatestBlock();
// // //   let nextIndex = prevBlock.index + 1;
// // //   let nextTimestamp = new Date().getTime() / 1000;
// // //   let nextHash = calculateHash(
// // //     nextIndex,
// // //     prevBlock.hash,
// // //     nextTimestamp,
// // //     blockData
// // //   );

// // //   return new Block(
// // //     nextIndex,
// // //     prevBlock.hash,
// // //     nextTimestamp,
// // //     blockData,
// // //     nextHash
// // //   );
// // // };

// // // // first block
// // // const getGenesisBlock = () => {
// // //   const timeStamp = '1234567891';
// // //   const data = 'my genesis block';
// // //   return new Block(
// // //     0,
// // //     data,
// // //     timeStamp,
// // //     'my genesis block',
// // //     calculateHash(0, '0', timeStamp, data)
// // //   );
// // // };

// // // const isValidNewBlock = (newBlock, prevBlock) => {
// // //   if (prevBlock.index + 1 !== newBlock.index) {
// // //     return false;
// // //   } else if (prevBlock.blockHash !== newBlock.prevHash) {
// // //     return false;
// // //   } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
// // //     return false;
// // //   }

// // //   return true;
// // // };

// // // const replaceChain = (blockChain, newBlocks) => {
// // //   if (isValidChain(newBlocks) && newBlocks.length > blockChain.length) {
// // //     blockChain = newBlocks;
// // //     broadcast(responseLastMsg());
// // //   } else {
// // //     return blockChain;
// // //   }
// // // };

// // // const isValidChain = (blockChain) => {
// // //   if (JSON.stringify(blockChain[0]) !== JSON.stringify(getGenesisBlock())) {
// // //     return false;
// // //   }

// // //   let tempBlocks = [blockChain[0]];
// // //   for (let i = 1; i < blockChain.length; i++) {
// // //     if (isValidNewBlock(blockChain[i], tempBlocks[i - 1])) {
// // //       tempBlocks.push(blockChain[i]);
// // //     } else return false;
// // //   }

// // //   return true;
// // // };

// // // const hashMatchesDifficulty = (hash, difficulty) => {
// // //   const hashInBinary = hexToBinary(hash);
// // //   const requiredPrefix = '0'.repeat(difficulty);
// // //   return hashInBinary.startsWith(requiredPrefix);
// // // };

// // // const getDifficulty = (blockChain) => {
// // //   const latestBlock = blockChain[blockChain.length - 1];
// // //   if (
// // //     latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 &&
// // //     latestBlock.index !== 0
// // //   ) {
// // //     return getAdjustedDifficulty(latestBlock, blockChain);
// // //   } else {
// // //     return latestBlock.difficulty;
// // //   }
// // // };

// // // const getAdjustedDifficulty = (latestBlock, blockChain) => {
// // //   const prevAdjustmentBlock =
// // //     blockChain[blockChain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
// // //   const timeExpected =
// // //     BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
// // //   const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
// // //   if (timeTaken < timeExpected / 2) {
// // //     return prevAdjustmentBlock.difficulty + 1;
// // //   } else if (timeExpected > timeExpected * 2) {
// // //     return prevAdjustmentBlock.difficulty - 1;
// // //   } else return prevAdjustmentBlock.difficulty;
// // // };
// // // const findBlock = (index, prevHash, timestamp, data) => {
// // //   let nonce = 0;
// // //   while (true) {
// // //     const hash = calculateHash(
// // //       index,
// // //       prevHash,
// // //       timestamp,
// // //       NETWORK_DIFFICULTY,
// // //       nonce
// // //     );

// // //     if (hashMatchesDifficulty(hash, NETWORK_DIFFICULTY)) {
// // //       return new Block(
// // //         index,
// // //         hash,
// // //         prevHash,
// // //         timestamp,
// // //         data,
// // //         NETWORK_DIFFICULTY,
// // //         nonce
// // //       );
// // //     }
// // //     nonce++;
// // //   }
// // // };
// // const blockChain = new BlockChain();
// // blockChain.newGenesisBlock();
// // blockChain.addBlock('hello there');
// // blockChain.addBlock('Hi');

// // blockChain.printBlockChains();

// // const server = require('http').createServer();
// // const io = require('socket.io')(server);
// // const p2p = require('socket.io-p2p-server').Server;

// // io.use(p2p);

// // server.listen(3000, () => {
// //   console.log('server working on port 3000');
// // });

// const blockChain = new BlockChain();
// const genesisWalletAddress = 'Vinh';
// const walAdd1 = 'KEKW';
// const walAdd2 = 'ETU';

// blockChain.newGenesisBlock(Transaction.newCoinBaseTX('Vinh', 'rewards gen'));

// console.log("Vinh's balance: ", blockChain.getBalance('Vinh'));

// let newBlock = blockChain.sendCoin(genesisWalletAddress, walAdd1, 3);

// blockChain.updateChain(newBlock);

// console.log(
//   `${genesisWalletAddress}'s balance: `,
//   blockChain.getBalance('Vinh')
// );

// console.log(`${walAdd1}'s balance: `, blockChain.getBalance(walAdd1));
// console.log(`${walAdd2}'s balance: `, blockChain.getBalance(walAdd2));
// newBlock = blockChain.sendCoin(walAdd1, walAdd2, 2);

// blockChain.updateChain(newBlock);

// blockChain.printBlockChains();

// console.log(
//   `${genesisWalletAddress}'s balance: `,
//   blockChain.getBalance('Vinh')
// );
// console.log(`${walAdd1}'s balance: `, blockChain.getBalance(walAdd1));
// console.log(`${walAdd2}'s balance: `, blockChain.getBalance(walAdd2));

// newBlock = blockChain.sendCoin(walAdd2, genesisWalletAddress, 1);

// blockChain.updateChain(newBlock);

// blockChain.printBlockChains();

// console.log(
//   `${genesisWalletAddress}'s balance: `,
//   blockChain.getBalance('Vinh')
// );

// console.log(`${walAdd1}'s balance: `, blockChain.getBalance(walAdd1));
// console.log(`${walAdd2}'s balance: `, blockChain.getBalance(walAdd2));

// newBlock = blockChain.sendCoin(genesisWalletAddress, walAdd2, 100);

// blockChain.updateChain(newBlock);

// blockChain.printBlockChains();

// console.log(
//   `${genesisWalletAddress}'s balance: `,
//   blockChain.getBalance('Vinh')
// );

// console.log(`${walAdd1}'s balance: `, blockChain.getBalance(walAdd1));
// console.log(`${walAdd2}'s balance: `, blockChain.getBalance(walAdd2));

// blockChain.printBlockChains();

// // const init = Wallet.initWallet();
// // const publicKey =

const httpPort = parseInt(process.argv[2]) || 3001;
const p2pPort = parseInt(process.argv[3]) || 6001;

const initHttpServer = (httpPort) => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.get('/blocks', (req, res) => {
    return res.json(blockchain.blocks);
  });

  app.get('/walletExists', (req, res) => {
    return res.json({ isExists: Wallet.privateKeyExists() });
  });
  app.get('/blocks', (req, res) => {
    const { page } = req.query.page;

    return res.json(blockchain.blocks);
  });

  app.get('/transactions', (req, res) => {
    const { page } = req.query.page;

    const transactions = blockchain.getAllTransactions(getTransactionPool());
    const result = transactions.map((transaction) => {
      let transactionInfo = null;

      transactionInfo = blockchain.getTransactionInfo(transaction);
      return {
        ...transactionInfo,
        status: transaction.status,
      };
    });

    return res.json(result);
  });

  app.get('/wallets', (req, res) => {
    return res.json(Wallet.getWallets());
  });

  app.get('/walletInfo', (req, res) => {
    const address = Wallet.getPublicKey();
    console.log(address);
    return res.json({
      publicAddress: address,
      balance: blockchain.getBalance(address),
    });
  });

  app.get('/balance/:address', (req, res) => {
    console.log(req.params.address);
    const balance = blockchain.getBalance(req.params.address);

    return res.json(balance);
  });

  app.post('/sendcoin', (req, res) => {
    const { from, to, amount } = req.body;
    const transactions = blockchain.sendCoin(from, to, parseInt(amount));
    addTransactionToPool(transactions);

    broadCastTransactionPool();

    return res.json(transactions);
  });

  app.post('/addPeer', (req, res) => {
    const curTotal = getSockets().length;
    console.log(req.body.peer);
    connectToPeers(req.body.peer);
    const newTotal = getSockets().length;
    if (curTotal < newTotal) {
      return res.json({
        status: 'success',
      });
    } else
      return res.json({
        status: 'failed',
      });
  });

  app.get('/transactionPool', (req, res) => {
    return res.json(getTransactionPool());
  });

  app.get('/peers', (req, res) => {
    return res.json(getSockets());
  });

  app.post('/wallet/init', async (req, res) => {
    const { password } = req.body;
    let init = false;
    if (Wallet.privateKeyExists()) {
      init = true;
    } else init = Wallet.initWallet();

    if (init === true) {
      setPrivateKey(Wallet.getPrivateKey());
      setAddress();
      const setPassword = Wallet.setPassword(getAddress(), password);

      if (setPassword) {
        return res.status(201).send({
          status: 'success',
          ...Wallet.getWallets(),
        });
      }

      return res.json({
        result: 'failed',
      });
    }
    return res.json({
      result: 'failed',
    });
  });

  app.get('/mineTransactions', (req, res) => {
    console.log('Hi', getTransactionPool());
    const transactions = [...getTransactionPool()];

    const lastestBlock = BlockChain.getLatestBlock(blockchain);
    const block = ProofOfWork.findBlock(
      lastestBlock.index + 1,
      lastestBlock.blockHash,
      new Date().getTime() / 100,
      transactions,
      ProofOfWork.getAdjustedDifficulty(blockchain)
    );

    broadcastNewBlockMined(block);

    res.json({
      block,
      status: 'success',
    });
  });

  app.listen(httpPort, () => {
    console.log('Http server listening on PORT: ', httpPort);
  });
};

initHttpServer(httpPort);
initP2PServer(p2pPort);
