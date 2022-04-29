import {Contract} from "web3-eth-contract";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {IEventListener} from "./IEventListener";
import {EventStandardization} from "../entity/EventStandardization";


export class EventListenerImpl implements IEventListener {

    protected rootChainManager: Contract;
    protected childChainManager: Contract;
    private readonly handler: IContractEventHandler;

    constructor(handler: IContractEventHandler, rootChainManager: Contract, childChainManager: Contract) {
        this.rootChainManager = rootChainManager;
        this.childChainManager = childChainManager;
        this.handler = handler;
    }


    public listenEventDeposit(filter: any): void {
        this.rootChainManager.events.DepositExecuted()
            .on('data', (result: any) => {
                console.log('CaptureEvent: ', result);
                this.handler.handle(EventStandardization.from(result));
            })
            .on('changed', (changed: any) => console.log('Changed event: ', changed))
            .on('error', (err: any) => console.log('Error event: ', err.message, err.stack))
            .on('connected', (str: any) => console.log('Connected event: ', str))
    }

    public listenEventWithdraw(filter: any): void {
        this.childChainManager.events.WithdrawExecuted()
            .on('data', (result: any) => {
                console.log('CaptureEvent: ', result);
                this.handler.handle(EventStandardization.from(result));
            })
            .on('changed', (changed: any) => console.log('Changed event: ', changed))
            .on('error', (err: any) => console.log('Error event: ', err.message, err.stack))
            .on('connected', (str: any) => console.log('Connected event: ', str))
    }

}