import express from "express";
import {RelayService} from "../service/RelayService";
import {Verification} from "../entity/Verification";
import {API} from "../config/ConfigEnv";
import {UniPosBridgeService} from "../service/impl/UniPosBridgeService";
import {UniDepositContract, UniMapToken, UniSetupPosBridge, UniWithdrawContract} from "../entity/UniPosBridgeContract";
import {GroupVerification} from "../entity/GroupVerification";
import {Urc20Burn} from "../entity/Urc20";
const relayService = new RelayService();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

export const App = express();

const bodyParser = require('body-parser');
App.use(express.static(__dirname + '/public'));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({
    extended: false
}));

App.get(API.HOME, (req, res) => res.send('Relay application: hello'));

App.post('/collect-verification', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as Verification;
    relayService.bufferEvent(data);
    res.status(200).send('OK');
});

const uniPosBridgeService = new UniPosBridgeService();

App.post('/test/uni/setup', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as UniSetupPosBridge;
    uniPosBridgeService.setup(data).then(r => res.status(200).send(r));
});











