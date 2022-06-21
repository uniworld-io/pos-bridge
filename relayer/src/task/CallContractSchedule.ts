import {CronJob} from "cron";
import {CRON_TAB} from "../config/ConfigEnv";
import {RunTask} from "./RunTask";

export class CallContractSchedule{
    jobCallContract: CronJob;
    task: RunTask;
    constructor() {
        console.log("Config schedule job call contract...")
        this.task = new RunTask();
        this.jobCallContract = new CronJob(CRON_TAB,  async () => {
             await this.run();
        })
        console.log("Config schedule job call contract...done!")
    }

    start(): void{
        if (!this.jobCallContract.running) {
            this.jobCallContract.start();
        }
    }

     run(): void{
        console.log('Do call contract...')
        this.task.run();
    }

}
