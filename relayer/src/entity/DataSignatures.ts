
export class DataSignatures {
    constructor(public msgHash: string,
                public msg: any,
                public signatures: string[]) {}
}