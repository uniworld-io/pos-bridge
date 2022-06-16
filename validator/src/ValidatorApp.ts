import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";
import {EventStandardization} from "./entity/EventStandardization";

const logger = require('./common/Logger')

const contractEventHandler = new ContractEventHandler();
const bscListener = new BscEventListener(contractEventHandler);
const ethListener = new EthEventListener(contractEventHandler);
const uniListener = new UniEventListener(contractEventHandler);


async function main() {
    try{
        await bscListener.listenEventDeposit((event: any) => contractEventHandler.handle(EventStandardization.from(event)));
        await bscListener.listenEventWithdraw((event: any) => contractEventHandler.handle(EventStandardization.from(event)));

        await ethListener.listenEventDeposit((event: any) => contractEventHandler.handle(EventStandardization.from(event)));
        await ethListener.listenEventWithdraw((event: any) => contractEventHandler.handle(EventStandardization.from(event)));


        uniListener.listenEventDeposit((event: any) => contractEventHandler.handle(EventStandardization.fromUni(event)));
        uniListener.listenEventWithdraw((event: any) => contractEventHandler.handle(EventStandardization.fromUni(event)));
    }catch (e: any){
        logger.error('Main exception: %s', e.stack)
    }
}
main().then();




