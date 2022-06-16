import {Contract} from "web3-eth-contract";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {IEventListener} from "./IEventListener";
import {EventStandardization} from "../entity/EventStandardization";
import Web3 from "web3";

const logger = require('../common/Logger');

export class EventListenerImpl implements IEventListener {

    protected rootChainManager: Contract;
    protected childChainManager: Contract;
    private readonly handler: IContractEventHandler;
    private readonly chainId: number;
    private readonly web3: Web3;

    constructor(chainId: number,
                handler: IContractEventHandler,
                web3: Web3,
                rootChainManager: Contract,
                childChainManager: Contract) {

        this.web3 = web3;
        this.chainId = chainId;
        this.rootChainManager = rootChainManager;
        this.childChainManager = childChainManager;
        this.handler = handler;
    }


    public pastEvent(contract: Contract, topic: string, from: number, cb: any): void {
        contract.getPastEvents(topic, {
            fromBlock: from,
            toBlock: from + 100
        }).then(events => events.forEach(value => {
            logger.info('Capture event %s: %o', topic, value)
            cb(value)
        }))
    }

    public async listenEventDeposit(handler: any): Promise<void> {
        let currentBlockNumber = (await this.web3.eth.getBlock('latest')).number;
        setInterval(async () => {
            logger.info('Start pull event deposit from block: %s', currentBlockNumber)
            this.pastEvent(this.rootChainManager, 'DepositExecuted', currentBlockNumber, handler);
            currentBlockNumber += 100;
        }, 10000);
    }

    public async listenEventWithdraw(handler: any): Promise<any> {
        let currentBlockNumber = (await this.web3.eth.getBlock('latest')).number;
        setInterval(async () => {
            logger.info('Start pull event withdraw from block: %s', currentBlockNumber)
            this.pastEvent(this.childChainManager, 'WithdrawExecuted', currentBlockNumber, handler);
            currentBlockNumber += 100;
        }, 10000);

    }



}
