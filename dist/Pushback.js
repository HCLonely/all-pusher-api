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
var Pushback = /*#__PURE__*/function () {
  function Pushback(_ref) {
    var token = _ref.token,
      userId = _ref.userId,
      key = _ref.key,
      proxy = _ref.proxy;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var pushbackOptions, axiosOptions;
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
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
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
  return Pushback;
}();
exports.Pushback = Pushback;
