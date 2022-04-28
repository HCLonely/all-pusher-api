"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushApi = void 0;
/* global sendOptions, result */
const ServerChanTurbo_1 = require("./ServerChanTurbo");
const PushDeer_1 = require("./PushDeer");
const TelegramBot_1 = require("./TelegramBot");
const DingTalk_1 = require("./DingTalk");
const WxPusher_1 = require("./WxPusher");
const Mail_1 = require("./Mail");
const FeiShu_1 = require("./FeiShu");
const WorkWeixin_1 = require("./WorkWeixin");
const QqChannel_1 = require("./QqChannel");
const PushPlus_1 = require("./PushPlus");
const Showdoc_1 = require("./Showdoc");
const Xizhi_1 = require("./Xizhi");
const Discord_1 = require("./Discord");
class PushApi {
    constructor(PushApiConfig) {
        this.pushers = [];
        PushApiConfig.forEach((config) => {
            switch (config.name.toLowerCase()) {
                case 'serverchanturbo':
                case 'serverchan':
                    this.pushers.push({ name: config.name, pusher: new ServerChanTurbo_1.ServerChanTurbo(config.config) });
                    break;
                case 'pushdeer':
                    this.pushers.push({ name: config.name, pusher: new PushDeer_1.PushDeer(config.config) });
                    break;
                case 'telegrambot':
                    this.pushers.push({ name: config.name, pusher: new TelegramBot_1.TelegramBot(config.config) });
                    break;
                case 'dingtalk':
                    this.pushers.push({ name: config.name, pusher: new DingTalk_1.DingTalk(config.config) });
                    break;
                case 'wxpusher':
                    this.pushers.push({ name: config.name, pusher: new WxPusher_1.WxPusher(config.config) });
                    break;
                case 'mail':
                    this.pushers.push({ name: config.name, pusher: new Mail_1.Mail(config.config) });
                    break;
                case 'feishu':
                    this.pushers.push({ name: config.name, pusher: new FeiShu_1.FeiShu(config.config) });
                    break;
                case 'workweixin':
                    this.pushers.push({ name: config.name, pusher: new WorkWeixin_1.WorkWeixin(config.config) });
                    break;
                case 'qqchannel':
                    this.pushers.push({ name: config.name, pusher: new QqChannel_1.QqChannel(config.config) });
                    break;
                case 'pushplus':
                    this.pushers.push({ name: config.name, pusher: new PushPlus_1.PushPlus(config.config) });
                    break;
                case 'showdoc':
                    this.pushers.push({ name: config.name, pusher: new Showdoc_1.Showdoc(config.config) });
                    break;
                case 'xizhi':
                    this.pushers.push({ name: config.name, pusher: new Xizhi_1.Xizhi(config.config) });
                    break;
                case 'discord':
                    this.pushers.push({ name: config.name, pusher: new Discord_1.Discord(config.config) });
                    break;
                default:
                    break;
            }
        });
    }
    send(sendOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.allSettled(this.pushers.map((pusher) => __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(sendOptions)) {
                    return {
                        name: pusher.name,
                        result: yield pusher.pusher.send(sendOptions)
                    };
                }
                const sendOption = sendOptions.find((option) => option.name === pusher.name || option.name === 'default');
                if (sendOption) {
                    return {
                        name: pusher.name,
                        result: yield pusher.pusher.send(sendOption.options)
                    };
                }
                return {
                    name: pusher.name,
                    result: {
                        status: 10,
                        statusText: 'Missing Options',
                        extraMessage: sendOptions
                    }
                };
            })))
                // @ts-ignore
                .then((resusts) => resusts.map((result, index) => result.value || ({
                name: this.pushers[index].name,
                result: {
                    status: 11,
                    statusText: 'Unknown Error',
                    // @ts-ignore
                    extraMessage: result.reason
                }
            })));
        });
    }
}
exports.PushApi = PushApi;
