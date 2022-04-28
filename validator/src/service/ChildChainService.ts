import {CHAIN} from "../config/ConfigEnv";
import {AbstractChainMngService} from "./AbstractChainMngService";
import {Constant} from "../common/Constant";

export class ChildChainService extends AbstractChainMngService{

    start(): void{
        // Listen and handler event
        const bscChain = CHAIN.BSC;
        const bscChildMng = bscChain.CHILD_MANAGER;
        super.listen(Constant.WITHDRAW_EXEC, bscChain.ID, bscChain.EVENT_HOST, bscChildMng.ADDRESS, bscChildMng.ABI, bscChildMng.FILTER);

        const ethChain = CHAIN.ETH;
        const ethChildMng = ethChain.CHILD_MANAGER;
        super.listen(Constant.WITHDRAW_EXEC, ethChain.ID, ethChain.EVENT_HOST, ethChildMng.ADDRESS, ethChildMng.ABI, ethChildMng.FILTER);

        // const uniChain = CHAIN.UNI;
        // const uniChildMng = uniChain.CHILD_MANAGER;
        // super.listen(Constant.WITHDRAW_EXEC, uniChain.ID, ethChain.EVENT_HOST, uniChildMng.ADDRESS, uniChildMng.ABI, uniChildMng.FILTER);

    }

}