import {IContractEventListener} from "./IContractEventListener";
import {IContractEventHandler} from "../hander/IContractEventHandler";
import {Constant} from "../common/Constant";
import {UniEventResult} from "../entity/UniEventResult";
import {Verification} from "../entity/Verification";
import {Crypto} from "../common/Crypto";
import {VALIDATOR} from "../config/ConfigEnv";

export class UniContractEventListener implements IContractEventListener{
    private contract: any;
    private handler: IContractEventHandler;

    constructor(uniChainConnector: any, mngAddress: string, abi: any, handler: IContractEventHandler) {
        this.handler = handler;
        this.contract = uniChainConnector.contract(abi, mngAddress);
    }

    listen(event: string, filter: any):void{
        let watcher;
        if(event === Constant.DEPOSIT_EXEC){
            watcher = this.contract.DepositExecuted();
        }
        if(event === Constant.WITHDRAW_EXEC){
            watcher = this.contract.WithdrawExecuted();
        }
        if(watcher == null || typeof watcher === 'undefined')
            return;
        watcher.watch(filter, (error: any, result: UniEventResult) => {
            console.log(result)
            const msg = result.result;
            const msgHash = Crypto.getHash(JSON.stringify(msg));
            const signature = Crypto.getSignature(msgHash);
            this.handler.handle(new Verification(VALIDATOR.ADDRESS, msgHash, msg, signature, result.name));
        })
    }

}
