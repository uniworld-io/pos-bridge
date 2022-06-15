import {BscEventListener} from "./event/BscEventListener";
import {ContractEventHandler} from "./hander/ContractEventHandler";
import {EthEventListener} from "./event/EthEventListener";
import {UniEventListener} from "./event/UniEventListener";


const contractEventHandler = new ContractEventHandler();

const bscListener = new BscEventListener(contractEventHandler);
const ethListener = new EthEventListener(contractEventHandler);
const uniListener = new UniEventListener(contractEventHandler);

bscListener.listenEventDeposit({
    fromBlock: 'latest'
});
bscListener.listenEventWithdraw({
    fromBlock: 'latest',
});

ethListener.listenEventDeposit({
    fromBlock: 'latest',
});
ethListener.listenEventWithdraw({
    fromBlock: 'latest',
});

uniListener.listenEventDeposit({
    fromBlock: 'latest',
});
uniListener.listenEventWithdraw({
    fromBlock: 'latest',
});


