"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelayController_1 = require("./controller/RelayController");
const CallContractSchedule_1 = require("./task/CallContractSchedule");
const ConfigEnv_1 = require("./config/ConfigEnv");
const job = new CallContractSchedule_1.CallContractSchedule();
job.start();
RelayController_1.App.listen(ConfigEnv_1.SERVER.PORT, () => console.log('Relay app running with port', ConfigEnv_1.SERVER.PORT));
