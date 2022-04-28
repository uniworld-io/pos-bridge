import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {CHAIN} from "../config/ConfigEnv";
import {IContractManager} from "./IContractManager";

const ETH = CHAIN.ETH;

export class EthContractManager implements IContractManager{

    private readonly childMngContract: Contract
    private readonly rootMngContract: Contract;
    private readonly connector: Web3;

    constructor(connector: Web3) {
        this.connector = connector;
        const childMng = ETH.CHILD_MANAGER;
        this.childMngContract = new connector.eth.Contract(childMng.ABI, childMng.ADDRESS);

        const rootMng = ETH.ROOT_MANAGER;
        this.rootMngContract = new connector.eth.Contract(rootMng.ABI, rootMng.ADDRESS);
    }

    getChild(): any {
        return this.childMngContract;
    }

    getRoot(): any {
        return this.rootMngContract;
    }

    getChainId(): number {
        return ETH.ID;
    }

    getConnector(): any {
        return this.connector;
    }

}