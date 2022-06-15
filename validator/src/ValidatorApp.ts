import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";
const logger = require('./common/Logger')


const contractEventHandler = new ContractEventHandler();

const bscListener = new BscEventListener(contractEventHandler);
const ethListener = new EthEventListener(contractEventHandler);
const uniListener = new UniEventListener(contractEventHandler);


const filter = {
    fromBlock: 'latest'
}

try{
    bscListener.listenEventDeposit(filter);
    bscListener.listenEventWithdraw(filter);

    ethListener.listenEventDeposit(filter);
    ethListener.listenEventWithdraw(filter);

    uniListener.listenEventDeposit(filter);
    uniListener.listenEventWithdraw(filter);
}catch (e: any){
    console.error(e);
    logger.error('%s', e.stack)
}


