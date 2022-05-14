export class UniMapToken {
    constructor(public owner_address: string,
                public root_token: string,
                public root_chainid: number,
                public child_token: string,
                public child_chainid: number,
                public type: number) {
    }

}