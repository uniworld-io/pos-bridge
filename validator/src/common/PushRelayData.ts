
export class PushRelayData{
    constructor(public validator: string,
                public msgHash: string,
                public msg: any,
                public signature: string,
                public event: string) {}

    toJSON() {
        return {
            validator: this.validator,
            msgHash: this.msgHash,
            msg: this.msg,
            signature: this.signature
        }
    }
}