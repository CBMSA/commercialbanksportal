const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "bank", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "issueCBDC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transferCBDC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x1234567890abcdef1234567890abcdef12345678"; // replace with real address
let web3;
let cbdcContract;
let currentAccount;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];
    cbdcContract = new web3.eth.Contract(contractABI, contractAddress);
    document.getElementById('status').innerText = `Logged in as: ${currentAccount}`;
  } else {
    alert('Please install MetaMask to interact with this platform.');
  }
});

document.getElementById('issueCBDCForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  try {
    await cbdcContract.methods.issueCBDC(currentAccount, amount).send({ from: currentAccount });
    alert('CBDC issued successfully');
  } catch (err) {
    alert('Error issuing CBDC: ' + err.message);
  }
});

document.getElementById('transferForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const toAddress = document.getElementById('toAddress').value;
  const amount = document.getElementById('transferAmount').value;
  try {
    await cbdcContract.methods.transferCBDC(toAddress, amount).send({ from: currentAccount });
    alert('CBDC transferred to customer');
  } catch (err) {
    alert('Transfer failed: ' + err.message);
  }
});
