import {Verification} from "../entity/Verification";
import {BufferEvent} from "../common/BufferEvent";
import {GroupVerification} from "../entity/GroupVerification";

export class RelayService{
    private mapDepositEvent = BufferEvent.map;

    bufferEvent(data: Verification): void{
        const msgHash = data.msgHash;
        if(this.mapDepositEvent.has(msgHash)){
            const callData = this.mapDepositEvent.get(msgHash) as GroupVerification;
            callData.signatures.push(data.signature);
            this.mapDepositEvent.set(msgHash, callData);
        }else {
            const callData = new GroupVerification(msgHash, data.msg, [data.signature])
            this.mapDepositEvent.set(msgHash, callData);
        }
    }
}