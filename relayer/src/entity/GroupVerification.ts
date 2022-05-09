export class GroupVerification {
    constructor(public toChainId: number,
                public event: string,
                public msgHash: string,
                public msg: any,
                public signatures: string[]) {
    }
}