import {IContractManager} from "../IContractManager";
import {GroupVerification} from "../../entity/GroupVerification";

export interface ICaller{
    call(manager: IContractManager, data: GroupVerification): void
}