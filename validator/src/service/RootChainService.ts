import {ContractEventListener} from "../event/ContractEventListener";
import {Constant} from "../common/Constant";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {ContractEventHandler} from "../hander/ContractEventHandler";
import {RelayFeignClientHttp} from "../fignclient/RelayFeignClientHttp";

export class RootChainService {
    eventHandler: IContractEventHandler;

    constructor() {
        this.eventHandler = new ContractEventHandler(new RelayFeignClientHttp());
    }

    start(): void {
        //Listen and handler event withdraw
        const ethServer = process.env.ETH_RPC_SERVER as string;
        const ethToken = process.env.ETH_TOKEN as string;
        const abi = require('../resource/RootTokenAbi.json');
        console.log('ETH rpc service', ethServer);
        this.run(ethServer, ethToken, abi, {fromBlock: 'latest'});

    }

    private run(serverAddress: string, rootToken: string, abi: any, filter: any): void {
        const depositEventListener = new ContractEventListener(serverAddress, rootToken, abi);
        depositEventListener.listen(Constant.DEPOSIT_EVENT, filter, this.eventHandler);
    }
}