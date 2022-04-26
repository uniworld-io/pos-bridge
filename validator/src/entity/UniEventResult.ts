
export class UniEventResult{
    constructor(public block: number,
                public timestamp: number,
                public contract: string,
                public name: string,
                public transaction: string,
                public result: any,
                public resourceNode: string,
                public unconfirmed: string,
                public fingerprint: string) {
    }
}