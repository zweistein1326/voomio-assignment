const initiateSocket = async (ws: any, memory: any, fetchInfo: any)=>{// communicate latest info to client on connection open
    // Get latest info
    const ethPrice = memory.getEthPrice();
    const gasPrice = memory.getGasPrice();

    // Listen for connection open
    ws.on('open', () => {
        console.log('Client connected');
    });

    // If gasPrice or ethPrice are 0
    // Update ethPrice and gasPrice Info
    // Get latest info
    // Send data to client
    ( async ()=>{ 
        console.log('Client connected', ethPrice);
        if(!gasPrice || !ethPrice){
            await fetchInfo();
            const ethPrice = memory.getEthPrice();
            const gasPrice = memory.getGasPrice();
            ws.send(JSON.stringify({ethPrice: ethPrice, gasPrice: gasPrice}));
        } else {
            ws.send(JSON.stringify({ethPrice: ethPrice, gasPrice: gasPrice}));
        }}
    )();

    // listen for messages from client
    ws.on('message', (_message: any) => {
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