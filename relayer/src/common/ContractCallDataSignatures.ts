
export class ContractCallDataSignatures {
    constructor(public msgHash: string,
                public msg: any,
                public signatures: string[]) {}
}