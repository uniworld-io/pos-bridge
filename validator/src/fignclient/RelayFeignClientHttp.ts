import {IRelayFeignClient} from "./IRelayFeignClient";
import {Verification} from "../entity/Verification";
import {RELAY_APP} from "../common/ConfigEnv";

export class RelayFeignClientHttp implements IRelayFeignClient{

    private static collectEventPath = RELAY_APP.API.COLLECT_VERIFICATION;
    private static relayHost = RELAY_APP.HOST;

    async postToCollectVerification(body: Verification): Promise<void> {
        const response = await fetch(RelayFeignClientHttp.relayHost + '/' + RelayFeignClientHttp.collectEventPath, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        })
        if (!response.ok) {
            console.error("Error");
        } else if (response.status >= 400) {
            console.error('Relay HTTP Error: '+ response.status+' - '+ response.body);
        }else {

        }
    }

}