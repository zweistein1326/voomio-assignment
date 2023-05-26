class Memory {
    gasPrice: object;
    ethPrice: string;

    getGasPrice = () => {
        return this.gasPrice;
    }

    getEthPrice = () => {
        return this.ethPrice;
    }

    setGasPrice = (price) => {
        this.gasPrice = price;
    }

    setEthPrice = (price) => {
        this.ethPrice = price;
    }
}

module.exports = {Memory};