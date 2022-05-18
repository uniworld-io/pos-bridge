
export class UniEventResult{
    constructor(public id: string,
                public timestamp: number,
                public blockHash: string,
                public blockNumber: number,
                public latestSolidifiedBlockNumber: string,
                public transactionId: string,
                public index: number,
                public contractType: string,
                public topic: string,
                public signature: string,
                public rawData: any) {
    }
}