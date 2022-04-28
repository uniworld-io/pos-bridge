import {EventStandardization} from "../entity/EventStandardization";

export interface IContractEventHandler {
    handle(message: EventStandardization): void
}