import {ValidatorMsgData} from "../entity/ValidatorMsgData";
import {BufferEvent} from "../common/BufferEvent";
import {DataSignatures} from "../entity/DataSignatures";

export class RelayService{
    private mapDepositEvent = BufferEvent.map;

    bufferEvent(data: ValidatorMsgData): void{
        const msgHash = data.msgHash;
        if(this.mapDepositEvent.has(msgHash)){
            const callData = this.mapDepositEvent.get(msgHash) as DataSignatures;
            callData.signatures.push(data.signature);
            this.mapDepositEvent.set(msgHash, callData);
        }else {
            const callData = new DataSignatures(msgHash, data.msg, [data.signature])
            this.mapDepositEvent.set(msgHash, callData);
        }
    }
}