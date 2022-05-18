import {IContractEventHandler} from "../hander/IContractEventHandler";
import {CHAIN} from "../config/ConfigEnv";
import {IEventListener} from "./IEventListener";
import {POOL_EVENT_CONNECTOR} from "../config/PoolConnector";
import {EventStandardization} from "../entity/EventStandardization";
import axios from "axios";


export class UniEventListener implements IEventListener {

    private rootChainManager: any;
    private childChainManager: any;
    private readonly handler: IContractEventHandler;

    constructor(handler: IContractEventHandler) {
        const uniChainConnector = POOL_EVENT_CONNECTOR.uniChainConnector;
        const chain = CHAIN.UNI;

        this.handler = handler;

        this.rootChainManager = uniChainConnector.contract(chain.ROOT_MANAGER.ABI, chain.ROOT_MANAGER.ADDRESS);
        this.childChainManager = uniChainConnector.contract(chain.CHILD_MANAGER.ABI, chain.CHILD_MANAGER.ADDRESS);

        console.log("=======================================LISTEN UNI CHAIN=======================================");
        console.log(uniChainConnector.eventServer)
        console.log("=====> ROOT MANAGER CONTRACT:", this.rootChainManager.address)
        console.log("=====> CHILD MANAGER CONTRACT:", this.childChainManager.address)

    }

    listenEventDeposit(filter: any): void {
        const subscribe = CHAIN.UNI.SUBSCRIBE;
        console.log(subscribe)

        this.subscribe(subscribe.deposit, subscribe.confirm, subscribe.since, subscribe.sort, (data: any) => {
            if (!data || !data.length)
                return
            data.forEach((item: any) => {
                console.log('Deposit event: ', item)
                this.handler.handle(EventStandardization.fromUni(item));
            })
        })
    }

    listenEventWithdraw(filter: any): void {
        const subscribe = CHAIN.UNI.SUBSCRIBE;
        console.log(subscribe)
        this.subscribe(subscribe.withdraw, subscribe.confirm, subscribe.since, subscribe.sort, (data: any) => {
            if (!data || !data.length)
                return
            data.forEach((item: any) => {
                console.log('Withdraw event: ', item)
                this.handler.handle(EventStandardization.fromUni(item));
            })
        })

        // this.rootChainManager.WithdrawExecuted().watch(filter, (error: any, result: UniEventResult) => {
        //     console.log(result)
        //     this.handler.handle(EventStandardization.fromUni(result));
        // })
    }

    private subscribe(topic: any, confirm: boolean = true, since: number = Date.now(), sort: string = 'timeStamp', cb: any): void {
        setInterval(async () => {
            try {
                const timer = Date.now() - 3000;
                console.log('SinceNow', new Date(timer).toISOString());
                const params = `?topic=${topic}&confirmed=${confirm}&since=${timer}&sort=${sort}`;
                const url = CHAIN.UNI.EVENT_HOST + CHAIN.UNI.SUBSCRIBE.path + params;
                console.log(url)
                const resp = await axios.get(url)
                cb(resp.data);
            } catch (e) {
                console.log('Listen event fail: ', e)
            }
        }, 3000)
    }
}