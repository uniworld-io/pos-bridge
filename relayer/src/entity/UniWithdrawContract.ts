export class UniWithdrawContract {
    constructor(public owner_address: string,
                public child_token: string,
                public receive_address: string,
                public data: any) {}

}