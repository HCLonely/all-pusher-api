import { version } from '../../package.json';
// 延迟
export const delayTime = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
// 随机延迟
export const randomDelay = (min, max) => {
    let ms = Math.random() * (max - min) + min;
    ms = Math.ceil(ms);
    console.log(`delay for ${ms} ms ...`);
    return delayTime(ms);
};
// 转为字符串
export const resolveString = (data) => {
    if (typeof data === 'string')
        return data;
    if (Array.isArray(data))
        return data.join('\n');
    return String(data);
};
// 转为对象
export const toObject = (data) => {
    if (Buffer.isBuffer(data))
        return JSON.parse(data.toString());
    if (typeof data === 'object')
        return data;
    if (typeof data === 'string')
        return JSON.parse(data);
    // return String(data);
};
export const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
// 获取number类型的10位时间戳
export const getTimeStampNumber = () => Number(new Date().getTime().toString().substr(0, 10));
// 添加 User-Agent
export const addUserAgent = (header) => {
    const sdkVersion = version;
    header['User-Agent'] = `BotNodeSDK/v${sdkVersion}`;
};
// 添加 User-Agent
export const addAuthorization = (header, appID, token) => {
    header['Authorization'] = `Bot ${appID}.${token}`;
};
// 组装完整Url
export const buildUrl = (path = '', isSandbox) => {
    return `${isSandbox ? 'https://sandbox.api.sgroup.qq.com' : 'https://api.sgroup.qq.com'}${path}`;
};
