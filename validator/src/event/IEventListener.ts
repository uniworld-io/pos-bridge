
export interface IEventListener {
    listenEventDeposit(): Promise<any>;
    listenEventWithdraw(): Promise<any>;
}
