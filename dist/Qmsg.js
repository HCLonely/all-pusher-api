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
var Qmsg = /*#__PURE__*/function () {
  function Qmsg(_ref) {
    var token = _ref.token,
      group = _ref.group,
      key = _ref.key,
      proxy = _ref.proxy;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var qmsgOptions, axiosOptions;
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
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", {
                status: 0,
                statusText: 'Missing Parameter: msg',
                extraMessage: null
              });
            case 6:
              if (!(qmsgOptions.msg.length > 1000)) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", {
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
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
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
  return Qmsg;
}();
exports.Qmsg = Qmsg;
