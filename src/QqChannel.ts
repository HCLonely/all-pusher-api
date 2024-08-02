import { createOpenAPI, createWebsocket, Config, MessageToCreate } from './bot-node-sdk/src';
import { result, sendOptions } from './tool';

interface QqChannelConfig {
  key: Config,
  channelID: string
}

class QqChannel {
  protected _CONFIG: Config;
  channelID?: string;

  constructor({ channelID, key }: QqChannelConfig) {
    const $key = {
      channelID,
      ...key
    };
    if (!key) {
      throw new Error('Missing Parameter: key');
    }
    if (!$key.channelID) {
      throw new Error('Missing Parameter: channelID');
    }
    this._CONFIG = key;
    this.channelID = $key.channelID;
  }

  async send(sendOptions: sendOptions): Promise<result> {
    if (!sendOptions.message && !sendOptions.customOptions) {
      return {
        status: 0,
        statusText: 'Missing Parameter: message',
        extraMessage: null
      };
    }
    let qqChannelOptions: MessageToCreate;
    if (sendOptions.customOptions) {
      qqChannelOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        qqChannelOptions = {
          content: sendOptions.message
        };
      } else {
        return {
          status: 103,
          statusText: 'Options Format Error',
          extraMessage: sendOptions
        };
      }
    }
    if (!this.channelID) {
      return {
        status: 0,
        statusText: 'Missing Parameter: channelID',
        extraMessage: null
      };
    }
    if (sendOptions.extraOptions) {
      qqChannelOptions = {
        ...qqChannelOptions,
        ...sendOptions.extraOptions
      };
    }

    const client = createOpenAPI(this._CONFIG);
    const ws = await this.#sign().then((ws) => ws).catch((error) => ({
      status: 140,
      statusText: 'Check Sign Failed',
      extraMessage: error
    }));
    if (ws.status === 140) {
      return ws;
    }
    // console.log(ws.session.ws.ws.close());

    return client.messageApi.postMessage(this.channelID, qqChannelOptions).then((response: any) => {
      ws.disconnect();
      if (response.data) {
        // @ts-ignore
        if (!response.data.code) {
          return {
            status: 200,
            statusText: 'Success',
            extraMessage: response
          };
        }
        // @ts-ignore
        if (response.data.code === 304023) {
          return {
            status: 201,
            statusText: 'Waiting',
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
    }).catch((error: any) => {
      ws.disconnect();
      if (error.code === 304023) {
        return {
          status: 201,
          statusText: 'Waiting',
          extraMessage: error
        };
      }
      return {
        status: 102,
        statusText: 'Request Error',
        extraMessage: error
      };
    });
  }
  async #sign(): Promise<any> {
    return new Promise((resolve, reject) => {
      const ws = createWebsocket({
        ...this._CONFIG,
        maxRetry: 3
      });
      ws.on('READY', () => {
        resolve(ws);
      });
      ws.on('ERROR', (data) => {
        reject(data);
      });
    });
  }
}

export { QqChannel };
