import {BufferEvent} from "../common/BufferEvent";
import {GroupVerification} from "../entity/GroupVerification";
import {Constant} from "../common/Constant";
import {CHAIN} from "../config/ConfigEnv";
import {uniPosBridgeService} from "../service/impl/UniPosBridgeService";
import {ethPosBridgeService} from "../service/impl/EthPosBridgeService";
import {bscPosBridgeService} from "../service/impl/BscPosBridgeService";
import {PosBridgeService} from "../service/PosBridgeService";

const logger = require('../common/Logger')

export class RunTask {
    private bufferEvent = BufferEvent.map;

    run(): void {
        this.bufferEvent.forEach((value, key) => {
            try{
                console.log("Loop event: ", value)
                const verification = value as GroupVerification;
                const service = RunTask.lookupService(verification.toChainId);

                switch (verification.event) {
                    case Constant.WITHDRAW_EXEC:
                        service.withdrawExec(verification);
                        break;
                    case Constant.DEPOSIT_EXEC:
                        service.depositExec(verification);
                        break;
                    default:
                        logger.error("Not mapped type event: %s", verification.event)
                        return
                }
            }catch (e){
                logger.error("Failure to call contract: %s, %s", value, e)
            }
        });
        this.bufferEvent.clear();
    }

    private static lookupService(chainId: number): PosBridgeService {
        console.log('-----------------Map chain-id: ', chainId);
        switch (chainId) {
            case CHAIN.ETH.ID:
                return ethPosBridgeService;
            case CHAIN.BSC.ID:
                return bscPosBridgeService;
            case CHAIN.UNI.ID:
                return uniPosBridgeService;
            default:
                throw new Error('Not mapped chain-id');
        }
    }

}