import {CHAIN} from "../common/ConfigEnv";
import {AbstractChainMngService} from "./AbstractChainMngService";

export class RootChainService extends AbstractChainMngService{

    start(): void {
        const bscChain = CHAIN.BSC;
        const bscRootMng = bscChain.ROOT_MANAGER;
        super.listenWithWeb3(bscChain.SERVER_ADDRESS, bscRootMng.ADDRESS, bscRootMng.ABI, bscRootMng.FILTER);

        const ethChain = CHAIN.BSC;
        const ethRootMng = ethChain.ROOT_MANAGER;
        super.listenWithWeb3(ethChain.SERVER_ADDRESS, ethRootMng.ADDRESS, ethRootMng.ABI, ethRootMng.FILTER);

        // const uniChain = CHAIN.UNI;
        // const uniRootMng = uniChain.ROOT_MANAGER;
        // super.listenWithUni(ethChain.SERVER_ADDRESS, uniRootMng.ADDRESS, uniRootMng.ABI, uniRootMng.FILTER);
    }
}