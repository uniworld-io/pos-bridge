import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {CHAIN} from "../common/ConfigEnv";
import {IContractManager} from "./IContractManager";

const ETH = CHAIN.ETH;

export class EthContractManager implements IContractManager{

    //@TODO review pool connection
    private web3: Web3;
    childMngContract: Contract
    rootMngContract: Contract;
    constructor() {
        this.web3 = new Web3(ETH.SERVER_ADDRESS);

        const childMng = ETH.CHILD_MANAGER;
        this.childMngContract = new this.web3.eth.Contract(childMng.ABI, childMng.ADDRESS);

        const rootMng = ETH.ROOT_MANAGER;
        this.rootMngContract = new this.web3.eth.Contract(rootMng.ABI, rootMng.ADDRESS);
    }

    getChild(): any {
        return this.childMngContract;
    }

    getRoot(): any {
        return this.rootMngContract;
    }

}