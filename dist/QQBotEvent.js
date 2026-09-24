'use strict';

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");
var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var WebSocket = require('ws');
var tool = require('./tool');
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
      var _start = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var generation, wssUrl;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (this.stopped) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              this.stopped = false;
              generation = this.generation;
              _context.prev = 4;
              _context.next = 7;
              return _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
            case 7:
              wssUrl = _context.sent;
              if (!(this.stopped || generation !== this.generation)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return");
            case 10:
              _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', "Gateway URL: ".concat(wssUrl));
              _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
              _context.next = 20;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](4);
              if (!(generation !== this.generation)) {
                _context.next = 18;
                break;
              }
              return _context.abrupt("return");
            case 18:
              this.stopped = true;
              throw _context.t0;
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[4, 14]]);
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
      Object.entries(INTENTS_MAP).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          bit = _ref2[1];
        console.log("  ".concat(name, " (1 << ").concat(Math.log2(bit), ")"));
      });
    }
  }]);
  return QQBotEvent;
}();
function _getToken() {
  return _getToken2.apply(this, arguments);
}
function _getToken2() {
  _getToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var _response$data;
    var response, accessToken, expiresIn;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
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
          response = _context3.sent;
          accessToken = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.access_token;
          if (accessToken) {
            _context3.next = 6;
            break;
          }
          throw new Error("Get token failed: ".concat(JSON.stringify(response.data)));
        case 6:
          expiresIn = Number(response.data.expires_in) || 7200;
          this.tokenExpireAt = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
          return _context3.abrupt("return", accessToken);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return _getToken2.apply(this, arguments);
}
function _ensureToken() {
  return _ensureToken2.apply(this, arguments);
}
function _ensureToken2() {
  _ensureToken2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!this.token || Date.now() >= this.tokenExpireAt)) {
            _context4.next = 5;
            break;
          }
          _context4.next = 3;
          return _assertClassBrand(_QQBotEvent_brand, this, _getToken).call(this);
        case 3:
          this.token = _context4.sent;
          _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Access token obtained');
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));
  return _ensureToken2.apply(this, arguments);
}
function _getGatewayUrl() {
  return _getGatewayUrl2.apply(this, arguments);
}
function _getGatewayUrl2() {
  _getGatewayUrl2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
    var _response$data2;
    var response, url;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _assertClassBrand(_QQBotEvent_brand, this, _ensureToken).call(this);
        case 2:
          _context5.next = 4;
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
          response = _context5.sent;
          url = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.url;
          if (url) {
            _context5.next = 8;
            break;
          }
          throw new Error("Get gateway failed: ".concat(JSON.stringify(response.data)));
        case 8:
          return _context5.abrupt("return", url);
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5, this);
  }));
  return _getGatewayUrl2.apply(this, arguments);
}
function _connect(url) {
  var _this = this;
  var ws = new WebSocket(url);
  this.ws = ws;
  ws.on('open', function () {
    if (_this.ws !== ws || _this.stopped) return;
    _assertClassBrand(_QQBotEvent_brand, _this, _log).call(_this, 'info', 'WebSocket connected');
  });
  ws.on('message', function (data) {
    if (_this.ws !== ws || _this.stopped) return;
    try {
      var payload = JSON.parse(data.toString());
      _assertClassBrand(_QQBotEvent_brand, _this, _handlePayload).call(_this, payload);
    } catch (_unused) {
      _assertClassBrand(_QQBotEvent_brand, _this, _log).call(_this, 'error', "Failed to parse message: ".concat(data.toString().slice(0, 200)));
    }
  });
  ws.on('close', function (code, reason) {
    if (_this.ws !== ws) return;
    _this.ws = undefined;
    _assertClassBrand(_QQBotEvent_brand, _this, _log).call(_this, 'info', "WebSocket closed: code=".concat(code, ", reason=").concat(reason.toString()));
    _assertClassBrand(_QQBotEvent_brand, _this, _clearHeartbeat).call(_this);
    _assertClassBrand(_QQBotEvent_brand, _this, _tryReconnect).call(_this);
  });
  ws.on('error', function (err) {
    if (_this.ws !== ws || _this.stopped) return;
    _assertClassBrand(_QQBotEvent_brand, _this, _log).call(_this, 'error', "WebSocket error: ".concat(err.message));
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
  var _this2 = this;
  _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
  this.heartbeatInterval = setInterval(function () {
    _assertClassBrand(_QQBotEvent_brand, _this2, _sendHeartbeat).call(_this2);
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
  var _this3 = this;
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
  if (this.stopped || this.ws || this.reconnectTimer !== undefined) return;
  var generation = this.generation;
  this.reconnectTimer = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var wssUrl;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(_this3.stopped || generation !== _this3.generation)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return");
        case 2:
          _context2.prev = 2;
          _context2.next = 5;
          return _assertClassBrand(_QQBotEvent_brand, _this3, _getGatewayUrl).call(_this3);
        case 5:
          wssUrl = _context2.sent;
          if (!(_this3.stopped || generation !== _this3.generation)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return");
        case 8:
          _this3.reconnectTimer = undefined;
          _assertClassBrand(_QQBotEvent_brand, _this3, _connect).call(_this3, wssUrl);
          _context2.next = 19;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          if (!(_this3.stopped || generation !== _this3.generation)) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return");
        case 16:
          _this3.reconnectTimer = undefined;
          _assertClassBrand(_QQBotEvent_brand, _this3, _log).call(_this3, 'error', "Reconnect failed: ".concat(_context2.t0.message));
          _assertClassBrand(_QQBotEvent_brand, _this3, _tryReconnect).call(_this3);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 12]]);
  })), delay);
}
function _log(level, msg) {
  console.error("[QQBotEvent][".concat(level.toUpperCase(), "] ").concat(msg));
}
exports.INTENTS_MAP = INTENTS_MAP;
exports.QQBotEvent = QQBotEvent;
