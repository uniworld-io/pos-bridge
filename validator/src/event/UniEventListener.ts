import {CHAIN} from "../config/ConfigEnv";
import {IEventListener} from "./IEventListener";
import {POOL_CONNECTOR} from "../config/PoolConnector";
import axios from "axios";
import {EVENT_TIME_INTERVAL_MS} from "../config/ConfigEnv";

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

    async listenEventDeposit(): Promise<any> {
        return new Promise((resolve, reject) => {
            const subscribe = CHAIN.UNI.SUBSCRIBE;
            // console.log(subscribe)
            this.subscribe(subscribe.deposit, subscribe.confirm, subscribe.sort, resolve, reject) ;
        })
    }

    async listenEventWithdraw(): Promise<any> {
        return new Promise((resolve, reject) => {
            const subscribe = CHAIN.UNI.SUBSCRIBE;
            // console.log(subscribe)
            this.subscribe(subscribe.withdraw, subscribe.confirm, subscribe.sort, resolve, reject);
        })

        // this.rootChainManager.WithdrawExecuted().watch(filter, (error: any, result: UniEventResult) => {
        //     console.log(result)
        //     this.handler.handle(EventStandardization.fromUni(result));
        // })
    }

    private subscribe(topic: any, confirm: boolean = true, sort: string = 'timeStamp', resolve: any, reject: any): void {
        setInterval(async () => {
            try {
                const timer = Date.now() - EVENT_TIME_INTERVAL_MS;
                const params = `?topic=${topic}&confirmed=${confirm}&since=${timer}&sort=${sort}`;
                const url = CHAIN.UNI.EVENT_HOST + CHAIN.UNI.SUBSCRIBE.path + params;
                logger.info(url)
                const resp = await axios.get(url)

                resp.data?.length > 0 && resp.data.forEach((event: any) => {
                    logger.info('%o', event)
                    resolve(event);
                });
            } catch (e) {
                console.log('Listen event fail: ', e)
                reject(e)
            }
        }, EVENT_TIME_INTERVAL_MS)
    }
}
