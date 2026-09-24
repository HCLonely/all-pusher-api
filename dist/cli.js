#!/usr/bin/env node
'use strict';

var _typeof = require("@babel/runtime/helpers/typeof");
var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");
var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var commander = require('commander');
var axios = require('axios');
var tool = require('./tool');
var crypto = require('crypto');
var marked = require('marked');
var nodemailer = require('nodemailer');
var WebSocket = require('ws');
var fs = require('fs');
var path = require('path');
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
var nodemailer__namespace = /*#__PURE__*/_interopNamespaceDefault(nodemailer);
var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);
var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);
var ServerChanTurbo = /*#__PURE__*/function () {
  function ServerChanTurbo(_ref) {
    var token = _ref.token,
      key = _ref.key,
      proxy = _ref.proxy;
    _classCallCheck(this, ServerChanTurbo);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://sctapi.ftqq.com/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(ServerChanTurbo, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var serverChanTurboOptions, axiosOptions;
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
              if (sendOptions.customOptions) {
                serverChanTurboOptions = sendOptions.customOptions;
              } else {
                serverChanTurboOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  desp: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                serverChanTurboOptions = _objectSpread(_objectSpread({}, serverChanTurboOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY, ".send"),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(serverChanTurboOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  var _response$data$data;
                  if (((_response$data$data = response.data.data) === null || _response$data$data === void 0 ? void 0 : _response$data$data.error) === 'SUCCESS') {
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
            case 7:
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
  return ServerChanTurbo;
}();
var _baseURL = /*#__PURE__*/new WeakMap();
var PushDeer = /*#__PURE__*/function () {
  function PushDeer(_ref2) {
    var token = _ref2.token,
      key = _ref2.key,
      proxy = _ref2.proxy;
    _classCallCheck(this, PushDeer);
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL, 'https://api2.pushdeer.com/message/push');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      _classPrivateFieldSet(_baseURL, this, $key.baseURL);
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(PushDeer, [{
    key: "send",
    value: function () {
      var _send2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(sendOptions) {
        var pushDeerOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                pushDeerOptions = sendOptions.customOptions;
              } else {
                pushDeerOptions = {};
                if (sendOptions.title) {
                  pushDeerOptions.text = sendOptions.title;
                  pushDeerOptions.desp = sendOptions.message;
                } else {
                  pushDeerOptions.text = sendOptions.message;
                }
                if (sendOptions.type) {
                  pushDeerOptions.type = sendOptions.type;
                }
              }
              pushDeerOptions.pushkey = this._KEY;
              if (sendOptions.extraOptions) {
                pushDeerOptions = _objectSpread(_objectSpread({}, pushDeerOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: _classPrivateFieldGet(_baseURL, this),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(pushDeerOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context2.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  var _response$data$succes;
                  if (((_response$data$succes = response.data.success) === null || _response$data$succes === void 0 || (_response$data$succes = _response$data$succes[0]) === null || _response$data$succes === void 0 ? void 0 : _response$data$succes.success) === 'ok' || response.data.code === 0) {
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
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function send(_x2) {
        return _send2.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return PushDeer;
}();
var TelegramBot = /*#__PURE__*/function () {
  function TelegramBot(_ref3) {
    var token = _ref3.token,
      chat_id = _ref3.chat_id,
      key = _ref3.key,
      proxy = _ref3.proxy;
    _classCallCheck(this, TelegramBot);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_CHAT_ID", void 0);
    _defineProperty(this, "baseURL", 'https://api.telegram.org/bot');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      chat_id: chat_id
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.chat_id) {
      throw new Error('Missing Parameter: chat_id');
    }
    this._KEY = $key.token;
    this._CHAT_ID = $key.chat_id;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(TelegramBot, [{
    key: "send",
    value: function () {
      var _send3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3(sendOptions) {
        var telegramBotOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                telegramBotOptions = _objectSpread({}, sendOptions.customOptions);
              } else {
                telegramBotOptions = {
                  text: sendOptions.message
                };
                if (sendOptions.type === 'html') {
                  telegramBotOptions.parse_mode = 'HTML';
                }
                if (sendOptions.type === 'markdown') {
                  telegramBotOptions.parse_mode = 'Markdown';
                }
              }
              if (!telegramBotOptions.chat_id) {
                telegramBotOptions.chat_id = this._CHAT_ID;
              }
              if (sendOptions.extraOptions) {
                telegramBotOptions = _objectSpread(_objectSpread({}, telegramBotOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY, "/sendMessage"),
                method: 'POST',
                data: tool.queryStringify(telegramBotOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context3.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.ok) {
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
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function send(_x3) {
        return _send3.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return TelegramBot;
}();
var _DingTalk_brand = /*#__PURE__*/new WeakSet();
var DingTalk = /*#__PURE__*/function () {
  function DingTalk(_ref4) {
    var token = _ref4.token,
      secret = _ref4.secret,
      key = _ref4.key,
      proxy = _ref4.proxy;
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
      var _send4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4(sendOptions) {
        var dingTalkOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (!sendOptions.customOptions) {
                _context4.next = 6;
                break;
              }
              dingTalkOptions = sendOptions.customOptions;
              _context4.next = 15;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context4.next = 10;
                break;
              }
              dingTalkOptions = {
                msgtype: 'text',
                text: {
                  content: sendOptions.message
                }
              };
              _context4.next = 15;
              break;
            case 10:
              if (!(sendOptions.type === 'markdown')) {
                _context4.next = 14;
                break;
              }
              dingTalkOptions = {
                msgtype: 'markdown',
                markdown: {
                  text: sendOptions.message,
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim()
                }
              };
              _context4.next = 15;
              break;
            case 14:
              return _context4.abrupt("return", {
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
              return _context4.abrupt("return", axios(axiosOptions).then(function (response) {
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
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function send(_x4) {
        return _send4.apply(this, arguments);
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
var WxPusher = /*#__PURE__*/function () {
  function WxPusher(_ref5) {
    var token = _ref5.token,
      uids = _ref5.uids,
      topicIds = _ref5.topicIds,
      key = _ref5.key,
      proxy = _ref5.proxy;
    _classCallCheck(this, WxPusher);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://wxpusher.zjiecode.com/api/send/message');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "uids", void 0);
    _defineProperty(this, "topicIds", void 0);
    var $key = _objectSpread({
      token: token,
      uids: uids,
      topicIds: topicIds
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.uids) {
      this.uids = $key.uids;
    }
    if ($key.topicIds) {
      this.topicIds = $key.topicIds;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(WxPusher, [{
    key: "send",
    value: function () {
      var _send5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee5(sendOptions) {
        var wxPusherOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                wxPusherOptions = sendOptions.customOptions;
                wxPusherOptions.appToken = this._KEY;
              } else {
                wxPusherOptions = {
                  content: sendOptions.message,
                  appToken: this._KEY,
                  contentType: ['html', 'markdown'].includes(sendOptions.type || '') ? 2 : 1
                };
                if (sendOptions.title) {
                  wxPusherOptions.summary = sendOptions.title;
                }
                if (sendOptions.type === 'markdown') {
                  // @ts-ignore
                  wxPusherOptions.content = marked.marked.parse(sendOptions.message);
                }
              }
              if (!wxPusherOptions.uids && this.uids) {
                wxPusherOptions.uids = this.uids;
              }
              if (!wxPusherOptions.topicIds && this.topicIds) {
                wxPusherOptions.topicIds = this.topicIds;
              }
              if (sendOptions.extraOptions) {
                wxPusherOptions = _objectSpread(_objectSpread({}, wxPusherOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this.baseURL,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: wxPusherOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context5.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.success === true) {
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
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function send(_x5) {
        return _send5.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return WxPusher;
}();
var Mail = /*#__PURE__*/function () {
  function Mail(_ref6) {
    var key = _ref6.key,
      options = _ref6.options,
      proxy = _ref6.proxy;
    _classCallCheck(this, Mail);
    _defineProperty(this, "_SERVER", void 0);
    _defineProperty(this, "options", void 0);
    if (!key) {
      throw new Error('Missing Parameter: key');
    }
    this._SERVER = key;
    this.options = options;
    if (proxy && proxy.enable && proxy.host && proxy.port) {
      this._SERVER.proxy = "".concat(proxy.protocol || 'http', "://").concat(proxy.host, ":").concat(proxy.port);
    }
  }
  _createClass(Mail, [{
    key: "send",
    value: function () {
      var _send6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee6(sendOptions) {
        var mailOptions, transporter;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                mailOptions = sendOptions.customOptions;
              } else {
                mailOptions = _objectSpread(_objectSpread({}, this.options), {}, {
                  subject: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
                });
                if (!sendOptions.type || sendOptions.type === 'text') {
                  mailOptions.text = sendOptions.message;
                }
                if (sendOptions.type === 'markdown') {
                  // @ts-ignore
                  mailOptions.html = marked.marked.parse(sendOptions.message);
                }
                if (sendOptions.type === 'html') {
                  mailOptions.html = sendOptions.message;
                }
              }
              if (sendOptions.extraOptions) {
                mailOptions = _objectSpread(_objectSpread({}, mailOptions), sendOptions.extraOptions);
              }
              transporter = nodemailer__namespace.createTransport(this._SERVER);
              return _context6.abrupt("return", transporter.sendMail(mailOptions).then(function (response) {
                return {
                  status: 200,
                  statusText: 'Success',
                  extraMessage: response
                };
              })["catch"](function (error) {
                return {
                  status: 102,
                  statusText: 'Request Error',
                  extraMessage: error
                };
              }));
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function send(_x6) {
        return _send6.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Mail;
}();
var _FeiShu_brand = /*#__PURE__*/new WeakSet();
var FeiShu = /*#__PURE__*/function () {
  function FeiShu(_ref7) {
    var token = _ref7.token,
      secret = _ref7.secret,
      key = _ref7.key,
      proxy = _ref7.proxy;
    _classCallCheck(this, FeiShu);
    _classPrivateMethodInitSpec(this, _FeiShu_brand);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_SECRET", void 0);
    _defineProperty(this, "baseURL", 'https://open.feishu.cn/open-apis/bot/v2/hook/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      secret: secret
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: key.token');
    }
    this._KEY = $key.token;
    if ($key.secret) {
      this._SECRET = $key.secret;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(FeiShu, [{
    key: "send",
    value: function () {
      var _send7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee7(sendOptions) {
        var feiShuOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context7.next = 2;
                break;
              }
              return _context7.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (!sendOptions.customOptions) {
                _context7.next = 6;
                break;
              }
              feiShuOptions = sendOptions.customOptions;
              _context7.next = 11;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context7.next = 10;
                break;
              }
              feiShuOptions = {
                msg_type: 'text',
                content: {
                  text: sendOptions.message
                }
              };
              _context7.next = 11;
              break;
            case 10:
              return _context7.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error',
                extraMessage: sendOptions
              });
            case 11:
              if (this._SECRET) {
                feiShuOptions = _objectSpread(_objectSpread({}, _assertClassBrand(_FeiShu_brand, this, _sign2).call(this)), feiShuOptions);
              }
              if (sendOptions.extraOptions) {
                feiShuOptions = _objectSpread(_objectSpread({}, feiShuOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: feiShuOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context7.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (!response.data.code) {
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
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function send(_x7) {
        return _send7.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return FeiShu;
}();
function _sign2() {
  var timestamp = Math.floor(new Date().getTime() / 1000);
  var stringToSign = "".concat(timestamp, "\n").concat(this._SECRET);
  var hash = crypto.createHmac('sha256', stringToSign).digest();
  return {
    timestamp: timestamp,
    sign: hash.toString('base64')
  };
}
var _WorkWeixin_brand = /*#__PURE__*/new WeakSet();
var WorkWeixin = /*#__PURE__*/function () {
  function WorkWeixin(_ref8) {
    var corpid = _ref8.corpid,
      secret = _ref8.secret,
      agentid = _ref8.agentid,
      touser = _ref8.touser,
      key = _ref8.key,
      proxy = _ref8.proxy;
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
      var _send8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee8(sendOptions) {
        var workWeixinOptions, result, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context8.next = 2;
                break;
              }
              return _context8.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (!sendOptions.customOptions) {
                _context8.next = 8;
                break;
              }
              workWeixinOptions = _objectSpread({}, sendOptions.customOptions);
              if (!workWeixinOptions.agentid) {
                workWeixinOptions.agentid = this._AGENT_ID;
              }
              if (!workWeixinOptions.touser && !workWeixinOptions.totag && !workWeixinOptions.toparty) {
                workWeixinOptions.touser = this.touser;
              }
              _context8.next = 17;
              break;
            case 8:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context8.next = 12;
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
              _context8.next = 17;
              break;
            case 12:
              if (!(sendOptions.type === 'markdown')) {
                _context8.next = 16;
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
              _context8.next = 17;
              break;
            case 16:
              return _context8.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error',
                extraMessage: sendOptions
              });
            case 17:
              if (sendOptions.extraOptions) {
                workWeixinOptions = _objectSpread(_objectSpread({}, workWeixinOptions), sendOptions.extraOptions);
              }
              if (this._TOKEN) {
                _context8.next = 24;
                break;
              }
              _context8.next = 21;
              return _assertClassBrand(_WorkWeixin_brand, this, _getToken).call(this);
            case 21:
              result = _context8.sent;
              if (!(result.status !== 200)) {
                _context8.next = 24;
                break;
              }
              return _context8.abrupt("return", result);
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
              return _context8.abrupt("return", axios(axiosOptions).then(function (response) {
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
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function send(_x8) {
        return _send8.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return WorkWeixin;
}();
function _getToken() {
  return _getToken4.apply(this, arguments);
}
function _getToken4() {
  _getToken4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee38() {
    var _this7 = this;
    return _regeneratorRuntime.wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          return _context38.abrupt("return", axios.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=".concat(this._CORPID, "&corpsecret=").concat(this._SECRET)).then(function (response) {
            if (response.data.access_token) {
              _this7._TOKEN = response.data.access_token;
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
          return _context38.stop();
      }
    }, _callee38, this);
  }));
  return _getToken4.apply(this, arguments);
}
var PushPlus = /*#__PURE__*/function () {
  function PushPlus(_ref9) {
    var token = _ref9.token,
      key = _ref9.key,
      proxy = _ref9.proxy;
    _classCallCheck(this, PushPlus);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'http://www.pushplus.plus/send');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(PushPlus, [{
    key: "send",
    value: function () {
      var _send9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee9(sendOptions) {
        var pushPlusOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context9.next = 2;
                break;
              }
              return _context9.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                pushPlusOptions = sendOptions.customOptions;
              } else {
                pushPlusOptions = {
                  content: sendOptions.message
                };
                if (sendOptions.title) {
                  pushPlusOptions.title = sendOptions.title;
                }
                if (['html', 'markdown'].includes(sendOptions.type || '')) {
                  pushPlusOptions.template = sendOptions.type;
                }
              }
              pushPlusOptions.token = this._KEY;
              if (sendOptions.extraOptions) {
                pushPlusOptions = _objectSpread(_objectSpread({}, pushPlusOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: pushPlusOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context9.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.code === 200) {
                    return {
                      status: 200,
                      statusText: 'Success',
                      extraMessage: response
                    };
                  }
                  if (response.data.code === 905) {
                    return {
                      status: 205,
                      statusText: 'Error',
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
            case 8:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function send(_x9) {
        return _send9.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return PushPlus;
}();
var Showdoc = /*#__PURE__*/function () {
  function Showdoc(_ref0) {
    var token = _ref0.token,
      key = _ref0.key,
      proxy = _ref0.proxy;
    _classCallCheck(this, Showdoc);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://push.showdoc.com.cn/server/api/push/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Showdoc, [{
    key: "send",
    value: function () {
      var _send0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee0(sendOptions) {
        var showdocOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee0$(_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context0.next = 2;
                break;
              }
              return _context0.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                showdocOptions = sendOptions.customOptions;
              } else {
                showdocOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  content: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                showdocOptions = _objectSpread(_objectSpread({}, showdocOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(showdocOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context0.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (!response.data.error_code) {
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
            case 7:
            case "end":
              return _context0.stop();
          }
        }, _callee0, this);
      }));
      function send(_x0) {
        return _send0.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Showdoc;
}();
var Xizhi = /*#__PURE__*/function () {
  function Xizhi(_ref1) {
    var token = _ref1.token,
      key = _ref1.key,
      proxy = _ref1.proxy;
    _classCallCheck(this, Xizhi);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://xizhi.qqoq.net/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Xizhi, [{
    key: "send",
    value: function () {
      var _send1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee1(sendOptions) {
        var xizhiOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee1$(_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context1.next = 2;
                break;
              }
              return _context1.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                xizhiOptions = sendOptions.customOptions;
              } else {
                xizhiOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  content: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                xizhiOptions = _objectSpread(_objectSpread({}, xizhiOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY, ".send"),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(xizhiOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context1.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.code === 200) {
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
            case 7:
            case "end":
              return _context1.stop();
          }
        }, _callee1, this);
      }));
      function send(_x1) {
        return _send1.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Xizhi;
}();
var Discord = /*#__PURE__*/function () {
  function Discord(_ref10) {
    var webhook = _ref10.webhook,
      key = _ref10.key,
      proxy = _ref10.proxy;
    _classCallCheck(this, Discord);
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      webhook: webhook
    }, key);
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Discord, [{
    key: "send",
    value: function () {
      var _send10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee10(sendOptions) {
        var discordOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context10.next = 2;
                break;
              }
              return _context10.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                discordOptions = sendOptions.customOptions;
              } else {
                discordOptions = {
                  content: sendOptions.title ? "".concat(sendOptions.title, "\n").concat(sendOptions.message) : sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                discordOptions = _objectSpread(_objectSpread({}, discordOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this._WEBHOOK,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: discordOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context10.abrupt("return", axios(axiosOptions).then(function (response) {
                return {
                  status: 200,
                  statusText: 'Success',
                  extraMessage: response
                };
              })["catch"](function (error) {
                return {
                  status: 102,
                  statusText: 'Request Error',
                  extraMessage: error
                };
              }));
            case 7:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function send(_x10) {
        return _send10.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Discord;
}();
var GoCqhttp = /*#__PURE__*/function () {
  function GoCqhttp(_ref11) {
    var baseUrl = _ref11.baseUrl,
      token = _ref11.token,
      user_id = _ref11.user_id,
      group_id = _ref11.group_id,
      guild_id = _ref11.guild_id,
      channel_id = _ref11.channel_id,
      key = _ref11.key,
      proxy = _ref11.proxy;
    _classCallCheck(this, GoCqhttp);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_BASE_URL", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "user_id", void 0);
    _defineProperty(this, "group_id", void 0);
    _defineProperty(this, "guild_id", void 0);
    _defineProperty(this, "channel_id", void 0);
    var $key = _objectSpread({
      baseUrl: baseUrl,
      token: token,
      user_id: user_id,
      group_id: group_id,
      guild_id: guild_id,
      channel_id: channel_id
    }, key);
    if (!$key.baseUrl) {
      throw new Error('Missing Parameter: baseUrl');
    }
    this._BASE_URL = $key.baseUrl;
    if ($key.token) {
      this._KEY = $key.token;
    }
    if ($key.user_id) {
      this.user_id = $key.user_id;
    }
    if ($key.group_id) {
      this.group_id = $key.group_id;
    }
    if ($key.guild_id) {
      this.guild_id = $key.guild_id;
    }
    if ($key.channel_id) {
      this.channel_id = $key.channel_id;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy, new URL(this._BASE_URL).protocol.replace(':', ''));
    }
  }
  _createClass(GoCqhttp, [{
    key: "send",
    value: function () {
      var _send11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee11(sendOptions) {
        var goCqhttpOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context11.next = 2;
                break;
              }
              return _context11.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                goCqhttpOptions = sendOptions.customOptions;
              } else {
                goCqhttpOptions = {
                  message: sendOptions.message
                };
                if (this.user_id) {
                  goCqhttpOptions.user_id = this.user_id;
                }
                if (this.group_id) {
                  goCqhttpOptions.group_id = this.group_id;
                }
                if (this.guild_id) {
                  goCqhttpOptions.guild_id = this.guild_id;
                }
                if (this.channel_id) {
                  goCqhttpOptions.channel_id = this.channel_id;
                }
              }
              if (sendOptions.extraOptions) {
                goCqhttpOptions = _objectSpread(_objectSpread({}, goCqhttpOptions), sendOptions.extraOptions);
              }
              if (!(goCqhttpOptions.guild_id && !goCqhttpOptions.channel_id || goCqhttpOptions.channel_id && !goCqhttpOptions.guild_id)) {
                _context11.next = 6;
                break;
              }
              return _context11.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error: Both "channel_id" & "guild_id" must exist',
                extraMessage: goCqhttpOptions
              });
            case 6:
              if (!([goCqhttpOptions.user_id, goCqhttpOptions.group_id, goCqhttpOptions.channel_id].filter(function (e) {
                return e;
              }).length > 1)) {
                _context11.next = 8;
                break;
              }
              return _context11.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error: "user_id", "group_id", and "channel_id" cannot exist at the same time',
                extraMessage: goCqhttpOptions
              });
            case 8:
              axiosOptions = {
                url: "".concat(this._BASE_URL).concat(goCqhttpOptions.channel_id ? '/send_guild_channel_msg' : '/send_msg'),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  Authorization: "Bearer ".concat(this._KEY)
                },
                data: goCqhttpOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context11.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.retcode === 0) {
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
            case 11:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function send(_x11) {
        return _send11.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return GoCqhttp;
}();
var Qmsg = /*#__PURE__*/function () {
  function Qmsg(_ref12) {
    var token = _ref12.token,
      group = _ref12.group,
      key = _ref12.key,
      proxy = _ref12.proxy;
    _classCallCheck(this, Qmsg);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_GROUP", void 0);
    _defineProperty(this, "baseURL", 'https://qmsg.zendee.cn/v3/jsend/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      group: group
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    this._GROUP = $key.group;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Qmsg, [{
    key: "send",
    value: function () {
      var _send12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee12(sendOptions) {
        var qmsgOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context12.next = 2;
                break;
              }
              return _context12.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                qmsgOptions = _objectSpread({}, sendOptions.customOptions);
              } else {
                qmsgOptions = {
                  msg: sendOptions.title ? "".concat(sendOptions.title, "\n").concat(sendOptions.message) : sendOptions.message
                };
                if (this._GROUP) {
                  qmsgOptions.group = this._GROUP;
                }
              }
              qmsgOptions = _objectSpread(_objectSpread({}, qmsgOptions), sendOptions.extraOptions);
              if (!(typeof qmsgOptions.msg !== 'string' || !qmsgOptions.msg.trim())) {
                _context12.next = 6;
                break;
              }
              return _context12.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: msg',
                extraMessage: null
              });
            case 6:
              if (!(qmsgOptions.msg.length > 1000)) {
                _context12.next = 8;
                break;
              }
              return _context12.abrupt("return", {
                status: 103,
                statusText: 'Invalid Parameter: msg exceeds 1000 characters',
                extraMessage: null
              });
            case 8:
              axiosOptions = {
                url: "".concat(this.baseURL).concat(encodeURIComponent(this._KEY)),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: qmsgOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context12.abrupt("return", axios(axiosOptions).then(function (response) {
                if (!response.data) {
                  return {
                    status: 101,
                    statusText: 'No Response Data',
                    extraMessage: response
                  };
                }
                if (response.data.success === true) {
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
              })["catch"](function (error) {
                return {
                  status: 102,
                  statusText: 'Request Error',
                  extraMessage: error
                };
              }));
            case 11:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function send(_x12) {
        return _send12.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Qmsg;
}();
var WorkWeixinBot = /*#__PURE__*/function () {
  function WorkWeixinBot(_ref13) {
    var webhook = _ref13.webhook,
      key = _ref13.key,
      proxy = _ref13.proxy;
    _classCallCheck(this, WorkWeixinBot);
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      webhook: webhook
    }, key);
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(WorkWeixinBot, [{
    key: "send",
    value: function () {
      var _send13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee13(sendOptions) {
        var workWeixinOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context13.next = 2;
                break;
              }
              return _context13.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (!sendOptions.customOptions) {
                _context13.next = 6;
                break;
              }
              workWeixinOptions = sendOptions.customOptions;
              _context13.next = 15;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context13.next = 10;
                break;
              }
              workWeixinOptions = {
                msgtype: 'text',
                text: {
                  content: sendOptions.message
                }
              };
              _context13.next = 15;
              break;
            case 10:
              if (!(sendOptions.type === 'markdown')) {
                _context13.next = 14;
                break;
              }
              workWeixinOptions = {
                msgtype: 'markdown',
                markdown: {
                  content: sendOptions.message
                }
              };
              _context13.next = 15;
              break;
            case 14:
              return _context13.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error',
                extraMessage: sendOptions
              });
            case 15:
              if (sendOptions.extraOptions) {
                workWeixinOptions = _objectSpread(_objectSpread({}, workWeixinOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this._WEBHOOK,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: workWeixinOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context13.abrupt("return", axios(axiosOptions).then(function (response) {
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
            case 19:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function send(_x13) {
        return _send13.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return WorkWeixinBot;
}();
var _baseURL2 = /*#__PURE__*/new WeakMap();
var Chanify = /*#__PURE__*/function () {
  function Chanify(_ref14) {
    var token = _ref14.token,
      baseURL = _ref14.baseURL,
      key = _ref14.key,
      proxy = _ref14.proxy;
    _classCallCheck(this, Chanify);
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL2, 'https://api.chanify.net/v1/sender/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      baseURL: baseURL
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      _classPrivateFieldSet(_baseURL2, this, $key.baseURL);
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Chanify, [{
    key: "send",
    value: function () {
      var _send14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee14(sendOptions) {
        var chanifyOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context14.next = 2;
                break;
              }
              return _context14.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                chanifyOptions = sendOptions.customOptions;
              } else {
                chanifyOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  text: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                chanifyOptions = _objectSpread(_objectSpread({}, chanifyOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(_classPrivateFieldGet(_baseURL2, this)).concat(this._KEY),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(chanifyOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context14.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.status === 200) {
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
              })["catch"](function (error) {
                return {
                  status: 102,
                  statusText: 'Request Error',
                  extraMessage: error
                };
              }));
            case 7:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function send(_x14) {
        return _send14.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Chanify;
}();
var _baseURL3 = /*#__PURE__*/new WeakMap();
var Bark = /*#__PURE__*/function () {
  function Bark(_ref15) {
    var token = _ref15.token,
      baseURL = _ref15.baseURL,
      key = _ref15.key,
      proxy = _ref15.proxy;
    _classCallCheck(this, Bark);
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL3, 'https://api.day.app/push');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      baseURL: baseURL
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      _classPrivateFieldSet(_baseURL3, this, $key.baseURL);
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Bark, [{
    key: "send",
    value: function () {
      var _send15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee15(sendOptions) {
        var barkOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context15.next = 2;
                break;
              }
              return _context15.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                barkOptions = sendOptions.customOptions;
              } else {
                barkOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  body: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                barkOptions = _objectSpread(_objectSpread({}, barkOptions), sendOptions.extraOptions);
              }
              if (!barkOptions.device_key) {
                barkOptions.device_key = this._KEY;
              }
              axiosOptions = {
                url: _classPrivateFieldGet(_baseURL3, this),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: barkOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context15.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.code === 200) {
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
            case 8:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function send(_x15) {
        return _send15.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Bark;
}();
var GoogleChat = /*#__PURE__*/function () {
  function GoogleChat(_ref16) {
    var webhook = _ref16.webhook,
      key = _ref16.key,
      proxy = _ref16.proxy;
    _classCallCheck(this, GoogleChat);
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      webhook: webhook
    }, key);
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(GoogleChat, [{
    key: "send",
    value: function () {
      var _send16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee16(sendOptions) {
        var googleChatOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context16.next = 2;
                break;
              }
              return _context16.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                googleChatOptions = sendOptions.customOptions;
              } else {
                googleChatOptions = {
                  text: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                googleChatOptions = _objectSpread(_objectSpread({}, googleChatOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this._WEBHOOK,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: googleChatOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context16.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (!response.data.error) {
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
            case 7:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function send(_x16) {
        return _send16.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return GoogleChat;
}();
var Push = /*#__PURE__*/function () {
  function Push(_ref17) {
    var token = _ref17.token,
      baseURL = _ref17.baseURL,
      key = _ref17.key,
      proxy = _ref17.proxy;
    _classCallCheck(this, Push);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_BASE_URL", 'https://push.techulus.com/api/v1/notify/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Push, [{
    key: "send",
    value: function () {
      var _send17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee17(sendOptions) {
        var pushOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context17.next = 2;
                break;
              }
              return _context17.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                pushOptions = sendOptions.customOptions;
              } else {
                pushOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  body: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                pushOptions = _objectSpread(_objectSpread({}, pushOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this._BASE_URL).concat(this._KEY),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: pushOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context17.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.success === true) {
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
            case 7:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function send(_x17) {
        return _send17.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Push;
}();
var Slack = /*#__PURE__*/function () {
  function Slack(_ref18) {
    var webhook = _ref18.webhook,
      key = _ref18.key,
      proxy = _ref18.proxy;
    _classCallCheck(this, Slack);
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      webhook: webhook
    }, key);
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Slack, [{
    key: "send",
    value: function () {
      var _send18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee18(sendOptions) {
        var slackOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context18.next = 2;
                break;
              }
              return _context18.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                slackOptions = sendOptions.customOptions;
              } else {
                slackOptions = {
                  text: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                slackOptions = _objectSpread(_objectSpread({}, slackOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this._WEBHOOK,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: slackOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context18.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data === 'ok') {
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
            case 7:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function send(_x18) {
        return _send18.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Slack;
}();
var Pushback = /*#__PURE__*/function () {
  function Pushback(_ref19) {
    var token = _ref19.token,
      userId = _ref19.userId,
      key = _ref19.key,
      proxy = _ref19.proxy;
    _classCallCheck(this, Pushback);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_USER_ID", void 0);
    _defineProperty(this, "_BASE_URL", 'https://api.pushback.io/v1/send');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      userId: userId
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.userId) {
      throw new Error('Missing Parameter: userId');
    }
    this._KEY = $key.token;
    this._USER_ID = $key.userId;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Pushback, [{
    key: "send",
    value: function () {
      var _send19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee19(sendOptions) {
        var pushbackOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context19.next = 2;
                break;
              }
              return _context19.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                pushbackOptions = sendOptions.customOptions;
              } else {
                pushbackOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  body: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                pushbackOptions = _objectSpread(_objectSpread({}, pushbackOptions), sendOptions.extraOptions);
              }
              if (!pushbackOptions.id) {
                pushbackOptions.id = this._USER_ID;
              }
              axiosOptions = {
                url: this._BASE_URL,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  Authorization: "Bearer ".concat(this._KEY)
                },
                data: pushbackOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context19.abrupt("return", axios(axiosOptions).then(function (response) {
                if (![null, undefined, ''].includes(response.data)) {
                  if (response.data === 0) {
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
            case 8:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function send(_x19) {
        return _send19.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Pushback;
}();
var _baseUrl = /*#__PURE__*/new WeakMap();
var Zulip = /*#__PURE__*/function () {
  function Zulip(_ref20) {
    var site = _ref20.site,
      token = _ref20.token,
      to = _ref20.to,
      email = _ref20.email,
      key = _ref20.key,
      proxy = _ref20.proxy;
    _classCallCheck(this, Zulip);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "_EMAIL", void 0);
    _classPrivateFieldInitSpec(this, _baseUrl, void 0);
    _defineProperty(this, "to", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      email: email,
      to: to
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.email) {
      throw new Error('Missing Parameter: email');
    }
    this._KEY = $key.token;
    this._EMAIL = $key.email;
    _classPrivateFieldSet(_baseUrl, this, "".concat(site || 'https://chat.zulip.org', "/api/v1/messages"));
    if ($key.to) {
      this.to = $key.to;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Zulip, [{
    key: "send",
    value: function () {
      var _send20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee20(sendOptions) {
        var zulipOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context20.next = 2;
                break;
              }
              return _context20.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                zulipOptions = sendOptions.customOptions;
              } else {
                zulipOptions = {
                  content: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                zulipOptions = _objectSpread(_objectSpread({}, zulipOptions), sendOptions.extraOptions);
              }
              if (zulipOptions.to) {
                _context20.next = 8;
                break;
              }
              if (this.to) {
                _context20.next = 7;
                break;
              }
              return _context20.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: to',
                extraMessage: null
              });
            case 7:
              zulipOptions.to = this.to;
            case 8:
              if (!zulipOptions.type) {
                zulipOptions.type = 'direct';
              }
              axiosOptions = {
                url: _classPrivateFieldGet(_baseUrl, this),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded',
                  Authorization: "Basic ".concat(Buffer.from("".concat(this._EMAIL, ":").concat(this._KEY)).toString('base64'))
                },
                data: tool.queryStringify(zulipOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context20.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.result === 'success') {
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
            case 12:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function send(_x20) {
        return _send20.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Zulip;
}();
var RocketChat = /*#__PURE__*/function () {
  function RocketChat(_ref21) {
    var webhook = _ref21.webhook,
      key = _ref21.key,
      proxy = _ref21.proxy;
    _classCallCheck(this, RocketChat);
    _defineProperty(this, "_WEBHOOK", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      webhook: webhook
    }, key);
    if (!$key.webhook) {
      throw new Error('Missing Parameter: webhook');
    }
    this._WEBHOOK = $key.webhook;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(RocketChat, [{
    key: "send",
    value: function () {
      var _send21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee21(sendOptions) {
        var rocketChatOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context21.next = 2;
                break;
              }
              return _context21.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                rocketChatOptions = sendOptions.customOptions;
              } else {
                rocketChatOptions = {
                  text: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                rocketChatOptions = _objectSpread(_objectSpread({}, rocketChatOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this._WEBHOOK,
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: rocketChatOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context21.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.success === true) {
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
            case 7:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function send(_x21) {
        return _send21.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return RocketChat;
}();
var Pushover = /*#__PURE__*/function () {
  function Pushover(_ref22) {
    var token = _ref22.token,
      user = _ref22.user,
      key = _ref22.key,
      proxy = _ref22.proxy;
    _classCallCheck(this, Pushover);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.pushover.net/1/messages.json');
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "_USER", void 0);
    var $key = _objectSpread({
      token: token,
      user: user
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    if (!$key.user) {
      throw new Error('Missing Parameter: user');
    }
    this._KEY = $key.token;
    this._USER = $key.user;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Pushover, [{
    key: "send",
    value: function () {
      var _send22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee22(sendOptions) {
        var pushoverOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context22.next = 2;
                break;
              }
              return _context22.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              pushoverOptions = {
                token: this._KEY,
                user: this._USER,
                message: ''
              };
              if (sendOptions.customOptions) {
                pushoverOptions = _objectSpread(_objectSpread({}, pushoverOptions), sendOptions.customOptions);
              } else {
                pushoverOptions = _objectSpread(_objectSpread({}, pushoverOptions), {}, {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  message: sendOptions.message
                });
                if (['html', 'markdown'].includes(sendOptions.type || '')) {
                  pushoverOptions.html = 1;
                }
                if (sendOptions.type === 'markdown') {
                  // @ts-ignore
                  pushoverOptions.message = marked.marked.parse(sendOptions.message);
                }
              }
              if (sendOptions.extraOptions) {
                pushoverOptions = _objectSpread(_objectSpread({}, pushoverOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this.baseURL,
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(pushoverOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context22.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.status === 1) {
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
            case 8:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function send(_x22) {
        return _send22.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Pushover;
}();
var Iyuu = /*#__PURE__*/function () {
  function Iyuu(_ref23) {
    var token = _ref23.token,
      key = _ref23.key,
      proxy = _ref23.proxy;
    _classCallCheck(this, Iyuu);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://iyuu.cn/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Iyuu, [{
    key: "send",
    value: function () {
      var _send23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee23(sendOptions) {
        var iyuuOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context23.next = 2;
                break;
              }
              return _context23.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                iyuuOptions = sendOptions.customOptions;
              } else {
                iyuuOptions = {
                  text: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  desp: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                iyuuOptions = _objectSpread(_objectSpread({}, iyuuOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY, ".send"),
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: tool.queryStringify(iyuuOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context23.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.errcode === 0) {
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
            case 7:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function send(_x23) {
        return _send23.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Iyuu;
}();
var _baseURL4 = /*#__PURE__*/new WeakMap();
var Ntfy = /*#__PURE__*/function () {
  function Ntfy(_ref24) {
    var token = _ref24.token,
      baseURL = _ref24.baseURL,
      key = _ref24.key,
      proxy = _ref24.proxy;
    _classCallCheck(this, Ntfy);
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL4, 'https://ntfy.sh/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      baseURL: baseURL
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      _classPrivateFieldSet(_baseURL4, this, $key.baseURL);
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Ntfy, [{
    key: "send",
    value: function () {
      var _send24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee24(sendOptions) {
        var _this = this;
        var ntfyOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context24.next = 2;
                break;
              }
              return _context24.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                ntfyOptions = sendOptions.customOptions;
              } else {
                ntfyOptions = {
                  topic: this._KEY,
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  message: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                ntfyOptions = _objectSpread(_objectSpread({}, ntfyOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(_classPrivateFieldGet(_baseURL4, this)),
                method: 'POST',
                data: JSON.stringify(ntfyOptions)
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context24.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.topic === _this._KEY) {
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
            case 7:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function send(_x24) {
        return _send24.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return Ntfy;
}();
var NotifyX = /*#__PURE__*/function () {
  function NotifyX(_ref25) {
    var token = _ref25.token,
      key = _ref25.key,
      proxy = _ref25.proxy;
    _classCallCheck(this, NotifyX);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://www.notifyx.cn/api/v1/send/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(NotifyX, [{
    key: "send",
    value: function () {
      var _send25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee25(sendOptions) {
        var notifyXOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context25.next = 2;
                break;
              }
              return _context25.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              notifyXOptions = _objectSpread(_objectSpread({}, sendOptions.customOptions || {
                title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                content: sendOptions.message
              }), sendOptions.extraOptions);
              axiosOptions = {
                url: "".concat(this.baseURL).concat(encodeURIComponent(this._KEY)),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: notifyXOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context25.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.status === 'queued') {
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
            case 6:
            case "end":
              return _context25.stop();
          }
        }, _callee25, this);
      }));
      function send(_x25) {
        return _send25.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return NotifyX;
}();
var YiFengChuanHua = /*#__PURE__*/function () {
  function YiFengChuanHua(_ref26) {
    var token = _ref26.token,
      key = _ref26.key,
      proxy = _ref26.proxy;
    _classCallCheck(this, YiFengChuanHua);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://www.phprm.com/services/push/send/');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(YiFengChuanHua, [{
    key: "send",
    value: function () {
      var _send26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee26(sendOptions) {
        var yiFengChuanHuaOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context26.next = 2;
                break;
              }
              return _context26.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                yiFengChuanHuaOptions = sendOptions.customOptions;
              } else {
                yiFengChuanHuaOptions = {
                  head: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  body: sendOptions.message
                };
              }
              if (sendOptions.extraOptions) {
                yiFengChuanHuaOptions = _objectSpread(_objectSpread({}, yiFengChuanHuaOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL).concat(this._KEY),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: yiFengChuanHuaOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context26.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.code === 0) {
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
            case 7:
            case "end":
              return _context26.stop();
          }
        }, _callee26, this);
      }));
      function send(_x26) {
        return _send26.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return YiFengChuanHua;
}();
var WPush = /*#__PURE__*/function () {
  function WPush(_ref27) {
    var token = _ref27.token,
      key = _ref27.key,
      proxy = _ref27.proxy;
    _classCallCheck(this, WPush);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.wpush.cn/api/v1/send');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(WPush, [{
    key: "send",
    value: function () {
      var _send27 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee27(sendOptions) {
        var wPushOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) switch (_context27.prev = _context27.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context27.next = 2;
                break;
              }
              return _context27.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                wPushOptions = sendOptions.customOptions;
              } else {
                wPushOptions = {
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10),
                  content: sendOptions.message
                };
              }
              wPushOptions.apikey = this._KEY;
              if (sendOptions.extraOptions) {
                wPushOptions = _objectSpread(_objectSpread({}, wPushOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(this.baseURL),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: wPushOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context27.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.code === 0) {
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
            case 8:
            case "end":
              return _context27.stop();
          }
        }, _callee27, this);
      }));
      function send(_x27) {
        return _send27.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return WPush;
}();
var PushBullet = /*#__PURE__*/function () {
  function PushBullet(_ref28) {
    var token = _ref28.token,
      key = _ref28.key,
      proxy = _ref28.proxy;
    _classCallCheck(this, PushBullet);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.pushbullet.com/v2/pushes');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(PushBullet, [{
    key: "send",
    value: function () {
      var _send28 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee28(sendOptions) {
        var pushBulletOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context28.next = 2;
                break;
              }
              return _context28.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                pushBulletOptions = sendOptions.customOptions;
              } else {
                pushBulletOptions = {
                  type: 'note',
                  body: sendOptions.message,
                  title: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
                };
              }
              if (sendOptions.extraOptions) {
                pushBulletOptions = _objectSpread(_objectSpread({}, pushBulletOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this.baseURL,
                method: 'POST',
                headers: {
                  'Access-Token': this._KEY,
                  'Content-type': 'application/json'
                },
                data: pushBulletOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context28.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.status === 200) {
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
            case 7:
            case "end":
              return _context28.stop();
          }
        }, _callee28, this);
      }));
      function send(_x28) {
        return _send28.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return PushBullet;
}();
var SimplePush = /*#__PURE__*/function () {
  function SimplePush(_ref29) {
    var token = _ref29.token,
      key = _ref29.key,
      proxy = _ref29.proxy;
    _classCallCheck(this, SimplePush);
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", 'https://api.simplepush.io/send');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(SimplePush, [{
    key: "send",
    value: function () {
      var _send29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee29(sendOptions) {
        var simplePushOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) switch (_context29.prev = _context29.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context29.next = 2;
                break;
              }
              return _context29.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                simplePushOptions = sendOptions.customOptions;
              } else {
                simplePushOptions = {
                  key: this._KEY,
                  msg: sendOptions.message
                };
                if (sendOptions.title) {
                  simplePushOptions.title = sendOptions.title;
                }
              }
              if (sendOptions.extraOptions) {
                simplePushOptions = _objectSpread(_objectSpread({}, simplePushOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: this.baseURL,
                method: 'POST',
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data: simplePushOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context29.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data.status === 'OK') {
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
            case 7:
            case "end":
              return _context29.stop();
          }
        }, _callee29, this);
      }));
      function send(_x29) {
        return _send29.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return SimplePush;
}();
var _baseURL5 = /*#__PURE__*/new WeakMap();
var PushMe = /*#__PURE__*/function () {
  function PushMe(_ref30) {
    var token = _ref30.token,
      baseURL = _ref30.baseURL,
      key = _ref30.key,
      proxy = _ref30.proxy;
    _classCallCheck(this, PushMe);
    _defineProperty(this, "_KEY", void 0);
    _classPrivateFieldInitSpec(this, _baseURL5, 'https://push.i-i.me');
    _defineProperty(this, "httpsAgent", void 0);
    var $key = _objectSpread({
      token: token,
      baseURL: baseURL
    }, key);
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.baseURL) {
      _classPrivateFieldSet(_baseURL5, this, $key.baseURL);
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(PushMe, [{
    key: "send",
    value: function () {
      var _send30 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee30(sendOptions) {
        var pushMeOptions, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) switch (_context30.prev = _context30.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context30.next = 2;
                break;
              }
              return _context30.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (sendOptions.customOptions) {
                pushMeOptions = sendOptions.customOptions;
              } else {
                pushMeOptions = {
                  content: sendOptions.message
                };
                if (sendOptions.title) {
                  pushMeOptions.title = sendOptions.title;
                }
                if (['html', 'markdown'].includes(sendOptions.type || '')) {
                  pushMeOptions.type = sendOptions.type;
                }
              }
              pushMeOptions.push_key = this._KEY;
              if (sendOptions.extraOptions) {
                pushMeOptions = _objectSpread(_objectSpread({}, pushMeOptions), sendOptions.extraOptions);
              }
              axiosOptions = {
                url: "".concat(_classPrivateFieldGet(_baseURL5, this)),
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                data: pushMeOptions
              };
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              return _context30.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  if (response.data === 'success') {
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
            case 8:
            case "end":
              return _context30.stop();
          }
        }, _callee30, this);
      }));
      function send(_x30) {
        return _send30.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return PushMe;
}();
var _QQBot_brand = /*#__PURE__*/new WeakSet();
var QQBot = /*#__PURE__*/function () {
  function QQBot(_ref31) {
    var appId = _ref31.appId,
      appSecret = _ref31.appSecret,
      userId = _ref31.userId,
      groupId = _ref31.groupId,
      channelId = _ref31.channelId,
      baseUrl = _ref31.baseUrl,
      key = _ref31.key,
      proxy = _ref31.proxy;
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
      var _send31 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee31(sendOptions) {
        var _this2 = this;
        var qqBotOptions, userId, groupId, channelId, tokenResult, messageURL, axiosOptions;
        return _regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) switch (_context31.prev = _context31.next) {
            case 0:
              if (!(!sendOptions.message && !sendOptions.customOptions)) {
                _context31.next = 2;
                break;
              }
              return _context31.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: message',
                extraMessage: null
              });
            case 2:
              if (!sendOptions.customOptions) {
                _context31.next = 6;
                break;
              }
              qqBotOptions = sendOptions.customOptions;
              _context31.next = 15;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context31.next = 10;
                break;
              }
              qqBotOptions = {
                msg_type: 0,
                content: sendOptions.message
              };
              _context31.next = 15;
              break;
            case 10:
              if (!(sendOptions.type === 'markdown')) {
                _context31.next = 14;
                break;
              }
              qqBotOptions = {
                msg_type: 2,
                markdown: {
                  content: sendOptions.message
                }
              };
              _context31.next = 15;
              break;
            case 14:
              return _context31.abrupt("return", {
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
                _context31.next = 21;
                break;
              }
              return _context31.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: userId or groupId or channelId',
                extraMessage: null
              });
            case 21:
              if (!(!this._TOKEN || Date.now() >= this._TOKEN_EXPIRE_AT)) {
                _context31.next = 27;
                break;
              }
              _context31.next = 24;
              return _assertClassBrand(_QQBot_brand, this, _getToken2).call(this);
            case 24:
              tokenResult = _context31.sent;
              if (!(tokenResult.status !== 200)) {
                _context31.next = 27;
                break;
              }
              return _context31.abrupt("return", tokenResult);
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
              return _context31.abrupt("return", axios(axiosOptions).then(function (response) {
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
                    statusText: _assertClassBrand(_QQBot_brand, _this2, _errorText).call(_this2, 'Error', response.data),
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
                  statusText: _assertClassBrand(_QQBot_brand, _this2, _errorText).call(_this2, 'Request Error', error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data),
                  extraMessage: error
                };
              }));
            case 33:
            case "end":
              return _context31.stop();
          }
        }, _callee31, this);
      }));
      function send(_x31) {
        return _send31.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return QQBot;
}();
function _getToken2() {
  return _getToken5.apply(this, arguments);
}
function _getToken5() {
  _getToken5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee39() {
    var _this8 = this;
    var axiosOptions;
    return _regeneratorRuntime.wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
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
          return _context39.abrupt("return", axios(axiosOptions).then(function (response) {
            var _response$data;
            if ((_response$data = response.data) !== null && _response$data !== void 0 && _response$data.access_token) {
              _this8._TOKEN = response.data.access_token;
              var expiresIn = Number(response.data.expires_in) || 7200;
              _this8._TOKEN_EXPIRE_AT = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
              return {
                status: 200,
                statusText: 'Success',
                extraMessage: response
              };
            }
            return {
              status: 104,
              statusText: _assertClassBrand(_QQBot_brand, _this8, _errorText).call(_this8, 'Get "access_token" Failed', response.data),
              extraMessage: response
            };
          })["catch"](function (error) {
            var _error$response3;
            return {
              status: 104,
              statusText: _assertClassBrand(_QQBot_brand, _this8, _errorText).call(_this8, 'Get "access_token" Failed', error === null || error === void 0 || (_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data),
              extraMessage: error
            };
          }));
        case 3:
        case "end":
          return _context39.stop();
      }
    }, _callee39, this);
  }));
  return _getToken5.apply(this, arguments);
}
function _errorText(prefix, data) {
  if (!data || _typeof(data) !== 'object') return prefix;
  var details = [data.code !== undefined ? "code=".concat(data.code) : '', data.err_code !== undefined ? "err_code=".concat(data.err_code) : '', typeof data.message === 'string' ? data.message : ''].filter(Boolean);
  return details.length ? "".concat(prefix, ": ").concat(details.join(', ')) : prefix;
}
var pusherMap = {
  serverchanturbo: ServerChanTurbo,
  serverchan: ServerChanTurbo,
  pushdeer: PushDeer,
  telegrambot: TelegramBot,
  dingtalk: DingTalk,
  wxpusher: WxPusher,
  mail: Mail,
  feishu: FeiShu,
  workweixin: WorkWeixin,
  // qqchannel: QqChannel,
  pushplus: PushPlus,
  showdoc: Showdoc,
  xizhi: Xizhi,
  discord: Discord,
  gocqhttp: GoCqhttp,
  qmsg: Qmsg,
  workweixinbot: WorkWeixinBot,
  chanify: Chanify,
  bark: Bark,
  googlechat: GoogleChat,
  push: Push,
  slack: Slack,
  pushback: Pushback,
  zulip: Zulip,
  rocketchat: RocketChat,
  // gitter: Gitter,
  pushover: Pushover,
  iyuu: Iyuu,
  ntfy: Ntfy,
  notifyx: NotifyX,
  yifengchuanhua: YiFengChuanHua,
  wpush: WPush,
  pushbullet: PushBullet,
  simplepush: SimplePush,
  // anpush: AnPush
  pushme: PushMe,
  qqbot: QQBot
};
var PushApi = /*#__PURE__*/function () {
  function PushApi(configs) {
    _classCallCheck(this, PushApi);
    _defineProperty(this, "pushers", []);
    this.pushers = configs.map(function (_ref32) {
      var name = _ref32.name,
        config = _ref32.config;
      var Pusher = pusherMap[name.toLowerCase()];
      return Pusher ? {
        name: name,
        pusher: new Pusher(config)
      } : null;
    }).filter(function (pusher) {
      return pusher !== null;
    });
  }
  _createClass(PushApi, [{
    key: "send",
    value: function () {
      var _send32 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee33(sendOptions) {
        var _this3 = this;
        var results;
        return _regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return Promise.allSettled(this.pushers.map(/*#__PURE__*/function () {
                var _ref34 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee32(_ref33) {
                  var name, pusher, _sendOptions$find$opt, _sendOptions$find, _sendOptions$find2, options;
                  return _regeneratorRuntime.wrap(function _callee32$(_context32) {
                    while (1) switch (_context32.prev = _context32.next) {
                      case 0:
                        name = _ref33.name, pusher = _ref33.pusher;
                        _context32.prev = 1;
                        options = Array.isArray(sendOptions) ? (_sendOptions$find$opt = (_sendOptions$find = sendOptions.find(function (option) {
                          return option.name === name;
                        })) === null || _sendOptions$find === void 0 ? void 0 : _sendOptions$find.options) !== null && _sendOptions$find$opt !== void 0 ? _sendOptions$find$opt : (_sendOptions$find2 = sendOptions.find(function (option) {
                          return option.name === 'default';
                        })) === null || _sendOptions$find2 === void 0 ? void 0 : _sendOptions$find2.options : sendOptions;
                        if (options) {
                          _context32.next = 5;
                          break;
                        }
                        return _context32.abrupt("return", {
                          name: name,
                          result: {
                            status: 10,
                            statusText: 'Missing Options',
                            extraMessage: sendOptions
                          }
                        });
                      case 5:
                        _context32.t0 = name;
                        _context32.next = 8;
                        return pusher.send(options);
                      case 8:
                        _context32.t1 = _context32.sent;
                        return _context32.abrupt("return", {
                          name: _context32.t0,
                          result: _context32.t1
                        });
                      case 12:
                        _context32.prev = 12;
                        _context32.t2 = _context32["catch"](1);
                        return _context32.abrupt("return", {
                          name: name,
                          result: {
                            status: 11,
                            statusText: 'Unknown Error',
                            extraMessage: _context32.t2 instanceof Error ? _context32.t2.message : String(_context32.t2)
                          }
                        });
                      case 15:
                      case "end":
                        return _context32.stop();
                    }
                  }, _callee32, null, [[1, 12]]);
                }));
                return function (_x33) {
                  return _ref34.apply(this, arguments);
                };
              }()));
            case 2:
              results = _context33.sent;
              return _context33.abrupt("return", results.map(function (result, index) {
                return result.status === 'fulfilled' ? result.value : {
                  name: _this3.pushers[index].name,
                  result: {
                    status: 11,
                    statusText: 'Unknown Error',
                    extraMessage: result.reason
                  }
                };
              }));
            case 4:
            case "end":
              return _context33.stop();
          }
        }, _callee33, this);
      }));
      function send(_x32) {
        return _send32.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return PushApi;
}();
var INTENTS_MAP = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_MESSAGES: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  DIRECT_MESSAGE: 1 << 12,
  GROUP_AND_C2C_EVENT: 1 << 25,
  INTERACTION: 1 << 26,
  MESSAGE_AUDIT: 1 << 27,
  FORUMS_EVENT: 1 << 28,
  AUDIO_ACTION: 1 << 29,
  PUBLIC_GUILD_MESSAGES: 1 << 30
};
var OPCODES = {
  0: 'Dispatch',
  1: 'Heartbeat',
  2: 'Identify',
  6: 'Resume',
  7: 'Reconnect',
  9: 'InvalidSession',
  10: 'Hello',
  11: 'HeartbeatACK',
  12: 'HTTPCallbackACK',
  13: 'CallbackVerify'
};
var _QQBotEvent_brand = /*#__PURE__*/new WeakSet();
var QQBotEvent = /*#__PURE__*/function () {
  function QQBotEvent(config) {
    var _config$intents, _config$shard, _config$proxy;
    _classCallCheck(this, QQBotEvent);
    _classPrivateMethodInitSpec(this, _QQBotEvent_brand);
    _defineProperty(this, "appId", void 0);
    _defineProperty(this, "appSecret", void 0);
    _defineProperty(this, "intents", void 0);
    _defineProperty(this, "shard", void 0);
    _defineProperty(this, "baseUrl", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "token", void 0);
    _defineProperty(this, "tokenExpireAt", 0);
    _defineProperty(this, "ws", void 0);
    _defineProperty(this, "sessionId", void 0);
    _defineProperty(this, "lastSeq", null);
    // eslint-disable-next-line no-undef
    _defineProperty(this, "heartbeatInterval", void 0);
    _defineProperty(this, "heartbeatMs", 45000);
    _defineProperty(this, "stopped", true);
    _defineProperty(this, "generation", 0);
    // eslint-disable-next-line no-undef
    _defineProperty(this, "reconnectTimer", void 0);
    if (!config.appId) throw new Error('Missing Parameter: appId');
    if (!config.appSecret) throw new Error('Missing Parameter: appSecret');
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.intents = (_config$intents = config.intents) !== null && _config$intents !== void 0 ? _config$intents : 0;
    this.shard = (_config$shard = config.shard) !== null && _config$shard !== void 0 ? _config$shard : [0, 1];
    this.baseUrl = config.baseUrl || 'https://api.sgroup.qq.com';
    if ((_config$proxy = config.proxy) !== null && _config$proxy !== void 0 && _config$proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(config.proxy);
    }
  }
  _createClass(QQBotEvent, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee34() {
        var generation, wssUrl;
        return _regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) switch (_context34.prev = _context34.next) {
            case 0:
              if (this.stopped) {
                _context34.next = 2;
                break;
              }
              return _context34.abrupt("return");
            case 2:
              this.stopped = false;
              generation = this.generation;
              _context34.prev = 4;
              _context34.next = 7;
              return _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
            case 7:
              wssUrl = _context34.sent;
              if (!(this.stopped || generation !== this.generation)) {
                _context34.next = 10;
                break;
              }
              return _context34.abrupt("return");
            case 10:
              _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', "Gateway URL: ".concat(wssUrl));
              _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
              _context34.next = 20;
              break;
            case 14:
              _context34.prev = 14;
              _context34.t0 = _context34["catch"](4);
              if (!(generation !== this.generation)) {
                _context34.next = 18;
                break;
              }
              return _context34.abrupt("return");
            case 18:
              this.stopped = true;
              throw _context34.t0;
            case 20:
            case "end":
              return _context34.stop();
          }
        }, _callee34, this, [[4, 14]]);
      }));
      function start() {
        return _start.apply(this, arguments);
      }
      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Stopping...');
      this.stopped = true;
      this.generation++;
      if (this.reconnectTimer !== undefined) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = undefined;
      }
      _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
      var ws = this.ws;
      this.ws = undefined;
      ws === null || ws === void 0 || ws.close(1000);
    }
  }], [{
    key: "parseIntents",
    value: function parseIntents(keys) {
      return keys.reduce(function (acc, key) {
        var bit = INTENTS_MAP[key];
        if (!bit) {
          console.error("Warning: unknown intent \"".concat(key, "\", skipped"));
          return acc;
        }
        return acc | bit;
      }, 0);
    }
  }, {
    key: "listIntents",
    value: function listIntents() {
      console.log('Available intents:');
      Object.entries(INTENTS_MAP).forEach(function (_ref35) {
        var _ref36 = _slicedToArray(_ref35, 2),
          name = _ref36[0],
          bit = _ref36[1];
        console.log("  ".concat(name, " (1 << ").concat(Math.log2(bit), ")"));
      });
    }
  }]);
  return QQBotEvent;
}();
/* eslint-disable max-len */
function _getToken3() {
  return _getToken6.apply(this, arguments);
}
function _getToken6() {
  _getToken6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee40() {
    var _response$data2;
    var response, accessToken, expiresIn;
    return _regeneratorRuntime.wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return axios({
            url: 'https://bots.qq.com/app/getAppAccessToken',
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            data: {
              appId: this.appId,
              clientSecret: this.appSecret
            },
            httpsAgent: this.httpsAgent
          });
        case 2:
          response = _context40.sent;
          accessToken = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.access_token;
          if (accessToken) {
            _context40.next = 6;
            break;
          }
          throw new Error("Get token failed: ".concat(JSON.stringify(response.data)));
        case 6:
          expiresIn = Number(response.data.expires_in) || 7200;
          this.tokenExpireAt = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
          return _context40.abrupt("return", accessToken);
        case 9:
        case "end":
          return _context40.stop();
      }
    }, _callee40, this);
  }));
  return _getToken6.apply(this, arguments);
}
function _ensureToken() {
  return _ensureToken2.apply(this, arguments);
}
function _ensureToken2() {
  _ensureToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee41() {
    return _regeneratorRuntime.wrap(function _callee41$(_context41) {
      while (1) switch (_context41.prev = _context41.next) {
        case 0:
          if (!(!this.token || Date.now() >= this.tokenExpireAt)) {
            _context41.next = 5;
            break;
          }
          _context41.next = 3;
          return _assertClassBrand(_QQBotEvent_brand, this, _getToken3).call(this);
        case 3:
          this.token = _context41.sent;
          _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Access token obtained');
        case 5:
        case "end":
          return _context41.stop();
      }
    }, _callee41, this);
  }));
  return _ensureToken2.apply(this, arguments);
}
function _getGatewayUrl() {
  return _getGatewayUrl2.apply(this, arguments);
}
function _getGatewayUrl2() {
  _getGatewayUrl2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee42() {
    var _response$data3;
    var response, url;
    return _regeneratorRuntime.wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          _context42.next = 2;
          return _assertClassBrand(_QQBotEvent_brand, this, _ensureToken).call(this);
        case 2:
          _context42.next = 4;
          return axios({
            url: "".concat(this.baseUrl, "/gateway"),
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: "QQBot ".concat(this.token)
            },
            httpsAgent: this.httpsAgent
          });
        case 4:
          response = _context42.sent;
          url = (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.url;
          if (url) {
            _context42.next = 8;
            break;
          }
          throw new Error("Get gateway failed: ".concat(JSON.stringify(response.data)));
        case 8:
          return _context42.abrupt("return", url);
        case 9:
        case "end":
          return _context42.stop();
      }
    }, _callee42, this);
  }));
  return _getGatewayUrl2.apply(this, arguments);
}
function _connect(url) {
  var _this4 = this;
  var ws = new WebSocket(url);
  this.ws = ws;
  ws.on('open', function () {
    if (_this4.ws !== ws || _this4.stopped) return;
    _assertClassBrand(_QQBotEvent_brand, _this4, _log).call(_this4, 'info', 'WebSocket connected');
  });
  ws.on('message', function (data) {
    if (_this4.ws !== ws || _this4.stopped) return;
    try {
      var payload = JSON.parse(data.toString());
      _assertClassBrand(_QQBotEvent_brand, _this4, _handlePayload).call(_this4, payload);
    } catch (_unused) {
      _assertClassBrand(_QQBotEvent_brand, _this4, _log).call(_this4, 'error', "Failed to parse message: ".concat(data.toString().slice(0, 200)));
    }
  });
  ws.on('close', function (code, reason) {
    if (_this4.ws !== ws) return;
    _this4.ws = undefined;
    _assertClassBrand(_QQBotEvent_brand, _this4, _log).call(_this4, 'info', "WebSocket closed: code=".concat(code, ", reason=").concat(reason.toString()));
    _assertClassBrand(_QQBotEvent_brand, _this4, _clearHeartbeat).call(_this4);
    _assertClassBrand(_QQBotEvent_brand, _this4, _tryReconnect).call(_this4);
  });
  ws.on('error', function (err) {
    if (_this4.ws !== ws || _this4.stopped) return;
    _assertClassBrand(_QQBotEvent_brand, _this4, _log).call(_this4, 'error', "WebSocket error: ".concat(err.message));
  });
}
function _handlePayload(payload) {
  var op = payload.op,
    d = payload.d,
    s = payload.s,
    t = payload.t,
    id = payload.id;
  var opName = OPCODES[op] || "Unknown(".concat(op, ")");
  if (typeof s === 'number' && Number.isFinite(s)) {
    this.lastSeq = s;
  }
  switch (op) {
    case 10:
      // Hello
      _assertClassBrand(_QQBotEvent_brand, this, _handleHello).call(this, d);
      break;
    case 11:
      // HeartbeatACK
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'debug', 'Heartbeat ACK');
      break;
    case 0:
      // Dispatch
      _assertClassBrand(_QQBotEvent_brand, this, _handleDispatch).call(this, t, d, id);
      break;
    case 7:
      // Reconnect
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'warn', 'Server requested reconnect');
      _assertClassBrand(_QQBotEvent_brand, this, _reconnect).call(this);
      break;
    case 9:
      // InvalidSession
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'warn', 'Invalid session, re-identifying...');
      this.sessionId = undefined;
      _assertClassBrand(_QQBotEvent_brand, this, _identify).call(this);
      break;
    default:
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'debug', "OpCode ".concat(opName, ": ").concat(JSON.stringify(d)));
  }
}
function _handleHello(d) {
  this.heartbeatMs = (d === null || d === void 0 ? void 0 : d.heartbeat_interval) || 45000;
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', "Hello received, heartbeat interval: ".concat(this.heartbeatMs, "ms"));
  if (this.sessionId && this.lastSeq !== null) {
    _assertClassBrand(_QQBotEvent_brand, this, _resume).call(this);
  } else {
    _assertClassBrand(_QQBotEvent_brand, this, _identify).call(this);
  }
  _assertClassBrand(_QQBotEvent_brand, this, _startHeartbeat).call(this);
}
function _handleDispatch(t, d, id) {
  var time = new Date().toISOString();
  if (t === 'READY') {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', '===== READY =====');
    this.sessionId = d === null || d === void 0 ? void 0 : d.session_id;
    console.log(JSON.stringify({
      time: time,
      type: t,
      data: d
    }, null, 2));
    return;
  }
  if (t === 'RESUMED') {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', '===== RESUMED =====');
    console.log(JSON.stringify({
      time: time,
      type: t,
      data: d
    }, null, 2));
    return;
  }
  console.log(JSON.stringify({
    time: time,
    type: t,
    eventId: id,
    data: d
  }, null, 2));
}
function _identify() {
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  var payload = {
    op: 2,
    d: {
      token: "QQBot ".concat(this.token),
      intents: this.intents,
      shard: this.shard,
      properties: {
        $os: process.platform,
        $browser: 'all-pusher-api',
        $device: 'all-pusher-api'
      }
    }
  };
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', "Identifying with intents=".concat(this.intents, ", shard=[").concat(this.shard, "]"));
  this.ws.send(JSON.stringify(payload));
}
function _resume() {
  var _this$lastSeq;
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  var payload = {
    op: 6,
    d: {
      token: "QQBot ".concat(this.token),
      session_id: this.sessionId,
      seq: (_this$lastSeq = this.lastSeq) !== null && _this$lastSeq !== void 0 ? _this$lastSeq : 0
    }
  };
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', "Resuming session=".concat(this.sessionId, ", seq=").concat(this.lastSeq));
  this.ws.send(JSON.stringify(payload));
}
function _sendHeartbeat() {
  var _this$lastSeq2;
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  this.ws.send(JSON.stringify({
    op: 1,
    d: (_this$lastSeq2 = this.lastSeq) !== null && _this$lastSeq2 !== void 0 ? _this$lastSeq2 : null
  }));
}
function _startHeartbeat() {
  var _this5 = this;
  _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
  this.heartbeatInterval = setInterval(function () {
    _assertClassBrand(_QQBotEvent_brand, _this5, _sendHeartbeat).call(_this5);
  }, this.heartbeatMs);
}
function _clearHeartbeat() {
  if (this.heartbeatInterval) {
    clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = undefined;
  }
}
function _reconnect() {
  _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
  var ws = this.ws;
  this.ws = undefined;
  ws === null || ws === void 0 || ws.close(1000);
  _assertClassBrand(_QQBotEvent_brand, this, _tryReconnect).call(this, 1000);
}
function _tryReconnect() {
  var _this6 = this;
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
  if (this.stopped || this.ws || this.reconnectTimer !== undefined) return;
  var generation = this.generation;
  this.reconnectTimer = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee37() {
    var wssUrl;
    return _regeneratorRuntime.wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          if (!(_this6.stopped || generation !== _this6.generation)) {
            _context37.next = 2;
            break;
          }
          return _context37.abrupt("return");
        case 2:
          _context37.prev = 2;
          _context37.next = 5;
          return _assertClassBrand(_QQBotEvent_brand, _this6, _getGatewayUrl).call(_this6);
        case 5:
          wssUrl = _context37.sent;
          if (!(_this6.stopped || generation !== _this6.generation)) {
            _context37.next = 8;
            break;
          }
          return _context37.abrupt("return");
        case 8:
          _this6.reconnectTimer = undefined;
          _assertClassBrand(_QQBotEvent_brand, _this6, _connect).call(_this6, wssUrl);
          _context37.next = 19;
          break;
        case 12:
          _context37.prev = 12;
          _context37.t0 = _context37["catch"](2);
          if (!(_this6.stopped || generation !== _this6.generation)) {
            _context37.next = 16;
            break;
          }
          return _context37.abrupt("return");
        case 16:
          _this6.reconnectTimer = undefined;
          _assertClassBrand(_QQBotEvent_brand, _this6, _log).call(_this6, 'error', "Reconnect failed: ".concat(_context37.t0.message));
          _assertClassBrand(_QQBotEvent_brand, _this6, _tryReconnect).call(_this6);
        case 19:
        case "end":
          return _context37.stop();
      }
    }, _callee37, null, [[2, 12]]);
  })), delay);
}
function _log(level, msg) {
  console.error("[QQBotEvent][".concat(level.toUpperCase(), "] ").concat(msg));
}
commander.program.name('allpush').version('1.5.0').description('多平台推送通知 CLI 工具，基于 all-pusher-api');
commander.program.command('send').description('向配置的推送平台发送消息').option('-c, --config <config>', 'JSON 配置字符串，需对引号进行转义。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js').option('-f, --config-file <path>', 'JSON 配置文件路径。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js').requiredOption('-m, --message <text>', '要发送的消息内容').option('-t, --title <text>', '消息标题').action(/*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee35(options) {
    var config, configPath, raw, pusher, results;
    return _regeneratorRuntime.wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          if (!options.config && !options.configFile) {
            console.error('错误：必须提供 --config 或 --config-file 参数！');
            process.exit(1);
          }
          if (options.config && options.configFile) {
            console.warn('警告：同时提供了 --config 和 --config-file，后者将被忽略！');
          }
          if (options.config) {
            config = JSON.parse(options.config);
          } else if (options.configFile) {
            configPath = path__namespace.resolve(process.cwd(), options.configFile);
            raw = fs__namespace.readFileSync(configPath, 'utf8');
            config = JSON.parse(raw);
          }
          if (!Array.isArray(config)) {
            config = [config];
          }
          pusher = new PushApi(config);
          _context35.next = 8;
          return pusher.send({
            message: options.message,
            title: options.title
          });
        case 8:
          results = _context35.sent;
          console.log('\n推送结果:');
          results.forEach(function (_ref38) {
            var name = _ref38.name,
              result = _ref38.result;
            var status = result.status >= 200 && result.status < 300 ? '成功' : '失败';
            console.log("\u2022 ".concat(name, ": ").concat(status, " (").concat(result.status, ")"));
            if (result.statusText) {
              console.log("  \u8BE6\u60C5: ".concat(result.statusText));
            }
            if (status === '失败') {
              console.dir(result, {
                depth: null
              });
            }
          });
          _context35.next = 18;
          break;
        case 13:
          _context35.prev = 13;
          _context35.t0 = _context35["catch"](0);
          console.error('发生错误:', _context35.t0.message);
          console.error('错误详情:', _context35.t0.stack);
          process.exit(1);
        case 18:
        case "end":
          return _context35.stop();
      }
    }, _callee35, null, [[0, 13]]);
  }));
  return function (_x34) {
    return _ref37.apply(this, arguments);
  };
}());
commander.program.command('listen').description('通过 WebSocket 订阅并监听 QQ 机器人事件，接收到事件时输出到控制台').option('--app-id <id>', 'QQ 机器人 AppID').option('--app-secret <secret>', 'QQ 机器人 AppSecret').option('--intents <intents>', '订阅事件类型，逗号分隔', 'GUILDS,GUILD_MEMBERS,GUILD_MESSAGES,GUILD_MESSAGE_REACTIONS,DIRECT_MESSAGE,GROUP_AND_C2C_EVENT,INTERACTION,MESSAGE_AUDIT,FORUMS_EVENT,AUDIO_ACTION,PUBLIC_GUILD_MESSAGES').option('--shard <shard>', '分片参数，格式: index,total (如 0,1)', '0,1').option('--list-intents', '列出所有可用的 Intents 事件类型').action(/*#__PURE__*/function () {
  var _ref39 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee36(options) {
    var intentKeys, intents, shardParts, shard, event;
    return _regeneratorRuntime.wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          if (options.listIntents) {
            QQBotEvent.listIntents();
            process.exit(0);
          }
          if (!options.appId) {
            console.error('错误：必须提供 --app-id 参数！');
            process.exit(1);
          }
          if (!options.appSecret) {
            console.error('错误：必须提供 --app-secret 参数！');
            process.exit(1);
          }
          intentKeys = options.intents.split(',').map(function (s) {
            return s.trim();
          }).filter(Boolean);
          intents = QQBotEvent.parseIntents(intentKeys);
          shardParts = options.shard.split(',').map(Number);
          if (shardParts.length !== 2 || shardParts.some(isNaN)) {
            console.error('错误：--shard 格式必须为 "index,total"，如 "0,1"');
            process.exit(1);
          }
          shard = [shardParts[0], shardParts[1]];
          console.error("\u542F\u52A8 QQ \u673A\u5668\u4EBA\u4E8B\u4EF6\u76D1\u542C: intents=".concat(intentKeys.join(','), "(").concat(intents, "), shard=[").concat(shard, "]"));
          event = new QQBotEvent({
            appId: options.appId,
            appSecret: options.appSecret,
            intents: intents,
            shard: shard
          });
          process.on('SIGINT', function () {
            console.error('\n收到中断信号，正在关闭...');
            event.stop();
            process.exit(0);
          });
          process.on('SIGTERM', function () {
            console.error('收到终止信号，正在关闭...');
            event.stop();
            process.exit(0);
          });
          _context36.next = 15;
          return event.start();
        case 15:
          _context36.next = 21;
          break;
        case 17:
          _context36.prev = 17;
          _context36.t0 = _context36["catch"](0);
          console.error('发生错误:', _context36.t0.message);
          process.exit(1);
        case 21:
        case "end":
          return _context36.stop();
      }
    }, _callee36, null, [[0, 17]]);
  }));
  return function (_x35) {
    return _ref39.apply(this, arguments);
  };
}());
commander.program.parse(process.argv);
