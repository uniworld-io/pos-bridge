import express from "express";
import {RelayService} from "../service/RelayService";
import {ValidatorMsgData} from "../entity/ValidatorMsgData";
import {API} from "../common/ConfigEnv";
const relayService = new RelayService();

export const App = express();



App.get('/', (req, res) => res.send('Relay application: hello'));

App.post(API.COLLECT_VALIDATOR, (req, res) => {
    const data = req.body as ValidatorMsgData;
    relayService.bufferEvent(data);
});




