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


    public listenEventDeposit(options: any): void {
        try {
            const events = this.rootChainManager.events.DepositExecuted(options);
            this.listen(events, (result: any) => {
                logger.info('Capture EventDeposit: %o', result);
                this.handler.handle(EventStandardization.from(result));
            })
        } catch (e: any) {
            console.error(e);
            logger.error('%s', e.stack)
        }
    }

    public listenEventWithdraw(options: any): void {
        try {
            const events = this.childChainManager.events.WithdrawExecuted(options)
            this.listen(events, (result: any) => {
                logger.info('Capture EventWithdraw: %o', result);
                this.handler.handle(EventStandardization.from(result));
            });
        } catch (e: any) {
            console.error(e);
            logger.error('%s', e.stack)
        }
    }

    private listen(events: any, cb: any): void {
        events
            .on('connected', (str: any) => {
                logger.info('Connected event: %o', str)
            })
            .on('data', cb)
            .on('changed', (changed: any) => {
                logger.info('Changed event: %o', changed)
            })
            .on('error', (err: any) => {
                console.error(err)
                logger.error('Error event from chain-id %s: %s', this.chainId, err.stack)
            })
    }

}
