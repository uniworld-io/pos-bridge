"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallContractSchedule = void 0;
const cron_1 = require("cron");
const CallContractService_1 = require("../service/CallContractService");
const ConfigEnv_1 = require("../config/ConfigEnv");
class CallContractSchedule {
    constructor() {
        console.log("Setup schedule job call contract...");
        this.callContractService = new CallContractService_1.CallContractService();
        this.jobCallContract = new cron_1.CronJob(ConfigEnv_1.CRON_TAB, () => __awaiter(this, void 0, void 0, function* () {
            yield this.run();
        }));
        console.log("Setup schedule job call contract...done!");
    }
    start() {
        if (!this.jobCallContract.running) {
            this.jobCallContract.start();
        }
    }
    run() {
        console.log('Do call contract...');
        this.callContractService.doCallContract();
    }
}
exports.CallContractSchedule = CallContractSchedule;
