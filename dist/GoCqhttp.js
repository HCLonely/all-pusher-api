'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var axios = require('axios');
var tool = require('./tool');
var GoCqhttp = /*#__PURE__*/function () {
  function GoCqhttp(_ref) {
    var baseUrl = _ref.baseUrl,
      token = _ref.token,
      user_id = _ref.user_id,
      group_id = _ref.group_id,
      guild_id = _ref.guild_id,
      channel_id = _ref.channel_id,
      key = _ref.key,
      proxy = _ref.proxy;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var goCqhttpOptions, axiosOptions;
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
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", {
                status: 103,
                statusText: 'Options Format Error: Both "channel_id" & "guild_id" must exist',
                extraMessage: goCqhttpOptions
              });
            case 6:
              if (!([goCqhttpOptions.user_id, goCqhttpOptions.group_id, goCqhttpOptions.channel_id].filter(function (e) {
                return e;
              }).length > 1)) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", {
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
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
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
  return GoCqhttp;
}();
exports.GoCqhttp = GoCqhttp;
