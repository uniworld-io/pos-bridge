import express from "express";
import {RelayService} from "../service/RelayService";
import {Verification} from "../entity/Verification";
import {API} from "../config/ConfigEnv";
import {UniPosBridgeService} from "../service/impl/UniPosBridgeService";
import {UniDepositContract, UniMapToken, UniSetupPosBridge, UniWithdrawContract} from "../entity/UniPosBridgeContract";
import {GroupVerification} from "../entity/GroupVerification";
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

App.post('/test/uni/map-token', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as UniMapToken;
    uniPosBridgeService.mapToken(data).then(r => res.status(200).send(r));
});

App.post('/test/uni/unmap-token', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as UniMapToken;
    uniPosBridgeService.unMapToken(data).then(r => res.status(200).send(r));
});

App.post('/test/uni/deposit', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as UniDepositContract;
    uniPosBridgeService.deposit(data).then(r => res.status(200).send(r));
});

App.post('/test/uni/withdraw', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as UniWithdrawContract;
    uniPosBridgeService.withdraw(data).then(r => res.status(200).send(r));
});

App.post('/test/uni/deposit-exec', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as GroupVerification;
    uniPosBridgeService.depositExec(data).then(r => res.status(200).send(r));
});

App.post('/test/uni/withdraw-exec', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body as GroupVerification;
    uniPosBridgeService.withdrawExec(data).then(r => res.status(200).send(r));
});





