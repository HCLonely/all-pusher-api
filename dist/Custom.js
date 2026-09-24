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
var Custom = /*#__PURE__*/function () {
  function Custom(_ref) {
    var url = _ref.url,
      method = _ref.method,
      contentType = _ref.contentType,
      headers = _ref.headers,
      success = _ref.success,
      key = _ref.key,
      proxy = _ref.proxy;
    _classCallCheck(this, Custom);
    _defineProperty(this, "_URL", void 0);
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "method", 'POST');
    _defineProperty(this, "contentType", 'application/json');
    _defineProperty(this, "_HEADERS", void 0);
    _defineProperty(this, "success", void 0);
    var $key = _objectSpread({
      url: url,
      method: method,
      contentType: contentType,
      headers: headers,
      success: success
    }, key);
    if (!$key.url) {
      throw new Error('Missing Parameter: url');
    }
    if (!$key.success) {
      throw new Error('Missing Parameter: success');
    }
    this._URL = $key.url;
    this.success = $key.success;
    if ($key.method) {
      this.method = $key.method;
    }
    if ($key.contentType) {
      this.contentType = $key.contentType;
    }
    if ($key.headers) {
      this._HEADERS = $key.headers;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
    }
  }
  _createClass(Custom, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var _axiosOptions$method,
          _axiosOptions$method2,
          _this = this;
        var axiosOptions;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              axiosOptions = {
                url: this._URL,
                method: this.method,
                headers: {
                  'Content-type': 'application/json'
                },
                data: sendOptions.extraMessage || sendOptions
              };
              if (this._HEADERS) {
                axiosOptions.headers = this._HEADERS;
              }
              if (this.contentType) {
                axiosOptions.headers['Content-type'] = this.contentType;
              }
              if (this.httpsAgent) {
                axiosOptions.httpsAgent = this.httpsAgent;
              }
              if (((_axiosOptions$method = axiosOptions.method) === null || _axiosOptions$method === void 0 ? void 0 : _axiosOptions$method.toUpperCase()) === 'POST' && axiosOptions.headers['Content-type'] === 'application/x-www-form-urlencoded') {
                axiosOptions.data = tool.queryStringify(sendOptions);
              }
              if (((_axiosOptions$method2 = axiosOptions.method) === null || _axiosOptions$method2 === void 0 ? void 0 : _axiosOptions$method2.toUpperCase()) === 'GET') {
                axiosOptions.data = null;
                axiosOptions.params = sendOptions;
              }
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
                if (response.data) {
                  var variate = response.data;
                  _this.success.key.split('.').forEach(function (key, index) {
                    var _variate;
                    if (index === 0) {
                      return;
                    }
                    variate = (_variate = variate) === null || _variate === void 0 ? void 0 : _variate[key];
                  });
                  if (variate === _this.success.value) {
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
  return Custom;
}();
exports.Custom = Custom;
