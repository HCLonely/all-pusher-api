'use strict';

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");
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
          get: function get() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var tunnel__namespace = /*#__PURE__*/_interopNamespaceDefault(tunnel);
var queryStringify = function queryStringify(data) {
  return Object.entries(data).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return "".concat(key, "=").concat(encodeURIComponent(value));
  }).join('&');
};
var proxy2httpsAgent = function proxy2httpsAgent(proxy) {
  var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https';
  if (proxy.host && proxy.port) {
    var _proxy$protocol;
    var agent;
    if ((_proxy$protocol = proxy.protocol) !== null && _proxy$protocol !== void 0 && _proxy$protocol.includes('socks')) {
      agent = new socksProxyAgent.SocksProxyAgent("socks://".concat(proxy.username && proxy.password ? "".concat(proxy.username, ":").concat(proxy.password, "@") : '').concat(proxy.host, ":").concat(proxy.port));
    } else {
      var proxyOptions = {
        host: proxy.host,
        port: proxy.port
      };
      if (proxy.username && proxy.password) {
        proxyOptions.proxyAuth = "".concat(proxy.username, ":").concat(proxy.password);
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
