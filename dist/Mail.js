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
exports.Mail = void 0;
/* global sendOptions, result, TransportOptions, MailConfig */
const nodemailer = require("nodemailer");
const showdown_1 = require("showdown");
class Mail {
    constructor({ key, options, proxy }) {
        if (!key) {
            throw new Error('Missing Parameter: key');
        }
        this._SERVER = key;
        this.options = options;
        if (proxy && proxy.host && proxy.port) {
            this._SERVER.proxy = `${proxy.protocol || 'http'}://${proxy.host}:${proxy.port}`;
        }
    }
    send(sendOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!sendOptions.message && !sendOptions.customOptions) {
                return {
                    status: 0,
                    statusText: 'Missing Parameter: message',
                    extraMessage: null
                };
            }
            let mailOptions;
            if (sendOptions.customOptions) {
                mailOptions = sendOptions.customOptions;
            }
            else {
                mailOptions = Object.assign(Object.assign({}, this.options), { subject: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10) });
                if (sendOptions.type === 'text') {
                    mailOptions.text = sendOptions.message;
                }
                if (sendOptions.type === 'markdown') {
                    // @ts-ignore
                    mailOptions.html = new showdown_1.default().Converter().makeHtml(sendOptions.message);
                }
                if (sendOptions.type === 'html') {
                    mailOptions.html = sendOptions.message;
                }
            }
            if (sendOptions.extraOptions) {
                mailOptions = Object.assign(Object.assign({}, mailOptions), sendOptions.extraOptions);
            }
            const transporter = nodemailer.createTransport(this._SERVER);
            return transporter.sendMail(mailOptions).then((response) => ({
                status: 200,
                statusText: 'Success',
                extraMessage: response
            })).catch((error) => ({
                status: 102,
                statusText: 'Request Error',
                extraMessage: error
            }));
        });
    }
}
exports.Mail = Mail;
