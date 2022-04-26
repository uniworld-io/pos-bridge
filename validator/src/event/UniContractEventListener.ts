import {IContractEventListener} from "./IContractEventListener";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Constant} from "../common/Constant";
import {UniEventResult} from "../entity/UniEventResult";
import {Verification} from "../entity/Verification";
import {Crypto} from "../common/Crypto";
import {VALIDATOR} from "../common/ConfigEnv";

export class UniContractEventListener implements IContractEventListener{
    private contract: any;
    private handler: IContractEventHandler;

    constructor(uniChainConnector: any, mngAddress: string, abi: any, handler: IContractEventHandler) {
        console.log('Server: ', uniChainConnector);
        console.log('Address: ', mngAddress);
        console.log('Abi: ', abi);
        this.handler = handler;
        this.contract = uniChainConnector.contract(abi, mngAddress);
    }

    listen(event: string, filter: any):void{

        //@TEST
        this.contract.Balance().watch(filter, (error: any, result: any) => {
            console.log(result);
        })

        let watcher;
        if(event === Constant.DEPOSIT_EVENT){
            watcher = this.contract.DepositExecuted();
        }
        if(event === Constant.WITHDRAW_EVENT){
            watcher = this.contract.WithdrawExecuted();
        }
        if(watcher == null || typeof watcher === 'undefined')
            return;
        watcher.watch(filter, (error: any, result: UniEventResult) => {
            const msg = result.result;
            const msgHash = Crypto.getHash(JSON.stringify(msg));
            const signature = Crypto.getSignature(msgHash);
            this.handler.handle(new Verification(VALIDATOR.ADDRESS, msgHash, msg, signature, result.name));
        })
    }

}
