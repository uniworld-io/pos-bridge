import {EventData} from "web3-eth-contract";
import {UniEventResult} from "./UniEventResult";


export class EventStandardization{
    constructor(public txHash: string,
                public blockNumber: number,
                public contract: string,
                public values: any,
                public eventName: string) {
    }

    public static from(data: EventData): EventStandardization{

        return new EventStandardization(
            data.transactionHash,
            data.blockNumber,
            data.address,
            data.returnValues,
            data.event);
    }

    public static fromUni(data: UniEventResult): EventStandardization{

        return new EventStandardization(
            data.transaction,
            data.block,
            data.contract,
            data.result,
            data.name);
    }
}