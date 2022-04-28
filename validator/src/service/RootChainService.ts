import {CHAIN} from "../config/ConfigEnv";
import {AbstractChainMngService} from "./AbstractChainMngService";
import {Constant} from "../common/Constant";

export class RootChainService extends AbstractChainMngService{

    start(): void {
        const bscChain = CHAIN.BSC;
        const bscRootMng = bscChain.ROOT_MANAGER;
        super.listen(Constant.DEPOSIT_EXEC, bscChain.ID, bscChain.EVENT_HOST, bscRootMng.ADDRESS, bscRootMng.ABI, bscRootMng.FILTER);

        const ethChain = CHAIN.ETH;
        const ethRootMng = ethChain.ROOT_MANAGER;
        super.listen(Constant.DEPOSIT_EXEC, ethChain.ID, ethChain.EVENT_HOST, ethRootMng.ADDRESS, ethRootMng.ABI, ethRootMng.FILTER);

        // const uniChain = CHAIN.UNI;
        // const uniRootMng = uniChain.ROOT_MANAGER;
        // super.listen(Constant.DEPOSIT_EXEC, uniChain.ID, uniChain.EVENT_HOST, uniRootMng.ADDRESS, uniRootMng.ABI, uniRootMng.FILTER);
    }
}