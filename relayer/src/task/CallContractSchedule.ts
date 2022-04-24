
import {CronJob} from "cron";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export class CallContractSchedule{
    private static cronTab = process.env.CRON_TAB as string | '*/30 * * * * *';
    cronJobDepositExec: CronJob;
    cronJobWithdrawExec: CronJob;

    constructor() {
        console.log("Setup schedule job call contract...")
        this.cronJobDepositExec = new CronJob(CallContractSchedule.cronTab, async () => {
            await this.callDepositExec();
        })
        this.cronJobWithdrawExec = new CronJob(CallContractSchedule.cronTab, async () => {
            await this.callWithdrawExec();
        })
        console.log("Setup schedule job call contract...done!")
    }

    start(): void{
        if (!this.cronJobDepositExec.running) {
            this.cronJobDepositExec.start();
        }
        if (!this.cronJobWithdrawExec.running) {
            this.cronJobWithdrawExec.start();
        }
    }

    async callDepositExec(): Promise<void>{
        console.log('Call deposit exec')
        //@TODO
    }


    async callWithdrawExec(): Promise<void>{
        console.log('Call withdraw exec')
        //@TODO
    }

}