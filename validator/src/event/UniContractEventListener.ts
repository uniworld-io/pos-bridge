import {IContractEventListener} from "./IContractEventListener";
import {IContractEventHandler} from "../hander/IContractEventHandler";




//@TODO
export class UniContractEventListener implements IContractEventListener{


    constructor(serverAddress: string, mngAddress: string, abi: any) {
    }

    listen(event: string, filter: any, handler: IContractEventHandler):void{

    }

}