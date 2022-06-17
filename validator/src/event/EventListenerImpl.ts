import {Contract} from "web3-eth-contract";
import {IEventListener} from "./IEventListener";
import Web3 from "web3";
import {EVENT_TIME_INTERVAL_MS} from "../config/ConfigEnv";
import {ContractEventHandler} from "../hander/ContractEventHandler";
import {EventStandardization} from "../entity/EventStandardization";

const logger = require('../common/Logger');

export class EventListenerImpl implements IEventListener {

    protected rootChainManager: Contract;
    protected childChainManager: Contract;
    private readonly chainId: number;
    private readonly web3: Web3;

    constructor(chainId: number,
                web3: Web3,
                rootChainManager: Contract,
                childChainManager: Contract) {

        this.web3 = web3;
        this.chainId = chainId;
        this.rootChainManager = rootChainManager;
        this.childChainManager = childChainManager;
    }


    private async pullEvent(contract: Contract, topic: string, handler: ContractEventHandler): Promise<void> {
        let latest = (await this.web3.eth.getBlock('latest')).number
        let fromBlock = latest;

        setInterval(async () => {
            if (fromBlock <= latest) {
                logger.info('ChainID %s tart pull event deposit from block %s to %s', this.chainId, fromBlock, latest)
                const options = {
                    fromBlock: fromBlock,
                    toBlock: latest
                }
                contract.getPastEvents(topic, options).then(events => events.forEach(data => {
                        logger.info('Capture event %s: %o', topic, data)
                        handler.handle(EventStandardization.from(data))
                    })
                )
                fromBlock = latest + 1;
            }
            latest = (await this.web3.eth.getBlock('latest')).number;
        }, EVENT_TIME_INTERVAL_MS);

    }

    public async listenEventDeposit(handler: ContractEventHandler): Promise<void> {
        await this.pullEvent(this.rootChainManager, 'DepositExecuted', handler);
    }

    public async listenEventWithdraw(handler: ContractEventHandler): Promise<void> {
        await this.pullEvent(this.childChainManager, 'WithdrawExecuted', handler);
    }


}
