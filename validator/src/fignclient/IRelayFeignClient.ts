import {Verification} from "../common/Verification";

export interface IRelayFeignClient {
    postToCollectVerification(body: Verification): void
}