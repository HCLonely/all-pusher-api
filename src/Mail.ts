/* global sendOptions, result, TransportOptions, MailConfig */
import * as nodemailer from 'nodemailer';
import showdown from 'showdown';
interface mailOptions {
  from: string,
  to?: string
}
class Mail {
  protected _SERVER: TransportOptions;
  options?: mailOptions;

  constructor({ key, options, proxy }: MailConfig) {
    if (!key) {
      throw new Error('Missing Parameter: key');
    }
    this._SERVER = key;
    this.options = options;
    if (proxy && proxy.host && proxy.port) {
      this._SERVER.proxy = `${proxy.protocol || 'http'}://${proxy.host}:${proxy.port}`;
    }
  }

  async send(sendOptions: sendOptions): Promise<result> {
    if (!sendOptions.message && !sendOptions.customOptions) {
      return {
        status: 0,
        statusText: 'Missing Parameter: message',
        extraMessage: null
      };
    }
    let mailOptions: nodemailer.SendMailOptions;
    if (sendOptions.customOptions) {
      mailOptions = sendOptions.customOptions;
    } else {
      mailOptions = {
        ...this.options,
        subject: sendOptions.title || sendOptions.message.split('\n')[0].trim().slice(0, 10)
      };
      if (sendOptions.type === 'text') {
        mailOptions.text = sendOptions.message;
      }
      if (sendOptions.type === 'markdown') {
        // @ts-ignore
        mailOptions.html = new showdown().Converter().makeHtml(sendOptions.message);
      }
      if (sendOptions.type === 'html') {
        mailOptions.html = sendOptions.message;
      }
    }
    if (sendOptions.extraOptions) {
      mailOptions = {
        ...mailOptions,
        ...sendOptions.extraOptions
      };
    }
    const transporter = nodemailer.createTransport(this._SERVER);

    return transporter.sendMail(mailOptions).then((response) => ({
      status: 200,
      statusText: 'Success',
      extraMessage: response
    })).catch((error) => ({
      status: 102,
      statusText: 'Request Error',
      extraMessage: error
    }));
  }
  test(): Promise<result> {
    return this.send({ title: '测试标题', message: '测试内容', type: 'text' });
  }
}

export { Mail };
