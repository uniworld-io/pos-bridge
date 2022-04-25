import {PushRelayData} from "../common/PushRelayData";

export interface IRelayFeignClient {
    postToCollectEvent(body: PushRelayData): void
}