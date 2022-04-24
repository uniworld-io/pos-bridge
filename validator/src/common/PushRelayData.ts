
export class PushRelayData{
    private readonly validator: string;
    private readonly msgHash: string;
    private readonly msg: string;
    private readonly signature: string

    constructor(validator: string, msgHash: string, msg: string, signature: string) {
        this.validator = validator;
        this.msgHash = msgHash;
        this.msg = msg;
        this.signature = signature;
    }

    toJSON() {
        return {
            "validator": this.validator,
            "msgHash": this.msgHash,
            "msg": this.msg,
            "signature": this.signature
        }
    }
}