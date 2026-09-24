'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var tool = require('./tool');
var _WorkWeixin_brand = /*#__PURE__*/new WeakSet();
var WorkWeixin = /*#__PURE__*/function () {
  function WorkWeixin(_ref) {
    var corpid = _ref.corpid,
      secret = _ref.secret,
      agentid = _ref.agentid,
      touser = _ref.touser,
      key = _ref.key,
      proxy = _ref.proxy;
    _classCallCheck(this, WorkWeixin);
    _classPrivateMethodInitSpec(this, _WorkWeixin_brand);
    _defineProperty(this, "_CORPID", void 0);
    _defineProperty(this, "_SECRET", void 0);
    _defineProperty(this, "_AGENT_ID", void 0);
    _defineProperty(this, "_TOKEN", void 0);
    _defineProperty(this, "baseURL", 'https://qyapi.weixin.qq.com/cgi-bin/message/send');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "touser", void 0);
    var $key = _objectSpread({
      corpid: corpid,
      secret: secret,
      agentid: agentid,
      touser: touser
    }, key);
    if (!$key.corpid) {
      throw new Error('Missing Parameter: corpid');
    }
    if (!$key.secret) {
      throw new Error('Missing Parameter: secret');
    }
    if (!$key.agentid) {
      throw new Error('Missing Parameter: agentid');
    }
    this._CORPID = $key.corpid;
    this._SECRET = $key.secret;
    this._AGENT_ID = $key.agentid;
    if ($key.touser) {
      this.touser = $key.touser;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(WorkWeixin, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var workWeixinOptions, result, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (!sendOptions.customOptions) {
                _context.next = 8;
                break;
              }
              workWeixinOptions = _objectSpread({}, sendOptions.customOptions);
              if (!workWeixinOptions.agentid) {
                workWeixinOptions.agentid = this._AGENT_ID;
              }
              if (!workWeixinOptions.touser && !workWeixinOptions.totag && !workWeixinOptions.toparty) {
                workWeixinOptions.touser = this.touser;
              }
              _context.next = 17;
              break;
            case 8:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context.next = 12;
                break;
              }
              workWeixinOptions = {
                agentid: this._AGENT_ID,
                msgtype: 'text',
                text: {
                  content: sendOptions.message
                },
                touser: this.touser
              };
              _context.next = 17;
              break;
            case 12:
              if (!(sendOptions.type === 'markdown')) {
                _context.next = 16;
                break;
              }
              workWeixinOptions = {
                agentid: this._AGENT_ID,
                msgtype: 'markdown',
                markdown: {
                  content: sendOptions.message
                },
                touser: this.touser
              };
              _context.next = 17;
              break;
            case 16:
              return _context.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error',
                extraMessage: sendOptions
              });
            case 17:
              if (sendOptions.extraOptions) {
                workWeixinOptions = _objectSpread(_objectSpread({}, workWeixinOptions), sendOptions.extraOptions);
              }
              if (this._TOKEN) {
                _context.next = 24;
                break;
              }
              _context.next = 21;
              return _assertClassBrand(_WorkWeixin_brand, this, _getToken).call(this);
            case 21:
              result = _context.sent;
              if (!(result.status !== 200)) {
                _context.next = 24;
                break;
              }
              return _context.abrupt("return", result);
            case 24:
              axiosOptions = {
                url: "".concat(this.baseURL, "?access_token=").concat(this._TOKEN),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: workWeixinOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (!response.data.errcode) {
                    return {
                      status: 200,
                      statusText: 'Success',
                      extraMessage: response
                    };
                  }
                  return {
                    status: 100,
                    statusText: 'Error',
                    extraMessage: response
                  };
                }
                return {
                  status: 101,
                  statusText: 'No Response Data',
                  extraMessage: response
                };
              })["catch"](function (error) {
                return {
                  status: 102,
                  statusText: 'Request Error',
                  extraMessage: error
                };
              }));
            case 27:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function send(_x) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return WorkWeixin;
}();
function _getToken() {
  return _getToken2.apply(this, arguments);
}
function _getToken2() {
  _getToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var _this = this;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", axios.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=".concat(this._CORPID, "&corpsecret=").concat(this._SECRET)).then(function (response) {
            if (response.data.access_token) {
              _this._TOKEN = response.data.access_token;
              return {
                status: 200,
                statusText: 'Success',
                extraMessage: response
              };
            }
            return {
              status: 104,
              statusText: 'Get "access_token" Failed',
              extraMessage: response
            };
          })["catch"](function (error) {
            return {
              status: 104,
              statusText: 'Get "access_token" Failed',
              extraMessage: error
            };
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _getToken2.apply(this, arguments);
}
exports.WorkWeixin = WorkWeixin;
