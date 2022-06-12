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

    if (!token && !(key !== null && key !== void 0 && key.token)) {
      throw new Error('Missing Parameter: token');
    } // @ts-ignore


    this._KEY = token || key.token;

    if (type || key !== null && key !== void 0 && key.type) {
      // @ts-ignore
      this.type = type || key.type;
    }

    if (bot || key !== null && key !== void 0 && key.bot) {
      // @ts-ignore
      this.use = bot || key.bot;
    }

    if (qq || key !== null && key !== void 0 && key.qq) {
      this.type = 'qq'; // @ts-ignore

      this.to = qq || key.qq;
    }

    if (group || key !== null && key !== void 0 && key.group) {
      this.type = 'group'; // @ts-ignore

      this.to = group || key.group;
    }

    if (pqq || key !== null && key !== void 0 && key.pqq) {
      this.type = 'pqq'; // @ts-ignore

      this.to = pqq || key.pqq;
    }

    if (pgroup || key !== null && key !== void 0 && key.pgroup) {
      this.type = 'pgroup'; // @ts-ignore

      this.to = pgroup || key.pgroup;
    }

    if (proxy) {
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
      qmsgOptions = { ...qmsgOptions,
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

    return axios__default["default"](axiosOptions).then(response => {
      if (response.data) {
        if (response.data.status === 'ok') {
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
