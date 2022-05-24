
export class MockValues{
    constructor(public accounts: Account[]) {
    }
}

export class Account{
     constructor(public address: string,
                 public address_base58: string,
                 public private_key: string) {
     }
}

