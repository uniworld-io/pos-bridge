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
        const events = this.rootChainManager.events.DepositExecuted();
        this.listen(events)
    }

    public listenEventWithdraw(filter: any): void {
        const events = this.childChainManager.events.WithdrawExecuted()
        this.listen(events);
    }

    private listen(events: any): void {
        events.on('data', (result: any) => {
            console.log('CaptureEvent: ', result);
            this.handler.handle(EventStandardization.from(result));
        })
        events.on('changed', (changed: any) => console.log('Changed event: ', changed))
        events.on('error', (err: any) => console.log('Error event: ', err.message, err.stack))
        events.on('connected', (str: any) => console.log('Connected event: ', str))
    }

}