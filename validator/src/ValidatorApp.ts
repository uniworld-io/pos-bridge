import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";
import {EventStandardization} from "./entity/EventStandardization";

const logger = require('./common/Logger')

const handler = new ContractEventHandler();
const bscListener = new BscEventListener();
const ethListener = new EthEventListener();
const uniListener = new UniEventListener();

const logError = (e: any) => logger.error('Main exception: %s', e.stack)


ethListener.listenEventDeposit(handler).then(() => console.log('Start listen deposit event from BSC')).catch(logError);
ethListener.listenEventWithdraw(handler).then(() => console.log('Start listen withdraw event from BSC')).catch(logError);
bscListener.listenEventDeposit(handler).then(() => console.log('Start listen deposit event from ETH')).catch(logError);
bscListener.listenEventWithdraw(handler).then(() => console.log('Start listen withdraw event from ETH')).catch(logError);
uniListener.listenEventDeposit(handler).then(() => console.log('Start listen deposit event from UNI')).catch(logError);
uniListener.listenEventWithdraw(handler).then(() => console.log('Start listen withdraw event from UNI')).catch(logError);




