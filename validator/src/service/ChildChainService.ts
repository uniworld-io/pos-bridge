import {ContractEventListener} from "../event/ContractEventListener";
import {Constant} from "../common/Constant";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {ContractEventHandler} from "../hander/ContractEventHandler";
import {RelayFeignClientHttp} from "../fignclient/RelayFeignClientHttp";

export class ChildChainService{

    eventHandler: IContractEventHandler;

    constructor() {
        this.eventHandler = new ContractEventHandler(new RelayFeignClientHttp());
    }

    start(): void{
        //Listen and handler event deposit
        const bscRpcServer = process.env.BSC_RPC_SERVER as string;
        const bscToken = process.env.BSC_TOKEN as string;
        const abi = require('../resource/ChildTokenAbi.json');
        this.run(bscRpcServer, bscToken, abi, {fromBlock: 'latest'})

    }

    private run(serverAddress: string, rootToken: string, abi: any, filter: any): void{
        const withdrawEventListener = new ContractEventListener(serverAddress, rootToken, abi);
        withdrawEventListener.listen(Constant.WITHDRAW_EVENT, filter, this.eventHandler);
    }
}