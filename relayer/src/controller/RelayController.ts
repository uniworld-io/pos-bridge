import express from "express";
import {RelayService} from "../service/RelayService";
import {PushRelayData} from "../common/PushRelayData";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

const relayService = new RelayService();

export const App = express();

export const API = {
    HOME: '/',
    DEPOSIT_PATH: process.env.RELAY_DEPOST_PATH as string | 'deposit',
    WITHDRAW_PATH: process.env.RELAY_WITHDRAW_PATH as string | 'withdraw'
}

App.get('/', (req, res) => res.send('Relay application: hello'));

App.post(API.DEPOSIT_PATH, (req, res) => {
    const data = req.body as PushRelayData;
    relayService.bufferDepositEvent(data);
});

App.post('withdraw', (req, res) => {
    const data = req.body as PushRelayData;
    relayService.bufferWithdrawEvent(data);
});



