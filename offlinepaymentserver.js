
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json());

const fraudServiceURL = 'http://localhost:5000/predict';

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', ws => {
    ws.send("Connected to CBDC Alert System");
});

function alertAdmin(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'ALERT', message }));
        }
    });
}

app.post('/transaction', async (req, res) => {
    const tx = req.body;

    const result = await axios.post(fraudServiceURL, {
        features: [tx.amount, tx.to, tx.time, tx.type]
    });

    if (result.data.is_fraud) {
        alertAdmin("Fraudulent transaction attempt detected!");
        return res.status(403).send("Transaction blocked due to fraud risk.");
    }

    res.send("Transaction processed.");
});

app.listen(3000, () => console.log('Server running on port 3000'));
