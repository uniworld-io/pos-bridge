import {Contract} from "web3-eth-contract";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {IEventListener} from "./IEventListener";
import {EventStandardization} from "../entity/EventStandardization";


const logger = require('../common/Logger');

export class EventListenerImpl implements IEventListener {

    protected rootChainManager: Contract;
    protected childChainManager: Contract;
    private readonly handler: IContractEventHandler;
    private readonly chainId: number;

    constructor(chainId: number, handler: IContractEventHandler, rootChainManager: Contract, childChainManager: Contract) {
        this.chainId = chainId;
        this.rootChainManager = rootChainManager;
        this.childChainManager = childChainManager;
        this.handler = handler;
    }


    public listenEventDeposit(filter: any): void {
        try{
            const events = this.rootChainManager.events.DepositExecuted(filter);
            this.listen(events)
        }catch (e:any){
            console.error(e);
            logger.error('%s', e.stack)
        }
    }

    public listenEventWithdraw(filter: any): void {
        try{
            const events = this.childChainManager.events.WithdrawExecuted(filter)
            this.listen(events);
        }catch (e: any){
            console.error(e);
            logger.error('%s', e.stack)
        }
    }

    private listen(events: any): void {
        events.on('data', (result: any) => {
            logger.info('CaptureEvent: %o', result);
            this.handler.handle(EventStandardization.from(result));
        })
        events.on('changed', (changed: any) => console.log('Changed event: ', changed))
        events.on('error', (err: any) => logger.error('Error event from chain-id %s: %s, %s', this.chainId, err.message, err.stack))
        events.on('connected', (str: any) => console.log('Connected event: ', str))
    }

}
