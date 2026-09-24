'use strict';

var _typeof = require("@babel/runtime/helpers/typeof");
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
var _QQBot_brand = /*#__PURE__*/new WeakSet();
var QQBot = /*#__PURE__*/function () {
  function QQBot(_ref) {
    var appId = _ref.appId,
      appSecret = _ref.appSecret,
      userId = _ref.userId,
      groupId = _ref.groupId,
      channelId = _ref.channelId,
      baseUrl = _ref.baseUrl,
      key = _ref.key,
      proxy = _ref.proxy;
    _classCallCheck(this, QQBot);
    _classPrivateMethodInitSpec(this, _QQBot_brand);
    _defineProperty(this, "_APP_ID", void 0);
    _defineProperty(this, "_CLIENT_SECRET", void 0);
    _defineProperty(this, "_TOKEN", void 0);
    _defineProperty(this, "_TOKEN_EXPIRE_AT", 0);
    _defineProperty(this, "tokenURL", 'https://api.bot.qq.com/app/getAppAccessToken');
    _defineProperty(this, "baseUrl", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "userId", void 0);
    _defineProperty(this, "groupId", void 0);
    _defineProperty(this, "channelId", void 0);
    _defineProperty(this, "guildId", void 0);
    var $key = _objectSpread({
      appId: appId,
      appSecret: appSecret,
      userId: userId,
      groupId: groupId,
      channelId: channelId,
      // guildId,
      baseUrl: baseUrl
    }, key);
    if (!$key.appId) {
      throw new Error('Missing Parameter: appId');
    }
    if (!$key.appSecret) {
      throw new Error('Missing Parameter: appSecret');
    }
    this._APP_ID = $key.appId;
    this._CLIENT_SECRET = $key.appSecret;
    this.baseUrl = $key.baseUrl || 'https://api.bot.qq.com';
    this.userId = $key.userId;
    this.groupId = $key.groupId;
    this.channelId = $key.channelId;
    this.guildId = $key.guildId;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(QQBot, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var _this = this;
        var qqBotOptions, userId, groupId, channelId, tokenResult, messageURL, axiosOptions;
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
              qqBotOptions = sendOptions.customOptions;
              _context.next = 15;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context.next = 10;
                break;
              }
              qqBotOptions = {
                msg_type: 0,
                content: sendOptions.message
              };
              _context.next = 15;
              break;
            case 10:
              if (!(sendOptions.type === 'markdown')) {
                _context.next = 14;
                break;
              }
              qqBotOptions = {
                msg_type: 2,
                markdown: {
                  content: sendOptions.message
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
                qqBotOptions = _objectSpread(_objectSpread({}, qqBotOptions), sendOptions.extraOptions);
              }
              userId = qqBotOptions.userId || this.userId;
              groupId = qqBotOptions.groupId || this.groupId;
              channelId = qqBotOptions.channelId || this.channelId; // const guildId = qqBotOptions.guildId || this.guildId;
              if (!(!userId && !groupId && !channelId)) {
                _context.next = 21;
                break;
              }
              return _context.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: userId or groupId or channelId',
                extraMessage: null
              });
            case 21:
              if (!(!this._TOKEN || Date.now() >= this._TOKEN_EXPIRE_AT)) {
                _context.next = 27;
                break;
              }
              _context.next = 24;
              return _assertClassBrand(_QQBot_brand, this, _getToken).call(this);
            case 24:
              tokenResult = _context.sent;
              if (!(tokenResult.status !== 200)) {
                _context.next = 27;
                break;
              }
              return _context.abrupt("return", tokenResult);
            case 27:
              messageURL = "".concat(this.baseUrl, "/channels/").concat(channelId, "/messages"); // if (channelId) {
              //   messageURL = `${this.baseUrl}/channels/${channelId}/messages`;
              // }
              if (groupId) {
                messageURL = "".concat(this.baseUrl, "/v2/groups/").concat(groupId, "/messages");
              }
              if (userId) {
                messageURL = "".concat(this.baseUrl, "/v2/users/").concat(userId, "/messages");
              }
              axiosOptions = {
                url: messageURL,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  Authorization: "QQBot ".concat(this._TOKEN)
                },
                data: qqBotOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (!response.data.code) {
                    return {
                      status: 200,
                      statusText: 'Success',
                      extraMessage: response
                    };
                  }
                  if (response.data.code === 304023) {
                    return {
                      status: 201,
                      statusText: 'Waiting',
                      extraMessage: response
                    };
                  }
                  return {
                    status: 100,
                    statusText: _assertClassBrand(_QQBot_brand, _this, _errorText).call(_this, 'Error', response.data),
                    extraMessage: response
                  };
                }
                return {
                  status: 101,
                  statusText: 'No Response Data',
                  extraMessage: response
                };
              })["catch"](function (error) {
                var _error$response, _error$response2;
                if ((error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.code) === 304023) {
                  return {
                    status: 201,
                    statusText: 'Waiting',
                    extraMessage: error
                  };
                }
                return {
                  status: 102,
                  statusText: _assertClassBrand(_QQBot_brand, _this, _errorText).call(_this, 'Request Error', error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data),
                  extraMessage: error
                };
              }));
            case 33:
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
  return QQBot;
}();
function _getToken() {
  return _getToken2.apply(this, arguments);
}
function _getToken2() {
  _getToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var _this2 = this;
    var axiosOptions;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          axiosOptions = {
            url: this.tokenURL,
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            data: {
              appId: this._APP_ID,
              clientSecret: this._CLIENT_SECRET
            }
          };
          if (this.httpsAgent) {
            axiosOptions.httpsAgent = this.httpsAgent;
          }
          return _context2.abrupt("return", axios(axiosOptions).then(function (response) {
            var _response$data;
            if ((_response$data = response.data) !== null && _response$data !== void 0 && _response$data.access_token) {
              _this2._TOKEN = response.data.access_token;
              var expiresIn = Number(response.data.expires_in) || 7200;
              _this2._TOKEN_EXPIRE_AT = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
              return {
                status: 200,
                statusText: 'Success',
                extraMessage: response
              };
            }
            return {
              status: 104,
              statusText: _assertClassBrand(_QQBot_brand, _this2, _errorText).call(_this2, 'Get "access_token" Failed', response.data),
              extraMessage: response
            };
          })["catch"](function (error) {
            var _error$response3;
            return {
              status: 104,
              statusText: _assertClassBrand(_QQBot_brand, _this2, _errorText).call(_this2, 'Get "access_token" Failed', error === null || error === void 0 || (_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data),
              extraMessage: error
            };
          }));
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _getToken2.apply(this, arguments);
}
function _errorText(prefix, data) {
  if (!data || _typeof(data) !== 'object') return prefix;
  var details = [data.code !== undefined ? "code=".concat(data.code) : '', data.err_code !== undefined ? "err_code=".concat(data.err_code) : '', typeof data.message === 'string' ? data.message : ''].filter(Boolean);
  return details.length ? "".concat(prefix, ": ").concat(details.join(', ')) : prefix;
}
exports.QQBot = QQBot;
