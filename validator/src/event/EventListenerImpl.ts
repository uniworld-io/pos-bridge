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
            toBlock: 'latest'
        }).then(events => {
            events.forEach(data => {
                logger.info('Capture event %s: %o', topic, data)
                cb(data)
            })
        })
    }

    public async listenEventDeposit(handler: any): Promise<void> {
        let latest = (await this.web3.eth.getBlock('latest')).number;
        let fromBlock = latest;
        setInterval(async () => {
            if(fromBlock <= latest){
                logger.info('Start pull event deposit from block %s to %s', fromBlock, latest)
                this.pastEvent(this.rootChainManager, 'DepositExecuted', fromBlock, handler);
                fromBlock = latest + 1;
                latest = (await this.web3.eth.getBlock('latest')).number;
            }
        }, 5000);
    }

    public async listenEventWithdraw(handler: any): Promise<any> {
        let latest = (await this.web3.eth.getBlock('latest')).number;
        let fromBlock = latest;
        setInterval(async () => {
            if(fromBlock <= latest){
                logger.info('Start pull event withdraw from block %s to %s', fromBlock, latest)
                this.pastEvent(this.childChainManager, 'WithdrawExecuted', fromBlock, handler);
                fromBlock = latest + 1;
                latest = (await this.web3.eth.getBlock('latest')).number;
            }
        }, 5000);

    }



}
