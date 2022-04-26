import {CHAIN} from "../common/ConfigEnv";
import {AbstractChainMngService} from "./AbstractChainMngService";
import {Constant} from "../common/Constant";

export class RootChainService extends AbstractChainMngService{

    start(): void {
        // const bscChain = CHAIN.BSC;
        // const bscRootMng = bscChain.ROOT_MANAGER;
        // super.listen(Constant.DEPOSIT_EVENT, bscChain.ID, bscChain.SERVER_ADDRESS, bscRootMng.ADDRESS, bscRootMng.ABI, bscRootMng.FILTER);
        //
        // const ethChain = CHAIN.BSC;
        // const ethRootMng = ethChain.ROOT_MANAGER;
        // super.listen(Constant.DEPOSIT_EVENT, ethChain.ID, ethChain.SERVER_ADDRESS, ethRootMng.ADDRESS, ethRootMng.ABI, ethRootMng.FILTER);

        const uniChain = CHAIN.UNI;
        const uniRootMng = uniChain.ROOT_MANAGER;
        super.listen(Constant.DEPOSIT_EVENT, uniChain.ID, uniChain.SERVER_ADDRESS, uniRootMng.ADDRESS, uniRootMng.ABI, uniRootMng.FILTER);
    }
}