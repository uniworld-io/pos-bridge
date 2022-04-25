import {ContractEventListener} from "../event/ContractEventListener";
import {Constant} from "../common/Constant";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {ContractEventHandler} from "../hander/ContractEventHandler";
import {RelayFeignClientHttp} from "../fignclient/RelayFeignClientHttp";
import {CHAIN} from "../common/ConfigEnv";

export class RootChainService {
    eventHandler: IContractEventHandler;

    constructor() {
        this.eventHandler = new ContractEventHandler(new RelayFeignClientHttp());
    }

    start(): void {
        //Listen and handler event deposit
        const ethRootManager = CHAIN.ETH.ROOT_MANAGER;
        this.run(CHAIN.ETH.SERVER_ADDRESS, ethRootManager.ADDRESS, ethRootManager.ABI, {fromBlock: 'latest'});

        //Listen and handler event deposit
        const bscRootManager = CHAIN.BSC.ROOT_MANAGER;
        this.run(CHAIN.BSC.SERVER_ADDRESS, bscRootManager.ADDRESS, bscRootManager.ABI, {fromBlock: 'latest'});

    }

    private run(serverAddress: string, rootToken: string, abi: any, filter: any): void {
        const depositEventListener = new ContractEventListener(serverAddress, rootToken, abi);
        depositEventListener.listen(Constant.DEPOSIT_EVENT, filter, this.eventHandler);
    }
}