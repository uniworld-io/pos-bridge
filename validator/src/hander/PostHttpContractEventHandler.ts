import {IContractEventHandler} from "./IContractEventHandler";
import {RELAY_APP} from "../config/ConfigEnv";
import {Verification} from "../entity/Verification";
const axios = require('axios').default;

export class PostHttpContractEventHandler implements IContractEventHandler {


    handle(message: Verification): void {

        const url = RELAY_APP.HOST + '/' + RELAY_APP.API.COLLECT_VERIFICATION;
        axios.post(url, message)
            .then((res:any) => console.log(res))
            .catch((error: any) => console.error(error));
    }

}