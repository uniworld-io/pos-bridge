
export class Verification {
    constructor(public toChainId: number,
                public msgHash: string,
                public msg: any,
                public signature: string,
                public event: string) {}

    toJSON() {
        return {
            toChainId: this.toChainId,
            msgHash: this.msgHash,
            msg: this.msg,
            signature: this.signature
        }
    }
}
