
export class GroupVerification {
    constructor(public msgHash: string,
                public msg: any,
                public signatures: string[]) {}
}