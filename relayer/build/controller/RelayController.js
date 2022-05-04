"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const RelayService_1 = require("../service/RelayService");
const ConfigEnv_1 = require("../config/ConfigEnv");
const relayService = new RelayService_1.RelayService();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
exports.App = (0, express_1.default)();
const bodyParser = require('body-parser');
exports.App.use(express_1.default.static(__dirname + '/public'));
exports.App.use(bodyParser.json());
exports.App.use(bodyParser.urlencoded({
    extended: false
}));
exports.App.get(ConfigEnv_1.API.HOME, (req, res) => res.send('Relay application: hello'));
exports.App.post('/collect-verification', (req, res) => {
    console.log('RestApi post data: ', req.body);
    const data = req.body;
    relayService.bufferEvent(data);
    res.status(200).send('OK');
});
