import {IContractManager} from "../IContractManager";

export interface ICaller{
    call(manager: IContractManager, data: any): void
}