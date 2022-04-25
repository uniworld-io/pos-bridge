import express from "express";
import {RelayService} from "../service/RelayService";
import {Verification} from "../entity/Verification";
import {API} from "../common/ConfigEnv";
const relayService = new RelayService();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export const App = express();

App.get(API.HOME, (req, res) => res.send('Relay application: hello'));

App.post(API.COLLECT_VERIFICATION, (req, res) => {
    const data = req.body as Verification;
    relayService.bufferEvent(data);
});




