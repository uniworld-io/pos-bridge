import {PushRelayData} from "../common/PushRelayData";

export interface IRelayFeignClient {
    postDeposit(body: PushRelayData): void
    postWithdraw(body: PushRelayData): void
}