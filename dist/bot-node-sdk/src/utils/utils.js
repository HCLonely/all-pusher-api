"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUrl = exports.addAuthorization = exports.addUserAgent = exports.getTimeStampNumber = exports.has = exports.toObject = exports.resolveString = exports.randomDelay = exports.delayTime = void 0;
const package_json_1 = require("../../package.json");
// 延迟
const delayTime = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
exports.delayTime = delayTime;
// 随机延迟
const randomDelay = (min, max) => {
    let ms = Math.random() * (max - min) + min;
    ms = Math.ceil(ms);
    console.log(`delay for ${ms} ms ...`);
    return (0, exports.delayTime)(ms);
};
exports.randomDelay = randomDelay;
// 转为字符串
const resolveString = (data) => {
    if (typeof data === 'string')
        return data;
    if (Array.isArray(data))
        return data.join('\n');
    return String(data);
};
exports.resolveString = resolveString;
// 转为对象
const toObject = (data) => {
    if (Buffer.isBuffer(data))
        return JSON.parse(data.toString());
    if (typeof data === 'object')
        return data;
    if (typeof data === 'string')
        return JSON.parse(data);
    // return String(data);
};
exports.toObject = toObject;
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
exports.has = has;
// 获取number类型的10位时间戳
const getTimeStampNumber = () => Number(new Date().getTime().toString().substr(0, 10));
exports.getTimeStampNumber = getTimeStampNumber;
// 添加 User-Agent
const addUserAgent = (header) => {
    const sdkVersion = package_json_1.version;
    header['User-Agent'] = `BotNodeSDK/v${sdkVersion}`;
};
exports.addUserAgent = addUserAgent;
// 添加 User-Agent
const addAuthorization = (header, appID, token) => {
    header['Authorization'] = `Bot ${appID}.${token}`;
};
exports.addAuthorization = addAuthorization;
// 组装完整Url
const buildUrl = (path = '', isSandbox) => {
    return `${isSandbox ? 'https://sandbox.api.sgroup.qq.com' : 'https://api.sgroup.qq.com'}${path}`;
};
exports.buildUrl = buildUrl;
