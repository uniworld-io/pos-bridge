import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";
import {EventStandardization} from "./entity/EventStandardization";

const logger = require('./common/Logger')

const contractEventHandler = new ContractEventHandler();
const bscListener = new BscEventListener();
const ethListener = new EthEventListener();
const uniListener = new UniEventListener();

const logError = (e: any) => logger.error('Main exception: %s', e.stack)


ethListener.listenEventDeposit().then((event: any) => contractEventHandler.handle(EventStandardization.from(event))).catch(logError);
ethListener.listenEventWithdraw().then((event: any) => contractEventHandler.handle(EventStandardization.from(event))).catch(logError);
bscListener.listenEventDeposit().then((event: any) => contractEventHandler.handle(EventStandardization.from(event))).catch(logError);
bscListener.listenEventWithdraw().then((event: any) => contractEventHandler.handle(EventStandardization.from(event))).catch(logError);
uniListener.listenEventDeposit().then((event: any) => contractEventHandler.handle(EventStandardization.fromUni(event))).catch(logError);
uniListener.listenEventWithdraw().then((event: any) => contractEventHandler.handle(EventStandardization.fromUni(event))).catch(logError);




