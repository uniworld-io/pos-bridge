

export class DepositExecMsg {
    constructor(public rootChainId: number,
                public childChainId: number,
                public rootToken: string,
                public depositor: string,
                public receiver: string,
                public value: number) {
    }
}