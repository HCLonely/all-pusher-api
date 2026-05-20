import axios from 'axios';
import WebSocket from 'ws';
import { proxy2httpsAgent, proxy } from './tool';

interface QQBotEventConfig {
  appId: string
  appSecret: string
  intents?: number
  shard?: [number, number]
  proxy?: proxy
  baseUrl?: string
}

const INTENTS_MAP: Record<string, number> = {
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

const OPCODES: Record<number, string> = {
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

class QQBotEvent {
  private appId: string;
  private appSecret: string;
  private intents: number;
  private shard: [number, number];
  private baseUrl: string;
  private httpsAgent?: any;

  private token?: string;
  private tokenExpireAt = 0;
  private ws?: WebSocket;
  private sessionId?: string;
  private lastSeq: number | null = null;
  // eslint-disable-next-line no-undef
  private heartbeatInterval?: NodeJS.Timeout;
  private heartbeatMs = 45000;

  constructor(config: QQBotEventConfig) {
    if (!config.appId) throw new Error('Missing Parameter: appId');
    if (!config.appSecret) throw new Error('Missing Parameter: appSecret');

    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.intents = config.intents ?? 0;
    this.shard = config.shard ?? [0, 1];
    this.baseUrl = config.baseUrl || 'https://api.sgroup.qq.com';

    if (config.proxy?.enable) {
      this.httpsAgent = proxy2httpsAgent(config.proxy);
    }
  }

  async start(): Promise<void> {
    await this.#ensureToken();
    const wssUrl = await this.#getGatewayUrl();
    this.#log('info', `Gateway URL: ${wssUrl}`);
    this.#connect(wssUrl);
  }

  stop(): void {
    this.#log('info', 'Stopping...');
    this.#clearHeartbeat();
    if (this.ws) {
      this.ws.close(1000);
      this.ws = undefined;
    }
  }

  async #getToken(): Promise<string> {
    const response = await axios({
      url: 'https://bots.qq.com/app/getAppAccessToken',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      data: { appId: this.appId, clientSecret: this.appSecret },
      httpsAgent: this.httpsAgent
    });
    const accessToken = response.data?.access_token;
    if (!accessToken) throw new Error(`Get token failed: ${JSON.stringify(response.data)}`);
    const expiresIn = Number(response.data.expires_in) || 7200;
    this.tokenExpireAt = Date.now() + (Math.max(expiresIn - 60, 1) * 1000);
    return accessToken;
  }

  async #ensureToken(): Promise<void> {
    if (!this.token || Date.now() >= this.tokenExpireAt) {
      this.token = await this.#getToken();
      this.#log('info', 'Access token obtained');
    }
  }

  async #getGatewayUrl(): Promise<string> {
    await this.#ensureToken();
    const response = await axios({
      url: `${this.baseUrl}/gateway`,
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `QQBot ${this.token}`
      },
      httpsAgent: this.httpsAgent
    });
    const url = response.data?.url;
    if (!url) throw new Error(`Get gateway failed: ${JSON.stringify(response.data)}`);
    return url;
  }

  #connect(url: string): void {
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      this.#log('info', 'WebSocket connected');
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      try {
        const payload = JSON.parse(data.toString());
        this.#handlePayload(payload);
      } catch {
        this.#log('error', `Failed to parse message: ${data.toString().slice(0, 200)}`);
      }
    });

    this.ws.on('close', (code: number, reason: Buffer) => {
      this.#log('info', `WebSocket closed: code=${code}, reason=${reason.toString()}`);
      this.#clearHeartbeat();
      this.#tryReconnect();
    });

    this.ws.on('error', (err: Error) => {
      this.#log('error', `WebSocket error: ${err.message}`);
    });
  }

  #handlePayload(payload: any): void {
    const { op, d, s, t, id } = payload;
    const opName = OPCODES[op] || `Unknown(${op})`;

    if (s !== null) {
      this.lastSeq = s;
    }

    switch (op) {
    case 10: // Hello
      this.#handleHello(d);
      break;
    case 11: // HeartbeatACK
      this.#log('debug', 'Heartbeat ACK');
      break;
    case 0: // Dispatch
      this.#handleDispatch(t, d, id);
      break;
    case 7: // Reconnect
      this.#log('warn', 'Server requested reconnect');
      this.#reconnect();
      break;
    case 9: // InvalidSession
      this.#log('warn', 'Invalid session, re-identifying...');
      this.sessionId = undefined;
      this.#identify();
      break;
    default:
      this.#log('debug', `OpCode ${opName}: ${JSON.stringify(d)}`);
    }
  }

  #handleHello(d: any): void {
    this.heartbeatMs = d?.heartbeat_interval || 45000;
    this.#log('info', `Hello received, heartbeat interval: ${this.heartbeatMs}ms`);

    if (this.sessionId && this.lastSeq !== null) {
      this.#resume();
    } else {
      this.#identify();
    }

    this.#startHeartbeat();
  }

  #handleDispatch(t: string, d: any, id: string): void {
    const time = new Date().toISOString();
    if (t === 'READY') {
      this.#log('info', '===== READY =====');
      this.sessionId = d?.session_id;
      console.log(JSON.stringify({ time, type: t, data: d }, null, 2));
      return;
    }
    if (t === 'RESUMED') {
      this.#log('info', '===== RESUMED =====');
      console.log(JSON.stringify({ time, type: t, data: d }, null, 2));
      return;
    }
    console.log(JSON.stringify({ time, type: t, eventId: id, data: d }, null, 2));
  }

  #identify(): void {
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
    this.#log('info', `Identifying with intents=${this.intents}, shard=[${this.shard}]`);
    this.ws.send(JSON.stringify(payload));
  }

  #resume(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const payload = {
      op: 6,
      d: {
        token: `QQBot ${this.token}`,
        session_id: this.sessionId,
        seq: this.lastSeq ?? 0
      }
    };
    this.#log('info', `Resuming session=${this.sessionId}, seq=${this.lastSeq}`);
    this.ws.send(JSON.stringify(payload));
  }

  #sendHeartbeat(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({
      op: 1,
      d: this.lastSeq ?? null
    }));
  }

  #startHeartbeat(): void {
    this.#clearHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      this.#sendHeartbeat();
    }, this.heartbeatMs);
  }

  #clearHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  #reconnect(): void {
    this.#clearHeartbeat();
    if (this.ws) {
      this.ws.close(1000);
    }
    setTimeout(async () => {
      try {
        const wssUrl = await this.#getGatewayUrl();
        this.#connect(wssUrl);
      } catch (err: any) {
        this.#log('error', `Reconnect failed: ${err.message}`);
      }
    }, 1000);
  }

  #tryReconnect(): void {
    setTimeout(async () => {
      try {
        if (this.ws) return;
        const wssUrl = await this.#getGatewayUrl();
        this.#connect(wssUrl);
      } catch (err: any) {
        this.#log('error', `Reconnect failed: ${err.message}`);
      }
    }, 3000);
  }

  #log(level: string, msg: string): void {
    console.error(`[QQBotEvent][${level.toUpperCase()}] ${msg}`);
  }

  static parseIntents(keys: string[]): number {
    return keys.reduce((acc, key) => {
      const bit = INTENTS_MAP[key];
      if (!bit) {
        console.error(`Warning: unknown intent "${key}", skipped`);
        return acc;
      }
      return acc | bit;
    }, 0);
  }

  static listIntents(): void {
    console.log('Available intents:');
    Object.entries(INTENTS_MAP).forEach(([name, bit]) => {
      console.log(`  ${name} (1 << ${Math.log2(bit)})`);
    });
  }
}

export { QQBotEvent, INTENTS_MAP };
