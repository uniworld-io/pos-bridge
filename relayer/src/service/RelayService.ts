import {PushRelayData} from "../common/PushRelayData";
import {BufferEvent} from "../common/BufferEvent";
import {ContractCallDataSignatures} from "../common/ContractCallDataSignatures";

export class RelayService{
    private mapDepositEvent = BufferEvent.mapDepositEvent;
    private mapWithdrawEvent = BufferEvent.mapWithdrawEvent;

    bufferDepositEvent(data: PushRelayData): void{
        const msgHash = data.msgHash;
        if(this.mapDepositEvent.has(msgHash)){
            const callData = this.mapDepositEvent.get(msgHash) as ContractCallDataSignatures;
            callData.signatures.push(data.signature);
            this.mapDepositEvent.set(msgHash, callData);
        }else {
            const callData = new ContractCallDataSignatures(msgHash, data.msg, [data.signature])
            this.mapDepositEvent.set(msgHash, callData);
        }
    }

    bufferWithdrawEvent(data: PushRelayData): void{
        const msgHash = data.msgHash;
        if(this.mapWithdrawEvent.has(msgHash)){
            const callData = this.mapWithdrawEvent.get(msgHash) as ContractCallDataSignatures;
            callData.signatures.push(data.signature);
            this.mapWithdrawEvent.set(msgHash, callData);
        }else {
            const callData = new ContractCallDataSignatures(msgHash, data.msg, [data.signature])
            this.mapWithdrawEvent.set(msgHash, callData);
        }
    }
}