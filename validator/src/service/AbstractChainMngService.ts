import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Web3ContractEventHandler} from "../hander/Web3ContractEventHandler";
import {RelayFeignClientHttp} from "../fignclient/RelayFeignClientHttp";
import {UniContractEventHandler} from "../hander/UniContractEventHandler";
import {Web3ContractEventListener} from "../event/Web3ContractEventListener";
import {Constant} from "../common/Constant";
import {UniContractEventListener} from "../event/UniContractEventListener";

export class AbstractChainMngService{
    private readonly web3EventHandler: IContractEventHandler;
    private readonly uniEventHandler: IContractEventHandler;

    constructor() {
        this.web3EventHandler = new Web3ContractEventHandler(new RelayFeignClientHttp());
        this.uniEventHandler = new UniContractEventHandler();
    }

    protected listenWithWeb3(serverAddress: string, mngAddress: string, abi: any, filter: any): void{
        const withdrawEventListener = new Web3ContractEventListener(serverAddress, mngAddress, abi);
        withdrawEventListener.listen(Constant.WITHDRAW_EVENT, filter, this.web3EventHandler);
    }

    protected listenWithUni(serverAddress: string, mngAddress: string, abi: any, filter: any): void{
        const withdrawEventListener = new UniContractEventListener(serverAddress, mngAddress, abi);
        withdrawEventListener.listen(Constant.WITHDRAW_EVENT, filter, this.uniEventHandler);
    }
}