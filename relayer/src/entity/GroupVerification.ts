
export class GroupVerification {
    constructor(public event:string,
                public msgHash: string,
                public msg: any,
                public signatures: string[]) {}
}