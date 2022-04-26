import {IContractEventHandler} from "./IContractEventHandler";
import {RELAY_APP} from "../common/ConfigEnv";
import {Verification} from "../entity/Verification";

export class PostHttpContractEventHandler implements IContractEventHandler{


    async handle(message: Verification): Promise<void> {

        const host = RELAY_APP.HOST;
        const path = RELAY_APP.API.COLLECT_VERIFICATION;
        const response = await fetch(host + '/' + path, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {'Content-Type': 'application/json'}
        })
        if (!response.ok) {
            console.error("Error");
        } else if (response.status >= 400) {
            console.error('Relay HTTP Error: ' + response.status + ' - ' + response.body);
        } else {

        }
    }

}