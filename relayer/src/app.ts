import {App} from "./controller/RelayController";
import {CallContractSchedule} from "./task/CallContractSchedule";
import {SERVER} from "./config/ConfigEnv";

const job = new CallContractSchedule();
job.start();

App.listen(SERVER.PORT, () => console.log('Relay app running with port', SERVER.PORT));

