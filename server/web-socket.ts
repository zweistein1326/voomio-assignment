const initiateSocket = async (ws: any, memory, fetchInfo)=>{// communicate latest info to client on connection open
    const ethPrice = memory.getEthPrice();
    const gasPrice = memory.getGasPrice();

    ws.on('open', () => console.log('Client connected'));
    console.log('Client connected');

    // If we don't have the latest info, fetch it
    if(!gasPrice || !ethPrice){
        await fetchInfo();
    }
    // Send data to client
    ws.send(JSON.stringify({ethPrice: ethPrice, gasPrice: gasPrice}));

    // listen for messages from client
    ws.on('message', _message => {
        // Do nothing - stay unidirectional for now
    });

    // listen for client disconnect
    ws.on('close', () => console.log('Client disconnected'));

    // listen for errors
    ws.on('error', (err: any) => {
        console.log(err);
    })
}

module.exports = {initiateSocket};