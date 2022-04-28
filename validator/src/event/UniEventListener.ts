import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Constant} from "../common/Constant";
import {UniEventResult} from "../entity/UniEventResult";
import {CHAIN} from "../config/ConfigEnv";
import {IEventListener} from "./IEventListener";
import {POOL_EVENT_CONNECTOR} from "../config/PoolConnector";
import {EventStandardization} from "../entity/EventStandardization";


export class UniEventListener implements IEventListener {

    private rootChainManager: any;
    private childChainManager: any;
    private readonly handler: IContractEventHandler;

    constructor(handler: IContractEventHandler) {
        const uniChainConnector = POOL_EVENT_CONNECTOR.uniChainConnector;
        const chain = CHAIN.UNI;

        this.handler = handler;

        this.rootChainManager = uniChainConnector.contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        this.childChainManager = uniChainConnector.contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);

    }

    listenEventDeposit(filter: any): void {
        this.rootChainManager.DepositExecuted().watch(filter, (error: any, result: UniEventResult) => {
            console.log(result)
            this.handler.handle(EventStandardization.fromUni(result));
        })
    }

    listenEventWithdraw(filter: any): void {
        this.rootChainManager.WithdrawExecuted().watch(filter, (error: any, result: UniEventResult) => {
            console.log(result)
            this.handler.handle(EventStandardization.fromUni(result));
        })
    }
}