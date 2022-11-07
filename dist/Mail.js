'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, '__esModule', {
  value: true
});

var nodemailer = require('nodemailer');

var showdown = require('showdown');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);

  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }

  n["default"] = e;
  return Object.freeze(n);
}

var nodemailer__namespace = /*#__PURE__*/_interopNamespace(nodemailer);

var showdown__default = /*#__PURE__*/_interopDefaultLegacy(showdown);

class Mail {
  constructor({
    key,
    options,
    proxy
  }) {
    _defineProperty(this, "_SERVER", void 0);

    _defineProperty(this, "options", void 0);

    if (!key) {
      throw new Error('Missing Parameter: key');
    }

    this._SERVER = key;
    this.options = options;

    if (proxy && proxy.enable && proxy.host && proxy.port) {
      this._SERVER.proxy = `${proxy.protocol || 'http'}://${proxy.host}:${proxy.port}`;
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

    let mailOptions;

    if (sendOptions.customOptions) {
      mailOptions = sendOptions.customOptions;
    } else {
      mailOptions = { ...this.options,
        subject: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };

      if (sendOptions.type === 'text') {
        mailOptions.text = sendOptions.message;
      }

      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        mailOptions.html = new showdown__default["default"]().Converter().makeHtml(sendOptions.message);
      }

      if (sendOptions.type === 'html') {
        mailOptions.html = sendOptions.message;
      }
    }

    if (sendOptions.extraOptions) {
      mailOptions = { ...mailOptions,
        ...sendOptions.extraOptions
      };
    }

    const transporter = nodemailer__namespace.createTransport(this._SERVER);
    return transporter.sendMail(mailOptions).then(response => ({
      status: 200,
      statusText: 'Success',
      extraMessage: response
    })).catch(error => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }

}

exports.Mail = Mail;
