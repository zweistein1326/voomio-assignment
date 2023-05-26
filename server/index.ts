var Web3 = require('web3');
var axios = require('axios');
var WebSocketServer = require('ws').Server;
var dotenv = require('dotenv');
var {initiateSocket} = require('./web-socket');
var {Memory} = require('./memory');

// Load environment variables
dotenv.config();
dotenv.config({path: '.env.local', override: true});

// Create memory object
const memory = new Memory();

// Create websocket server
var WSS = new WebSocketServer({port: 443});
// Listen for new connections from clients
WSS.on('connection', async (ws: any) => {
    initiateSocket(ws, memory, fetchInfo);
});

// Connect to Infura node
var web3 = new Web3('wss://mainnet.infura.io/ws/v3/5d0233c446ba4d538c2082aefc9bd130');
// Listen for new blocks
web3.eth.subscribe('newBlockHeaders', async function(error: any, _result:any){
    if (!error) {
        await fetchInfo();
        WSS.clients.forEach(client => {
            const ethPrice = memory.getEthPrice();
            const gasPrice = memory.getGasPrice();
            client.send(JSON.stringify({ethPrice: ethPrice, gasPrice: gasPrice}));
        });
        // @ts-ignore
        return;
    }
    console.error(error);
});

// Get price of ETH from API
async function fetchPrice() {
    return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR&api_key=${process.env.API_KEY}`).then((res) => {
        return res.data;
    })
}

// Fetches gas price and eth price and sends to all clients
async function fetchInfo() {
    // Returns gas price in wei
    let gasPrice = await web3.eth.getGasPrice();
    memory.setGasPrice(gasPrice);
    // Returns eth price as an object {USD, JPY, EUR}
    let ethPrice = await fetchPrice();
    memory.setEthPrice(ethPrice);
    // Send data to all clients
    return true;
}