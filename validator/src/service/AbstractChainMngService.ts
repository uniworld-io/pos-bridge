import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Web3ContractEventListener} from "../event/Web3ContractEventListener";
import {UniContractEventListener} from "../event/UniContractEventListener";
import {CHAIN} from "../config/ConfigEnv";
import Web3 from "web3";
import {PostHttpContractEventHandler} from "../hander/PostHttpContractEventHandler";
import {POOL_EVENT_CONNECTOR} from "../config/PoolConnector";


export class AbstractChainMngService{
    private readonly contractEventHandler: IContractEventHandler;

    //Singleton
    private readonly ethChainConnector: Web3;
    private readonly bscChainConnector: Web3;
    private readonly uniChainConnector: any;


    constructor() {

        this.ethChainConnector = POOL_EVENT_CONNECTOR.ethChainConnector;
        this.bscChainConnector = POOL_EVENT_CONNECTOR.bscChainConnector;
        this.uniChainConnector = POOL_EVENT_CONNECTOR.uniChainConnector;

        this.contractEventHandler = new PostHttpContractEventHandler();
    }

    protected listen(event: string, chainId: number, serverAddress: string, mngAddress: string, abi: any, filter: any): void{
        switch (chainId){
            case CHAIN.BSC.ID:
                this.listenWithWeb3(event, this.bscChainConnector, mngAddress, abi, filter);
                break
            case CHAIN.ETH.ID:
                this.listenWithWeb3(event, this.ethChainConnector, mngAddress, abi, filter);
                break;
            case CHAIN.UNI.ID:
                this.listenWithUni(event, this.uniChainConnector, mngAddress, abi, filter);
                break;
            default:
                throw Error('AbstractChainMngService: not mapped by chain-id');
        }
    }

    private listenWithWeb3(event: string, chainConnector: Web3, mngAddress: string, abi: any, filter: any): void{
        const listener = new Web3ContractEventListener(chainConnector, mngAddress, abi, this.contractEventHandler);
        listener.listen(event, filter);
    }

    private listenWithUni(event: string, chainConnector: any, mngAddress: string, abi: any, filter: any): void{
        const listener = new UniContractEventListener(chainConnector, mngAddress, abi, this.contractEventHandler);
        listener.listen(event, filter);
    }
}