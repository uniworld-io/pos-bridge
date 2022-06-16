import {Contract} from "web3-eth-contract";
import {IEventListener} from "./IEventListener";
import Web3 from "web3";
import {EVENT_TIME_INTERVAL_MS} from "../config/ConfigEnv";

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


    private pullEvent(contract: Contract, topic: string, from: number, to: number, cb: any): void {
        contract.getPastEvents(topic, {
            fromBlock: from,
            toBlock: to
        }).then(events => {
            events.forEach(data => {
                logger.info('Capture event %s: %o', topic, data)
                cb(data)
            })
        })
    }

    public async listenEventDeposit(): Promise<void> {
        let latest = (await this.web3.eth.getBlock('latest')).number
        let fromBlock = latest;
        return new Promise((resolve, reject) => {
            setInterval(async () => {
                try {
                    if (fromBlock <= latest) {
                        logger.info('ChainID %s tart pull event deposit from block %s to %s', this.chainId,  fromBlock, latest)
                        this.pullEvent(this.rootChainManager, 'DepositExecuted', fromBlock, latest, resolve);
                        fromBlock = latest + 1;
                    }
                    latest = (await this.web3.eth.getBlock('latest')).number;
                } catch (e: any) {
                    reject(e)
                }
            }, EVENT_TIME_INTERVAL_MS);
        })
    }

    public async listenEventWithdraw(): Promise<any> {
        let latest = (await this.web3.eth.getBlock('latest')).number;
        let fromBlock = latest;
        return new Promise((resolve, reject) => {
            setInterval(async () => {
                try {
                    if (fromBlock <= latest) {
                        logger.info('ChainId %s start pull event withdraw from block %s to %s',this.chainId,  fromBlock, latest)
                        this.pullEvent(this.childChainManager, 'WithdrawExecuted', fromBlock, latest, resolve);
                        fromBlock = latest + 1;
                    }
                    latest = (await this.web3.eth.getBlock('latest')).number;
                } catch (e: any) {
                    reject(e);
                }

            }, EVENT_TIME_INTERVAL_MS);
        })

    }


}
