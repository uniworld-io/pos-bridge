export class UniSetupPosBridge {
    constructor(public owner_address: string,
                public new_owner: string,
                public min_validator: number,
                public validators: any,
                public consensus_rate: number) {
    }

}