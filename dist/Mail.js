'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var nodemailer = require('nodemailer');
var marked = require('marked');
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
var Mail = /*#__PURE__*/function () {
  function Mail(_ref) {
    var key = _ref.key,
      options = _ref.options,
      proxy = _ref.proxy;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(sendOptions) {
        var mailOptions, transporter;
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
              return _context.abrupt("return", transporter.sendMail(mailOptions).then(function (response) {
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
  return Mail;
}();
exports.Mail = Mail;
