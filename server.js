// backend/server.js
// SADC BC Backend Server (Node.js with Express)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Web3 = require('web3');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Web3 and contract setup
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const SADCBC_CONTRACT_ADDRESS = '0xYourTokenAddress';
const SADCBC_ABI = []; // Replace with real ABI
const sadcbc = new web3.eth.Contract(SADCBC_ABI, SADCBC_CONTRACT_ADDRESS);

// Simulated Order Book
let orderBook = [];

app.get('/api/rates', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch exchange rates.' });
  }
});

app.post('/api/trade', (req, res) => {
  const { buyer, seller, amount, price, currency } = req.body;
  orderBook.push({ buyer, seller, amount, price, currency, status: 'pending' });
  res.json({ message: 'Trade submitted successfully' });
});

let deposits = []; let withdrawals = [];

app.post('/api/deposit', (req, res) => {
  const { userId, amount, method, provider } = req.body;
  deposits.push({ userId, amount, method, provider });
  res.json({ message: `Deposit request submitted via ${provider}` });
});

app.post('/api/withdraw', (req, res) => {
  const { userId, amount, method, provider } = req.body;
  withdrawals.push({ userId, amount, method, provider });
  res.json({ message: `Withdrawal request submitted via ${provider}` });
});

app.listen(port, () => {
  console.log(`SADC BC backend running on http://localhost:${port}`);
});
