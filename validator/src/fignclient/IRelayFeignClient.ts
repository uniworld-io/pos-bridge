import {Verification} from "../entity/Verification";

export interface IRelayFeignClient {
    postToCollectVerification(body: Verification): void
}