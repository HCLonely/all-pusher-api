'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, '__esModule', {
  value: true
});

var axios = require('axios');

var tool = require('./tool');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

class GoCqhttp {
  constructor({
    baseUrl,
    token,
    user_id,
    group_id,
    guild_id,
    channel_id,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);

    _defineProperty(this, "_BASE_URL", void 0);

    _defineProperty(this, "httpsAgent", void 0);

    _defineProperty(this, "user_id", void 0);

    _defineProperty(this, "group_id", void 0);

    _defineProperty(this, "guild_id", void 0);

    _defineProperty(this, "channel_id", void 0);

    if (!baseUrl && !(key !== null && key !== void 0 && key.baseUrl)) {
      throw new Error('Missing Parameter: baseUrl');
    } // @ts-ignore


    this._BASE_URL = baseUrl || key.baseUrl;

    if (token || key !== null && key !== void 0 && key.token) {
      // @ts-ignore
      this._KEY = token || key.token;
    }

    if (user_id || key !== null && key !== void 0 && key.user_id) {
      // @ts-ignore
      this.user_id = user_id || key.user_id;
    }

    if (group_id || key !== null && key !== void 0 && key.group_id) {
      // @ts-ignore
      this.group_id = group_id || key.group_id;
    }

    if (guild_id || key !== null && key !== void 0 && key.guild_id) {
      // @ts-ignore
      this.group_id = guild_id || key.guild_id;
    }

    if (channel_id || key !== null && key !== void 0 && key.channel_id) {
      // @ts-ignore
      this.channel_id = channel_id || key.channel_id;
    }

    if (proxy) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy, new URL(this._BASE_URL).protocol.replace(':', ''));
    }
  }

  async send(sendOptions) {
    if (!sendOptions.message && !sendOptions.customOptions) {
      return {
        status: 0,
        statusText: 'Missing Parameter: message',
        extraMessage: null
      };
    }

    let goCqhttpOptions;

    if (sendOptions.customOptions) {
      goCqhttpOptions = sendOptions.customOptions;
    } else {
      goCqhttpOptions = {
        message: sendOptions.message
      };

      if (this.user_id) {
        goCqhttpOptions.user_id = this.user_id;
      }

      if (this.group_id) {
        goCqhttpOptions.group_id = this.group_id;
      }

      if (this.guild_id) {
        goCqhttpOptions.guild_id = this.guild_id;
      }

      if (this.channel_id) {
        goCqhttpOptions.channel_id = this.channel_id;
      }
    }

    if (sendOptions.extraOptions) {
      goCqhttpOptions = { ...goCqhttpOptions,
        ...sendOptions.extraOptions
      };
    }

    if (goCqhttpOptions.guild_id && !goCqhttpOptions.channel_id || goCqhttpOptions.channel_id && !goCqhttpOptions.guild_id) {
      return {
        status: 103,
        statusText: 'Options Format Error: Both "channel_id" & "guild_id" must exist',
        extraMessage: goCqhttpOptions
      };
    }

    if ([goCqhttpOptions.user_id, goCqhttpOptions.group_id, goCqhttpOptions.channel_id].filter(e => e).length > 1) {
      return {
        status: 103,
        statusText: 'Options Format Error: "user_id", "group_id", and "channel_id" cannot exist at the same time',
        extraMessage: goCqhttpOptions
      };
    }

    const axiosOptions = {
      url: `${this._BASE_URL}${goCqhttpOptions.channel_id ? '/send_guild_channel_msg' : '/send_msg'}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this._KEY}`
      },
      data: goCqhttpOptions
    };

    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.retcode === 0) {
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
    }).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }

}

exports.GoCqhttp = GoCqhttp;
