
export class Verification {
    constructor(public validator: string,
                public msgHash: string,
                public msg: any,
                public signature: string,
                public event: string) {}

}