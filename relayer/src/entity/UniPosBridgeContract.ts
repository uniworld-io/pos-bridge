
export class UniMapToken {
    constructor(public owner_address: string,
                public root_token: string,
                public root_chainid: number,
                public child_token: string,
                public child_chainid: number,
                public type: number) {
    }
}

export class UniSetupPosBridge {
    constructor(public owner_address: string,
                public new_owner: string,
                public min_validator: number,
                public validators: any,
                public consensus_rate: number,
                public predicate_native: string,
                public predicate_token: string,
                public predicate_nft: string) {
    }

}

export class UniDepositContract {
    constructor(public owner_address: string,
                public root_token: string,
                public child_chainid: number,
                public receive_address: string,
                public data: string) {
    }

}

export class UniWithdrawContract {
    constructor(public owner_address: string,
                public child_token: string,
                public receive_address: string,
                public data: string) {}

}

