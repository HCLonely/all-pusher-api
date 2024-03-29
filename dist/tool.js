'use strict';

var tunnel = require('tunnel');
var socksProxyAgent = require('socks-proxy-agent');
function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}
var tunnel__namespace = /*#__PURE__*/_interopNamespaceDefault(tunnel);
const queryStringify = data => Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
const proxy2httpsAgent = (proxy, protocol = 'https') => {
  if (proxy.host && proxy.port) {
    var _proxy$protocol;
    let agent;
    if ((_proxy$protocol = proxy.protocol) !== null && _proxy$protocol !== void 0 && _proxy$protocol.includes('socks')) {
      agent = new socksProxyAgent.SocksProxyAgent(`socks://${proxy.username && proxy.password ? `${proxy.username}:${proxy.password}@` : ''}${proxy.host}:${proxy.port}`);
    } else {
      const proxyOptions = {
        host: proxy.host,
        port: proxy.port
      };
      if (proxy.username && proxy.password) {
        proxyOptions.proxyAuth = `${proxy.username}:${proxy.password}`;
      }
      if (protocol === 'http') {
        if (proxy.protocol === 'https') {
          agent = tunnel__namespace.httpOverHttps({
            proxy: proxyOptions
          });
        } else {
          agent = tunnel__namespace.httpOverHttp({
            proxy: proxyOptions
          });
        }
      } else {
        if (proxy.protocol === 'https') {
          agent = tunnel__namespace.httpsOverHttps({
            proxy: proxyOptions
          });
        } else {
          agent = tunnel__namespace.httpsOverHttp({
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
exports.queryStringify = queryStringify;
