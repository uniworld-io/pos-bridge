import {CHAIN} from "../common/ConfigEnv";
import {AbstractChainMngService} from "./AbstractChainMngService";
import {Constant} from "../common/Constant";

export class ChildChainService extends AbstractChainMngService{

    start(): void{
        //Listen and handler event deposit
        const bscChain = CHAIN.BSC;
        const bscChildMng = bscChain.CHILD_MANAGER;
        super.listen(Constant.WITHDRAW_EVENT, bscChain.ID, bscChain.SERVER_ADDRESS, bscChildMng.ADDRESS, bscChildMng.ABI, bscChildMng.FILTER);

        const ethChain = CHAIN.BSC;
        const ethChildMng = ethChain.CHILD_MANAGER;
        super.listen(Constant.WITHDRAW_EVENT, ethChain.ID, ethChain.SERVER_ADDRESS, ethChildMng.ADDRESS, ethChildMng.ABI, ethChildMng.FILTER);

        const uniChain = CHAIN.UNI;
        const uniChildMng = uniChain.CHILD_MANAGER;
        super.listen(Constant.WITHDRAW_EVENT, uniChain.ID, ethChain.SERVER_ADDRESS, uniChildMng.ADDRESS, uniChildMng.ABI, uniChildMng.FILTER);

    }

}