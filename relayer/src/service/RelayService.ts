import {Verification} from "../entity/Verification";
import {BufferEvent} from "../common/BufferEvent";
import {GroupVerification} from "../entity/GroupVerification";

export class RelayService{
    private mapDepositEvent = BufferEvent.map;

    bufferEvent(data: Verification): void{
        const msgHash = data.msgHash;
        if(this.mapDepositEvent.has(msgHash)){
            const oldData = this.mapDepositEvent.get(msgHash) as GroupVerification;
            oldData.signatures.push(data.signature);
            this.mapDepositEvent.set(msgHash, oldData);
            console.log("Push event to buffer: ", oldData);
        }else {
            const newData = new GroupVerification(data.toChainId, data.event, msgHash, data.msg, [data.signature])
            this.mapDepositEvent.set(msgHash, newData);
            console.log("Push event to buffer: ", newData);
        }
    }
}