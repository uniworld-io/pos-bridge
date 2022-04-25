import express from "express";
import {RelayService} from "../service/RelayService";
import {ValidatorMsgData} from "../entity/ValidatorMsgData";
import {API} from "../common/ConfigEnv";
const relayService = new RelayService();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export const App = express();

App.get(API.HOME, (req, res) => res.send('Relay application: hello'));

App.post(API.COLLECT_VERIFICATION, (req, res) => {
    const data = req.body as ValidatorMsgData;
    relayService.bufferEvent(data);
});




