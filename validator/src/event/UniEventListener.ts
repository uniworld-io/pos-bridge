import {CHAIN} from "../config/ConfigEnv";
import {IEventListener} from "./IEventListener";
import {POOL_CONNECTOR} from "../config/PoolConnector";
import axios from "axios";
import {EVENT_TIME_INTERVAL_MS} from "../config/ConfigEnv";
import {Contract} from "web3-eth-contract";
import {ContractEventHandler} from "../hander/ContractEventHandler";
import {EventStandardization} from "../entity/EventStandardization";

const logger = require('../common/Logger')

export class UniEventListener implements IEventListener {

    private rootChainManager: any;
    private childChainManager: any;

    constructor() {
        const uniChainConnector = POOL_CONNECTOR.uniChainConnector;
        const chain = CHAIN.UNI;


        this.rootChainManager = uniChainConnector.contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        this.childChainManager = uniChainConnector.contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);

        console.log("=======================================LISTEN UNI CHAIN=======================================");
        console.log(uniChainConnector.eventServer)
        console.log("=====> ROOT MANAGER CONTRACT:", this.rootChainManager.address)
        console.log("=====> CHILD MANAGER CONTRACT:", this.childChainManager.address)

    }

    public async listenEventDeposit(handler: ContractEventHandler): Promise<void> {
        const subscribe = CHAIN.UNI.SUBSCRIBE;
        this.subscribe(subscribe.deposit, subscribe.confirm, subscribe.sort, handler);
    }

    public async listenEventWithdraw(handler: ContractEventHandler): Promise<void> {
        const subscribe = CHAIN.UNI.SUBSCRIBE;
        this.subscribe(subscribe.withdraw, subscribe.confirm, subscribe.sort, handler);

        // this.rootChainManager.WithdrawExecuted().watch(filter, (error: any, result: UniEventResult) => {
        //     console.log(result)
        //     this.handler.handle(EventStandardization.fromUni(result));
        // })
    }

    private subscribe(topic: any, confirm: boolean = true, sort: string = 'timeStamp', handler: ContractEventHandler): void {
        setInterval( () => {
            const timer = Date.now() - EVENT_TIME_INTERVAL_MS;
            const params = `?topic=${topic}&confirmed=${confirm}&since=${timer}&sort=${sort}`;
            const url = CHAIN.UNI.EVENT_HOST + CHAIN.UNI.SUBSCRIBE.path + params;
            logger.info(url)
            axios.get(url).then(res => {res.data?.length > 0 && res.data.forEach((event: any) => {
                    logger.info('Capture event %s: %o', topic, event)
                    handler.handle(EventStandardization.fromUni(event));
                });
            }).catch(console.error)
        }, EVENT_TIME_INTERVAL_MS)
    }
}
