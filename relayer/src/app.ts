import {App} from "./controller/RelayController";
import {CallContractSchedule} from "./task/CallContractSchedule";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

const port = process.env.PORT;

const job = new CallContractSchedule();
job.start();

App.listen(port, () => console.log('Relay app running with port', port));

