'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var ServerChanTurbo = require('./ServerChanTurbo');
var PushDeer = require('./PushDeer');
var TelegramBot = require('./TelegramBot');
var DingTalk = require('./DingTalk');
var WxPusher = require('./WxPusher');
var Mail = require('./Mail');
var FeiShu = require('./FeiShu');
var WorkWeixin = require('./WorkWeixin');
var PushPlus = require('./PushPlus');
var Showdoc = require('./Showdoc');
var Xizhi = require('./Xizhi');
var Discord = require('./Discord');
var GoCqhttp = require('./GoCqhttp');
var Qmsg = require('./Qmsg');
var WorkWeixinBot = require('./WorkWeixinBot');
var Chanify = require('./Chanify');
var Bark = require('./Bark');
var GoogleChat = require('./GoogleChat');
var Push = require('./Push');
var Slack = require('./Slack');
var Pushback = require('./Pushback');
var Zulip = require('./Zulip');
var RocketChat = require('./RocketChat');
var Pushover = require('./Pushover');
var Iyuu = require('./Iyuu');
var Ntfy = require('./Ntfy');
var NotifyX = require('./NotifyX');
var YiFengChuanHua = require('./YiFengChuanHua');
var WPush = require('./WPush');
var PushBullet = require('./PushBullet');
var SimplePush = require('./SimplePush');
var PushMe = require('./PushMe');
var QQBot = require('./QQBot');
var pusherMap = {
  serverchanturbo: ServerChanTurbo.ServerChanTurbo,
  serverchan: ServerChanTurbo.ServerChanTurbo,
  pushdeer: PushDeer.PushDeer,
  telegrambot: TelegramBot.TelegramBot,
  dingtalk: DingTalk.DingTalk,
  wxpusher: WxPusher.WxPusher,
  mail: Mail.Mail,
  feishu: FeiShu.FeiShu,
  workweixin: WorkWeixin.WorkWeixin,
  // qqchannel: QqChannel,
  pushplus: PushPlus.PushPlus,
  showdoc: Showdoc.Showdoc,
  xizhi: Xizhi.Xizhi,
  discord: Discord.Discord,
  gocqhttp: GoCqhttp.GoCqhttp,
  qmsg: Qmsg.Qmsg,
  workweixinbot: WorkWeixinBot.WorkWeixinBot,
  chanify: Chanify.Chanify,
  bark: Bark.Bark,
  googlechat: GoogleChat.GoogleChat,
  push: Push.Push,
  slack: Slack.Slack,
  pushback: Pushback.Pushback,
  zulip: Zulip.Zulip,
  rocketchat: RocketChat.RocketChat,
  // gitter: Gitter,
  pushover: Pushover.Pushover,
  iyuu: Iyuu.Iyuu,
  ntfy: Ntfy.Ntfy,
  notifyx: NotifyX.NotifyX,
  yifengchuanhua: YiFengChuanHua.YiFengChuanHua,
  wpush: WPush.WPush,
  pushbullet: PushBullet.PushBullet,
  simplepush: SimplePush.SimplePush,
  // anpush: AnPush
  pushme: PushMe.PushMe,
  qqbot: QQBot.QQBot
};
var PushApi = /*#__PURE__*/function () {
  function PushApi(configs) {
    _classCallCheck(this, PushApi);
    _defineProperty(this, "pushers", []);
    this.pushers = configs.map(function (_ref) {
      var name = _ref.name,
        config = _ref.config;
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(sendOptions) {
        var _this = this;
        var results;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.allSettled(this.pushers.map(/*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
                  var name, pusher, _sendOptions$find$opt, _sendOptions$find, _sendOptions$find2, options;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        name = _ref2.name, pusher = _ref2.pusher;
                        _context.prev = 1;
                        options = Array.isArray(sendOptions) ? (_sendOptions$find$opt = (_sendOptions$find = sendOptions.find(function (option) {
                          return option.name === name;
                        })) === null || _sendOptions$find === void 0 ? void 0 : _sendOptions$find.options) !== null && _sendOptions$find$opt !== void 0 ? _sendOptions$find$opt : (_sendOptions$find2 = sendOptions.find(function (option) {
                          return option.name === 'default';
                        })) === null || _sendOptions$find2 === void 0 ? void 0 : _sendOptions$find2.options : sendOptions;
                        if (options) {
                          _context.next = 5;
                          break;
                        }
                        return _context.abrupt("return", {
                          name: name,
                          result: {
                            status: 10,
                            statusText: 'Missing Options',
                            extraMessage: sendOptions
                          }
                        });
                      case 5:
                        _context.t0 = name;
                        _context.next = 8;
                        return pusher.send(options);
                      case 8:
                        _context.t1 = _context.sent;
                        return _context.abrupt("return", {
                          name: _context.t0,
                          result: _context.t1
                        });
                      case 12:
                        _context.prev = 12;
                        _context.t2 = _context["catch"](1);
                        return _context.abrupt("return", {
                          name: name,
                          result: {
                            status: 11,
                            statusText: 'Unknown Error',
                            extraMessage: _context.t2 instanceof Error ? _context.t2.message : String(_context.t2)
                          }
                        });
                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee, null, [[1, 12]]);
                }));
                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 2:
              results = _context2.sent;
              return _context2.abrupt("return", results.map(function (result, index) {
                return result.status === 'fulfilled' ? result.value : {
                  name: _this.pushers[index].name,
                  result: {
                    status: 11,
                    statusText: 'Unknown Error',
                    extraMessage: result.reason
                  }
                };
              }));
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function send(_x) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }]);
  return PushApi;
}();
exports.PushApi = PushApi;
