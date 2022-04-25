import {ContractEventListener} from "../event/ContractEventListener";
import {Constant} from "../common/Constant";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {ContractEventHandler} from "../hander/ContractEventHandler";
import {RelayFeignClientHttp} from "../fignclient/RelayFeignClientHttp";
import {CHAIN} from "../common/ConfigEnv";

export class ChildChainService{

    eventHandler: IContractEventHandler;

    constructor() {
        this.eventHandler = new ContractEventHandler(new RelayFeignClientHttp());
    }

    start(): void{
        //Listen and handler event deposit
        const bscChildManager = CHAIN.BSC.CHILD_MANAGER;
        this.run(CHAIN.BSC.SERVER_ADDRESS, bscChildManager.ADDRESS, bscChildManager.ABI, {fromBlock: 'latest'})

        const ethChildManager = CHAIN.ETH.CHILD_MANAGER;
        this.run(CHAIN.ETH.SERVER_ADDRESS, ethChildManager.ADDRESS, ethChildManager.ABI, {fromBlock: 'latest'})

    }

    private run(serverAddress: string, rootToken: string, abi: any, filter: any): void{
        const withdrawEventListener = new ContractEventListener(serverAddress, rootToken, abi);
        withdrawEventListener.listen(Constant.WITHDRAW_EVENT, filter, this.eventHandler);
    }
}