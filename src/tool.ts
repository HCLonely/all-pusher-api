/* global objectData, proxy */
import { AxiosRequestConfig } from 'axios';
import * as tunnel from 'tunnel';
import { SocksProxyAgent, SocksProxyAgentOptions } from 'socks-proxy-agent';

const queryStringify = (data: objectData): string => Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
const proxy2httpsAgent = (proxy: proxy, protocol = 'https'): AxiosRequestConfig['httpsAgent'] | null => {
  if (proxy.host && proxy.port) {
    let agent: AxiosRequestConfig['httpsAgent'];
    if (proxy.protocol?.includes('socks')) {
      const proxyOptions: SocksProxyAgentOptions = {
        hostname: proxy.host,
        port: proxy.port
      };
      if (proxy.username && proxy.password) {
        proxyOptions.userId = proxy.username;
        proxyOptions.password = proxy.password;
      }
      agent = new SocksProxyAgent(proxyOptions);
    } else {
      const proxyOptions: tunnel.ProxyOptions = {
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
        } else {
          agent = tunnel.httpOverHttp({
            proxy: proxyOptions
          });
        }
      } else {
        if (proxy.protocol === 'https') {
          agent = tunnel.httpsOverHttps({
            proxy: proxyOptions
          });
        } else {
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
export { queryStringify, proxy2httpsAgent };
