
import {CronJob} from "cron";
import {CallContractService} from "../service/CallContractService";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export class CallContractSchedule{
    private static cronTab = process.env.CRON_TAB as string | '*/30 * * * * *';
    jobCallContract: CronJob;
    callContractService: CallContractService;
    constructor() {
        console.log("Setup schedule job call contract...")
        this.callContractService = new CallContractService();
        this.jobCallContract = new CronJob(CallContractSchedule.cronTab, async () => {
            await this.run();
        })
        console.log("Setup schedule job call contract...done!")
    }

    start(): void{
        if (!this.jobCallContract.running) {
            this.jobCallContract.start();
        }
    }

    async run(): Promise<void>{
        console.log('Call deposit exec')
        this.callContractService.runCallContract();
    }

}