
export interface IEventListener {
    listenEventDeposit(filter: any): void;
    listenEventWithdraw(filter: any): void;
}