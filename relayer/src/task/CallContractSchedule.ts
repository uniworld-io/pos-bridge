
import {CronJob} from "cron";
import {CallContractService} from "../service/CallContractService";
import {CRON_TAB} from "../config/ConfigEnv";

export class CallContractSchedule{
    jobCallContract: CronJob;
    callContractService: CallContractService;
    constructor() {
        console.log("Setup schedule job call contract...")
        this.callContractService = new CallContractService();
        this.jobCallContract = new CronJob(CRON_TAB,  async () => {
             await this.run();
        })
        console.log("Setup schedule job call contract...done!")
    }

    start(): void{
        if (!this.jobCallContract.running) {
            this.jobCallContract.start();
        }
    }

     run(): void{
        console.log('Do call contract...')
        this.callContractService.doCallContract();
    }

}