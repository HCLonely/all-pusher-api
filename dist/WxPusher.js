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
var marked = require('marked');
var WxPusher = /*#__PURE__*/function () {
  function WxPusher(_ref) {
    var token = _ref.token,
      uids = _ref.uids,
      topicIds = _ref.topicIds,
      key = _ref.key,
      proxy = _ref.proxy;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var wxPusherOptions, axiosOptions;
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
              return _context.abrupt("return", axios(axiosOptions).then(function (response) {
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
  return WxPusher;
}();
exports.WxPusher = WxPusher;
