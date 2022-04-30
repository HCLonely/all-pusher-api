"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy2httpsAgent = exports.queryStringify = void 0;
const tunnel = __importStar(require("tunnel"));
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
                if (proxy.protocol === 'https') {
                    agent = tunnel.httpOverHttps({
                        proxy: proxyOptions
                    });
                }
                else {
                    agent = tunnel.httpOverHttp({
                        proxy: proxyOptions
                    });
                }
            }
            else {
                if (proxy.protocol === 'https') {
                    agent = tunnel.httpsOverHttps({
                        proxy: proxyOptions
                    });
                }
                else {
                    agent = tunnel.httpsOverHttp({
                        proxy: proxyOptions
                    });
                }
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
