
export class WithdrawExecMsg {
    constructor(public childChainId: number,
                public rootChainId: number,
                public childToken: string,
                public burner: string,
                public withdrawer: string,
                public value: number) {
    }
}