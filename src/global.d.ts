/* eslint-disable no-unused-vars */
import { type } from 'os';
import { Embed, Ark, Config } from 'qq-guild-bot';
declare global {
  interface objectData {
    [name: string]: any
  }

  interface ServerChanTurboConfig {
    token?: string
    key?: {
      token: string
    }
    proxy?: proxy
  }
  interface ServerChanTurboOptions {
    title?: string
    desp?: string
    [name: string]: any
  }

  interface PushDeerConfig {
    token?: string
    key?: {
      token: string
    }
    proxy?: proxy
  }
  interface PushDeerOptions {
    text?: string
    pushkey?: string
    desp?: string
    type?: string
    [name: string]: any
  }

  interface TelegramBotConfig {
    key?: {
      token: string
      chat_id: string
    }
    token?: string
    chat_id?: string
    proxy?: proxy
  }
  interface TelegramBotOptions {
    chat_id?: string
    text?: string
    parse_mode?: string
    [name: string]: any
  }

  interface DingTalkConfig {
    token?: string
    key?: {
      token: string
      secret?: string
    },
    proxy?: proxy
  }
  interface DingTalkOptions {
    msgtype?: string
    content?: string
    title?: string
    messageUrl?: string
    text?: any
    markdown?: any
    [name: string]: any
  }

  interface WxPusherConfig {
    key?: {
      token: string,
      uids?: Array<string>,
      topicIds?: Array<number>,
    }
    token?: string,
    uids?: Array<string>,
    topicIds?: Array<number>,
    proxy?: proxy
  }
  interface WxPusherOptions {
    appToken: string
    content: string
    summary?: string
    contentType: number
    topicIds?: Array<number>
    uids?: Array<string>
    url?: string
    [name: string]: any
  }

  interface FeiShuConfig {
    token?: string
    key?: {
      token: string
      secret?: string
    }
    proxy?: proxy
  }
  interface FeiShuOptions {
    msg_type?: string
    content?: any
    title?: string
    messageUrl?: string
    [name: string]: any
  }

  interface WorkWeixinConfig {
    key?: {
      corpid: string
      secret: string
      agentid: number
      touser?: string
    }
    corpid?: string
    secret?: string
    agentid?: number
    touser?: string
    proxy?: proxy
  }
  interface WorkWeixinOptions {
    touser?: string
    toparty?: string
    totag?: string
    msgtype: string
    agentid: number
    text?: any
    markdown?: any
    safe?: number
    enable_id_trans?: number
    enable_duplicate_check?: number
    duplicate_check_interval?: number
    [name: string]: any
  }

  interface PushPlusConfig {
    token?: string
    key?: {
      token: string
    }
    proxy?: proxy
  }
  interface PushPlusOptions {
    title?: string
    content: string
    topic?: string
    template?: string
    [name: string]: any
  }

  interface ShowdocConfig {
    token?: string
    key?: {
      token: string
    }
    proxy?: proxy
  }
  interface ShowdocOptions {
    title: string
    content: string
    [name: string]: any
  }

  interface XizhiConfig {
    key?: {
      token: string
    }
    token?: string
    proxy?: proxy
  }
  interface XizhiOptions {
    title: string
    content: string
    [name: string]: any
  }

  interface DiscordConfig {
    webhook?: string
    key?: {
      webhook: string
    }
    proxy?: proxy
  }
  interface DiscordOptions {
    content?: string
    embeds?: Array<any>
    [name: string]: any
  }

  interface TransportOptions {
    host: string,
    port: number,
    secure?: boolean,
    auth: {
      user: string,
      pass: string
    }
    proxy?: string
  }
  interface MailConfig {
    key: TransportOptions,
    options?: {
      from: string,
      to?: string
    }
    proxy?: proxy
  }

  interface QqChannelConfig {
    key: Config,
    channelID: string
  }

  /*
  type configs = DingTalkConfig & DiscordConfig & FeiShuConfig & MailConfig & PushDeerConfig & PushPlusConfig &
    ServerChanTurboConfig & QqChannelConfig & ShowdocConfig & TelegramBotConfig & WorkWeixinConfig & WxPusherConfig & XizhiConfig
  interface PushApiConfig {
    name: string
    config: configs
  }
  */

  interface sendOptions {
    message: string
    title?: string
    type?: string
    to?: string
    customOptions?: any
    extraOptions?: any
  }
  interface result {
    status: number
    statusText: string
    extraMessage: any
  }
  interface proxy {
    host: string
    port: number
    protocol?: string
    username?: string
    password?: string
  }
}

export { };
