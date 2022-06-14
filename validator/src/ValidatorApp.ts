import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";


const contractEventHandler = new ContractEventHandler();

const bscListener = new BscEventListener(contractEventHandler);
const ethListener = new EthEventListener(contractEventHandler);
const uniListener = new UniEventListener(contractEventHandler);

bscListener.listenEventDeposit({
    toBlock: 'latest'
});
bscListener.listenEventWithdraw({
    toBlock: 'latest'
});


ethListener.listenEventDeposit({
    toBlock: 'latest'
});
ethListener.listenEventWithdraw({
    toBlock: 'latest'
});

uniListener.listenEventDeposit({
    toBlock: 'latest'
});
uniListener.listenEventWithdraw({
    toBlock: 'latest'
});


