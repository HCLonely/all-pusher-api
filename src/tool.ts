import { AxiosRequestConfig } from 'axios';
import * as tunnel from 'tunnel';
import { SocksProxyAgent } from 'socks-proxy-agent';

interface objectData {
  [name: string]: any
}
interface sendOptions {
  message: string
  title?: string
  type?: string
  to?: string | Array<string>
  customOptions?: any
  extraOptions?: any
}
interface result {
  status: number
  statusText: string
  extraMessage: any
}
interface proxy {
  enable: boolean
  host: string
  port: number
  protocol?: string
  username?: string
  password?: string
}

const queryStringify = (data: objectData): string => Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
const proxy2httpsAgent = (proxy: proxy, protocol = 'https'): AxiosRequestConfig['httpsAgent'] | null => {
  if (proxy.host && proxy.port) {
    let agent: AxiosRequestConfig['httpsAgent'];
    if (proxy.protocol?.includes('socks')) {
      agent = new SocksProxyAgent(`socks://${
        proxy.username && proxy.password ? `${proxy.username}:${proxy.password}@` : ''
      }${proxy.host}:${proxy.port}`);
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
export { queryStringify, proxy2httpsAgent, objectData, sendOptions, result, proxy };
