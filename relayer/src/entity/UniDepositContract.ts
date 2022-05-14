export class UniDepositContract {
    constructor(public owner_address: string,
                public root_token: string,
                public child_chainid: number,
                public receive_address: string,
                public data: any) {
    }

}