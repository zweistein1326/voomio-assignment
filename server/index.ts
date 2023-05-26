var Web3 = require('web3');
var axios = require('axios');
var WebSocketServer = require('ws').Server;
var dotenv = require('dotenv');
var {initiateSocket} = require('./web-socket');
var {Memory} = require('./memory');

// -------------------------BEGIN SETUP------------------------- //
/// Load environment variables
dotenv.config();
dotenv.config({path: '.env.local', override: true});

/// Connect to Infura node
/// Create websocket server
/// Create memory instance
var web3 = new Web3('wss://mainnet.infura.io/ws/v3/5d0233c446ba4d538c2082aefc9bd130');
var WSS = new WebSocketServer({port: 443});
const memory = new Memory();
// -------------------------END SETUP------------------------- //

// -------------------------BEGIN GET INFO------------------------- //
// fetchEthPrice - Get price of ETH from https://www.cryptocompare.com/
// fetchInfo - Fetches gas price and eth price and sends to all clients
async function fetchEthPrice() {
    return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR&api_key=${process.env.API_KEY}`).then((res) => {
        return res.data;
    })
}
async function fetchInfo() {
    // Returns gas price in wei from web3 node
    let gasPrice = await web3.eth.getGasPrice();
    memory.setGasPrice(gasPrice);
    // Returns eth price as an object {USD, JPY, EUR}
    let ethPrice = await fetchEthPrice();
    memory.setEthPrice(ethPrice);
    // Send data to all clients
    return true;
}
// -------------------------END GET INFO------------------------- //

// -------------------------BEGIN LISTENERS------------------------- //
// Listen for new connections from clients and initiate socket
WSS.on('connection', async (ws: any) => {
    initiateSocket(ws, memory, fetchInfo);
});

// Listen for new blocks and send data to all clients
web3.eth.subscribe('newBlockHeaders', async function(error: any, _result:any){
    if (!error) {
        await fetchInfo();
        WSS.clients.forEach(client => {
            const ethPrice = memory.getEthPrice();
            const gasPrice = memory.getGasPrice();
            client.send(JSON.stringify({ethPrice: ethPrice, gasPrice: gasPrice}));
        });
        return;
    }
    console.error(error);
});
// -------------------------END LISTENERS------------------------- //

// -------------------------BEGIN MAIN------------------------- //
// Fetch info on startup
fetchInfo();
// -------------------------END MAIN------------------------- //