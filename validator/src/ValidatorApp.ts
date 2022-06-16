import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";
const logger = require('./common/Logger')


const contractEventHandler = new ContractEventHandler();

const bscListener = new BscEventListener(contractEventHandler);
const ethListener = new EthEventListener(contractEventHandler);
const uniListener = new UniEventListener(contractEventHandler);


const options = {
    filter: {},
    fromBlock: 'latest'
}

try{
    bscListener.listenEventDeposit(options);
    bscListener.listenEventWithdraw(options);

    ethListener.listenEventDeposit(options);
    ethListener.listenEventWithdraw(options);

    uniListener.listenEventDeposit(options);
    uniListener.listenEventWithdraw(options);
}catch (e: any){
    console.error(e);
    logger.error('%s', e.stack)
}


