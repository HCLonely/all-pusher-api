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
var crypto = require('crypto');
var tool = require('./tool');
var _DingTalk_brand = /*#__PURE__*/new WeakSet();
var DingTalk = /*#__PURE__*/function () {
  function DingTalk(_ref) {
    var token = _ref.token,
      secret = _ref.secret,
      key = _ref.key,
      proxy = _ref.proxy;
    _classCallCheck(this, DingTalk);
    _classPrivateMethodInitSpec(this, _DingTalk_brand);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_SECRET", void 0);
    _defineProperty(this, "baseURL", 'https://oapi.dingtalk.com/robot/send');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      secret: secret
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.secret) {
      this._SECRET = $key.secret;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(DingTalk, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var dingTalkOptions, axiosOptions;
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
                _context.next = 6;
                break;
              }
              dingTalkOptions = sendOptions.customOptions;
              _context.next = 15;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context.next = 10;
                break;
              }
              dingTalkOptions = {
                msgtype: 'text',
                text: {
                  content: sendOptions.message
                }
              };
              _context.next = 15;
              break;
            case 10:
              if (!(sendOptions.type === 'markdown')) {
                _context.next = 14;
                break;
              }
              dingTalkOptions = {
                msgtype: 'markdown',
                markdown: {
                  text: sendOptions.message,
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim()
                }
              };
              _context.next = 15;
              break;
            case 14:
              return _context.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error',
                extraMessage: sendOptions
              });
            case 15:
              if (sendOptions.extraOptions) {
                dingTalkOptions = _objectSpread(_objectSpread({}, dingTalkOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL, "?access_token=").concat(this._KEY).concat(this._SECRET ? "&".concat(tool.queryStringify(_assertClassBrand(_DingTalk_brand, this, _sign).call(this))) : ''),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: dingTalkOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  console.log(response.data.errcode);
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
            case 19:
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
  return DingTalk;
}();
function _sign() {
  var timestamp = new Date().getTime();
  var stringToSign = "".concat(timestamp, "\n").concat(this._SECRET);
  var hash = crypto.createHmac('sha256', this._SECRET).update(stringToSign, 'utf8').digest();
  return {
    timestamp: timestamp,
    sign: encodeURIComponent(hash.toString('base64'))
  };
}
exports.DingTalk = DingTalk;
