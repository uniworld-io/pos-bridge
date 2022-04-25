import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {CHAIN} from "../common/ConfigEnv";
import {IContractManager} from "./IContractManager";

const BSC = CHAIN.BSC;

export class BscContractManager implements IContractManager{

    private web3: Web3;
    private readonly childMngContract: Contract
    private readonly rootMngContract: Contract;
    constructor() {
        this.web3 = new Web3();

        const childMng = BSC.CHILD_MANAGER;
        this.childMngContract = new this.web3.eth.Contract(childMng.ABI, childMng.ADDRESS);

        const rootMng = BSC.ROOT_MANAGER;
        this.rootMngContract = new this.web3.eth.Contract(rootMng.ABI, rootMng.ADDRESS);
    }

    getChild(): any {
        return this.childMngContract;
    }

    getRoot(): any {
        return this.rootMngContract;
    }

}