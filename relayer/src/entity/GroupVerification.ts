export class GroupVerification {
    constructor(public toChainId: number,
                public event: string,
                public msgHash: string,
                public message: any,
                public signatures: string[]) {
    }
}