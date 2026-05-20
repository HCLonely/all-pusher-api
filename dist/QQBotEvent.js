'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var axios = require('axios');
var WebSocket = require('ws');
var tool = require('./tool');
const INTENTS_MAP = {
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
const OPCODES = {
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
class QQBotEvent {
  constructor(config) {
    var _config$intents, _config$shard, _config$proxy;
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
  async start() {
    await _assertClassBrand(_QQBotEvent_brand, this, _ensureToken).call(this);
    const wssUrl = await _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Gateway URL: ${wssUrl}`);
    _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
  }
  stop() {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Stopping...');
    _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
    if (this.ws) {
      this.ws.close(1000);
      this.ws = undefined;
    }
  }
  static parseIntents(keys) {
    return keys.reduce((acc, key) => {
      const bit = INTENTS_MAP[key];
      if (!bit) {
        console.error(`Warning: unknown intent "${key}", skipped`);
        return acc;
      }
      return acc | bit;
    }, 0);
  }
  static listIntents() {
    console.log('Available intents:');
    Object.entries(INTENTS_MAP).forEach(([name, bit]) => {
      console.log(`  ${name} (1 << ${Math.log2(bit)})`);
    });
  }
}
async function _getToken() {
  var _response$data;
  const response = await axios({
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
  const accessToken = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.access_token;
  if (!accessToken) throw new Error(`Get token failed: ${JSON.stringify(response.data)}`);
  const expiresIn = Number(response.data.expires_in) || 7200;
  this.tokenExpireAt = Date.now() + Math.max(expiresIn - 60, 1) * 1000;
  return accessToken;
}
async function _ensureToken() {
  if (!this.token || Date.now() >= this.tokenExpireAt) {
    this.token = await _assertClassBrand(_QQBotEvent_brand, this, _getToken).call(this);
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'Access token obtained');
  }
}
async function _getGatewayUrl() {
  var _response$data2;
  await _assertClassBrand(_QQBotEvent_brand, this, _ensureToken).call(this);
  const response = await axios({
    url: `${this.baseUrl}/gateway`,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `QQBot ${this.token}`
    },
    httpsAgent: this.httpsAgent
  });
  const url = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.url;
  if (!url) throw new Error(`Get gateway failed: ${JSON.stringify(response.data)}`);
  return url;
}
function _connect(url) {
  this.ws = new WebSocket(url);
  this.ws.on('open', () => {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', 'WebSocket connected');
  });
  this.ws.on('message', data => {
    try {
      const payload = JSON.parse(data.toString());
      _assertClassBrand(_QQBotEvent_brand, this, _handlePayload).call(this, payload);
    } catch {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `Failed to parse message: ${data.toString().slice(0, 200)}`);
    }
  });
  this.ws.on('close', (code, reason) => {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `WebSocket closed: code=${code}, reason=${reason.toString()}`);
    _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
    _assertClassBrand(_QQBotEvent_brand, this, _tryReconnect).call(this);
  });
  this.ws.on('error', err => {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `WebSocket error: ${err.message}`);
  });
}
function _handlePayload(payload) {
  const {
    op,
    d,
    s,
    t,
    id
  } = payload;
  const opName = OPCODES[op] || `Unknown(${op})`;
  if (s !== null) {
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
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'debug', `OpCode ${opName}: ${JSON.stringify(d)}`);
  }
}
function _handleHello(d) {
  this.heartbeatMs = (d === null || d === void 0 ? void 0 : d.heartbeat_interval) || 45000;
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Hello received, heartbeat interval: ${this.heartbeatMs}ms`);
  if (this.sessionId && this.lastSeq !== null) {
    _assertClassBrand(_QQBotEvent_brand, this, _resume).call(this);
  } else {
    _assertClassBrand(_QQBotEvent_brand, this, _identify).call(this);
  }
  _assertClassBrand(_QQBotEvent_brand, this, _startHeartbeat).call(this);
}
function _handleDispatch(t, d, id) {
  const time = new Date().toISOString();
  if (t === 'READY') {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', '===== READY =====');
    this.sessionId = d === null || d === void 0 ? void 0 : d.session_id;
    console.log(JSON.stringify({
      time,
      type: t,
      data: d
    }, null, 2));
    return;
  }
  if (t === 'RESUMED') {
    _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', '===== RESUMED =====');
    console.log(JSON.stringify({
      time,
      type: t,
      data: d
    }, null, 2));
    return;
  }
  console.log(JSON.stringify({
    time,
    type: t,
    eventId: id,
    data: d
  }, null, 2));
}
function _identify() {
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  const payload = {
    op: 2,
    d: {
      token: `QQBot ${this.token}`,
      intents: this.intents,
      shard: this.shard,
      properties: {
        $os: process.platform,
        $browser: 'all-pusher-api',
        $device: 'all-pusher-api'
      }
    }
  };
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Identifying with intents=${this.intents}, shard=[${this.shard}]`);
  this.ws.send(JSON.stringify(payload));
}
function _resume() {
  var _this$lastSeq;
  if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
  const payload = {
    op: 6,
    d: {
      token: `QQBot ${this.token}`,
      session_id: this.sessionId,
      seq: (_this$lastSeq = this.lastSeq) !== null && _this$lastSeq !== void 0 ? _this$lastSeq : 0
    }
  };
  _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'info', `Resuming session=${this.sessionId}, seq=${this.lastSeq}`);
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
  _assertClassBrand(_QQBotEvent_brand, this, _clearHeartbeat).call(this);
  this.heartbeatInterval = setInterval(() => {
    _assertClassBrand(_QQBotEvent_brand, this, _sendHeartbeat).call(this);
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
  if (this.ws) {
    this.ws.close(1000);
  }
  setTimeout(async () => {
    try {
      const wssUrl = await _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
      _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
    } catch (err) {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `Reconnect failed: ${err.message}`);
    }
  }, 1000);
}
function _tryReconnect() {
  setTimeout(async () => {
    try {
      if (this.ws) return;
      const wssUrl = await _assertClassBrand(_QQBotEvent_brand, this, _getGatewayUrl).call(this);
      _assertClassBrand(_QQBotEvent_brand, this, _connect).call(this, wssUrl);
    } catch (err) {
      _assertClassBrand(_QQBotEvent_brand, this, _log).call(this, 'error', `Reconnect failed: ${err.message}`);
    }
  }, 3000);
}
function _log(level, msg) {
  console.error(`[QQBotEvent][${level.toUpperCase()}] ${msg}`);
}
exports.INTENTS_MAP = INTENTS_MAP;
exports.QQBotEvent = QQBotEvent;
