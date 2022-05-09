
export class Verification {
    constructor(public toChainId: number,
                public msgHash: string,
                public msg: any,
                public signature: string,
                public event: string) {}

}