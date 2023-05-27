import {ETHPrice} from "./types";

class Memory {
    gasPrice: string;
    ethPrice: ETHPrice;

    constructor() {
        this.gasPrice = '';
        this.ethPrice = {};
    }

    getGasPrice = (): string => {
        return this.gasPrice;
    }

    getEthPrice = (): ETHPrice => {
        return this.ethPrice;
    }

    setGasPrice = (price: string | number): void => {
        this.gasPrice = price.toString();
    }

    setEthPrice = (price: ETHPrice): void => {
        this.ethPrice = price;
    }
}

export = Memory;