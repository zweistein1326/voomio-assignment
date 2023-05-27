import {ETHPrice} from "./types";

const initiateSocket = async (ws: any, memory: any, updatePriceInfo: any)=>{
    // Get latest info
    let ethPrice: ETHPrice = memory.getEthPrice();
    let gasPrice: string = memory.getGasPrice();

    // -------------------------EVENT LISTENERS------------------------- //
    // Listen for connection open
    ws.on('open', (_: any): void => console.log('Client connected'));
    // listen for messages from client
    ws.on('message', (_message: any): void => console.log('Message recieved from client'));
    // listen for client disconnect
    ws.on('close', (_: any): void => console.log('Client disconnected'));
    // listen for errors
    ws.on('error', (err: any): void => console.log(err))
    // -------------------------EVENT LISTENERS------------------------- //

    // -------------------------SEND INFO------------------------- //
    // If gasPrice or ethPrice are 0
    // Update ethPrice and gasPrice Info
    // Get latest info
    // Send data to client
    const sendInfo = async (): Promise<void> => { 
        if(!gasPrice || !ethPrice){
            await updatePriceInfo();
            ethPrice = memory.getEthPrice();
            gasPrice = memory.getGasPrice();
        }
        ws.send(JSON.stringify({ethPrice, gasPrice}));
    }

    // communicate latest info to client on connection open
    sendInfo();
    // -------------------------SEND INFO------------------------- //
}

export {initiateSocket};