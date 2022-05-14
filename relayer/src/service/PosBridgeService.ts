import {GroupVerification} from "../entity/GroupVerification";

export interface PosBridgeService{
     depositExec(verification: GroupVerification): any;
     withdrawExec(verification: GroupVerification): any;
}