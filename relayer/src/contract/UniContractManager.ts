import {IContractManager} from "./IContractManager";
import {CHAIN} from "../config/ConfigEnv";

const UNI = CHAIN.UNI;
export class UniContractManager implements IContractManager{

    private readonly childMngContract: any
    private readonly rootMngContract: any;
    private readonly connector: any;
    constructor(connector: any) {
        this.connector = connector;

        const childMng = UNI.CHILD_MANAGER;
        this.childMngContract = connector.contract(childMng.ABI, childMng.ADDRESS);

        const rootMng = UNI.ROOT_MANAGER;
        this.rootMngContract = connector.contract(rootMng.ABI, rootMng.ADDRESS);
    }


    getChainId(): number {
        return CHAIN.UNI.ID;
    }

    getChild(): any {
        return this.childMngContract;
    }

    getRoot(): any {
        return this.rootMngContract;
    }

    getConnector(): any {
        return this.connector;
    }

}