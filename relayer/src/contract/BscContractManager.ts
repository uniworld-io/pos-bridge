import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {CHAIN} from "../config/ConfigEnv";
import {IContractManager} from "./IContractManager";

const BSC = CHAIN.BSC;

export class BscContractManager implements IContractManager{
    private readonly childMngContract: Contract
    private readonly rootMngContract: Contract;
    private readonly connector: Web3;

    constructor(connector: Web3) {
        this.connector = connector;
        connector.eth.accounts.wallet.add('23e2eae41fca0f33e0fd3c1b901b1b114e75af8664fc6d88f18e48153a67aae0');

        const childMng = BSC.CHILD_MANAGER;
        this.childMngContract = new connector.eth.Contract(childMng.ABI, childMng.ADDRESS);

        const rootMng = BSC.ROOT_MANAGER;
        this.rootMngContract = new connector.eth.Contract(rootMng.ABI, rootMng.ADDRESS);

    }

    getChild(): any {
        return this.childMngContract;
    }

    getRoot(): any {
        return this.rootMngContract;
    }

    getChainId(): number {
        return BSC.ID;
    }

    getConnector(): any {
        return this.connector;
    }
}