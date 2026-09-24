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
var WorkWeixinBot = /*#__PURE__*/function () {
  function WorkWeixinBot(_ref) {
    var webhook = _ref.webhook,
      key = _ref.key,
      proxy = _ref.proxy;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var workWeixinOptions, axiosOptions;
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
              workWeixinOptions = sendOptions.customOptions;
              _context.next = 15;
              break;
            case 6:
              if (!(!sendOptions.type || sendOptions.type === 'text')) {
                _context.next = 10;
                break;
              }
              workWeixinOptions = {
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
              workWeixinOptions = {
                msgtype: 'markdown',
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
  return WorkWeixinBot;
}();
exports.WorkWeixinBot = WorkWeixinBot;
