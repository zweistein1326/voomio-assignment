import Memory = require("./memory");
import {ETHPrice} from "./types";
import { initiateSocket } from "./web-socket";
import Web3 from "web3";
import axios from "axios";
import * as WebSocket from "ws";
import dotenv = require('dotenv');

// -------------------------SETUP------------------------- //
/// Load environment variables
dotenv.config();
dotenv.config({path: '.env.local', override: true});

/// Connect to Infura node
/// Create websocket server
/// Create memory instance
var web3: Web3 = new Web3('wss://mainnet.infura.io/ws/v3/5d0233c446ba4d538c2082aefc9bd130');
var WSS: WebSocket.Server = new WebSocket.Server({port: 443});
const memory: Memory = new Memory();
// -------------------------SETUP------------------------- //

// -------------------------EVENT LISTENERS------------------------- //
// Listen for new connections from clients and initiate socket
WSS.on('connection', async (ws: any): Promise<void> => {
    initiateSocket(ws, memory, updatePriceInfo);
});

// Listen for new blocks and send data to all clients
web3.eth.subscribe('newBlockHeaders', async (error: any, _result:any): Promise<void> => {
    if (!error) {
        await updatePriceInfo();
        WSS.clients.forEach((client: any) => {
            const ethPrice: object = memory.getEthPrice();
            const gasPrice: string = memory.getGasPrice();
            client.send(JSON.stringify({ethPrice, gasPrice}));
        });
        return;
    }
    console.error(error);
});
// -------------------------EVENT LISTENERS------------------------- //

// -------------------------GET INFO------------------------- //
// fetchEthPrice - Get price of ETH from https://www.cryptocompare.com/
// fetchInfo - Fetches gas price and eth price and sends to all clients
const fetchEthPrice = async (): Promise<ETHPrice> => {
    return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR&api_key=${process.env.API_KEY}`).then((res) => {
        return res.data;
    })
}
const updatePriceInfo = async (): Promise<void> => {
    // Returns gas price in wei from web3 node
    let gasPrice: number | string = await web3.eth.getGasPrice();
    memory.setGasPrice(gasPrice);
    // Returns eth price as an object {USD, JPY, EUR}
    let ethPrice: ETHPrice = await fetchEthPrice();
    memory.setEthPrice(ethPrice);
    // Send data to all clients
}
// -------------------------GET INFO------------------------- //

// -------------------------MAIN------------------------- //
// Fetch info on startup
updatePriceInfo();
// -------------------------MAIN------------------------- //