import {IRelayFeignClient} from "./IRelayFeignClient";
import {PushRelayData} from "../common/PushRelayData";

export class RelayFeignClientHttp implements IRelayFeignClient{

    private static depositPath = process.env.RELAY_DEPOSIT_PATH ;
    private static withdrawPath = process.env.RELAY_WITHDRAW_PATH;
    private static relayHost = process.env.RELAY_HTTP_HOST;

    async postDeposit(body: PushRelayData): Promise<void> {
        const response = await fetch(RelayFeignClientHttp.relayHost + '/' + RelayFeignClientHttp.depositPath, {
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

    async postWithdraw(body: PushRelayData): Promise<void> {
        const response = await fetch(RelayFeignClientHttp.relayHost + '/' + RelayFeignClientHttp.withdrawPath, {
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