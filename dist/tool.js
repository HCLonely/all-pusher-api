"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy2httpsAgent = exports.queryStringify = void 0;
const tunnel = require("tunnel");
const socks_proxy_agent_1 = require("socks-proxy-agent");
const queryStringify = (data) => Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
exports.queryStringify = queryStringify;
const proxy2httpsAgent = (proxy, protocol = 'https') => {
    var _a;
    if (proxy.host && proxy.port) {
        let agent;
        if ((_a = proxy.protocol) === null || _a === void 0 ? void 0 : _a.includes('socks')) {
            const proxyOptions = {
                hostname: proxy.host,
                port: proxy.port
            };
            if (proxy.username && proxy.password) {
                proxyOptions.userId = proxy.username;
                proxyOptions.password = proxy.password;
            }
            agent = new socks_proxy_agent_1.SocksProxyAgent(proxyOptions);
        }
        else {
            const proxyOptions = {
                host: proxy.host,
                port: proxy.port
            };
            if (proxy.username && proxy.password) {
                proxyOptions.proxyAuth = `${proxy.username}:${proxy.password}`;
            }
            if (protocol === 'http') {
                agent = tunnel.httpOverHttp({
                    proxy: proxyOptions
                });
            }
            else {
                agent = tunnel.httpsOverHttp({
                    proxy: proxyOptions
                });
            }
        }
        if (!protocol || protocol === 'https') {
            agent.options.rejectUnauthorized = false;
        }
        return agent;
    }
    return null;
};
exports.proxy2httpsAgent = proxy2httpsAgent;
