'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var axios = require('axios');
var tool = require('./tool');
class Qmsg {
  constructor({
    token,
    bot,
    type,
    qq,
    group,
    pqq,
    pgroup,
    key,
    proxy
  }) {
    _defineProperty(this, "_KEY", void 0);
    _defineProperty(this, "baseURL", {
      qq: 'https://qmsg.zendee.cn:443/send/',
      group: 'https://qmsg.zendee.cn:443/group/',
      pqq: 'https://qmsg.zendee.cn:443/psend/',
      pgroup: 'https://qmsg.zendee.cn:443/pgroup/'
    });
    _defineProperty(this, "httpsAgent", void 0);
    _defineProperty(this, "type", 'qq');
    _defineProperty(this, "to", void 0);
    _defineProperty(this, "use", void 0);
    const $key = {
      token,
      bot,
      type,
      qq,
      group,
      pqq,
      pgroup,
      ...key
    };
    if (!$key.token) {
      throw new Error('Missing Parameter: token');
    }
    this._KEY = $key.token;
    if ($key.type) {
      this.type = $key.type;
    }
    if ($key.bot) {
      this.use = $key.bot;
    }
    if ($key.qq) {
      this.type = 'qq';
      this.to = $key.qq;
    }
    if ($key.group) {
      this.type = 'group';
      this.to = $key.group;
    }
    if ($key.pqq) {
      this.type = 'pqq';
      this.to = $key.pqq;
    }
    if ($key.pgroup) {
      this.type = 'pgroup';
      this.to = $key.pgroup;
    }
    if (proxy && proxy.enable) {
      this.httpsAgent = tool.proxy2httpsAgent(proxy);
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
    let qmsgOptions = {
      msg: ''
    };
    if (this.to) {
      qmsgOptions.qq = this.to;
    }
    if (this.use) {
      qmsgOptions.bot = this.use;
    }
    if (sendOptions.customOptions) {
      qmsgOptions = sendOptions.customOptions;
    } else {
      qmsgOptions = {
        msg: sendOptions.message
      };
    }
    if (sendOptions.extraOptions) {
      qmsgOptions = {
        ...qmsgOptions,
        ...sendOptions.extraOptions
      };
    }
    const axiosOptions = {
      url: `${this.baseURL[this.type]}${this._KEY}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: tool.queryStringify(qmsgOptions)
    };
    if (this.httpsAgent) {
      axiosOptions.httpsAgent = this.httpsAgent;
    }
    return axios(axiosOptions).then(response => {
      if (response.data) {
        if (response.data.success) {
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
exports.Qmsg = Qmsg;
