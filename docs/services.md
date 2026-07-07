# 推送服务

本页按服务分别说明配置。所有服务都可以通过 `PushApi` 的 `name + config` 使用，也可以直接从 `all-pusher-api/dist/<ClassName>` 引入对应类。

除特殊说明外：

- 认证信息推荐放入 `config.key`。
- `message` 与 `customOptions` 至少提供一个。
- `extraOptions` 会合并进默认请求体。
- `customOptions` 会直接作为该平台请求体。
- 支持 `proxy` 的服务都使用 [统一代理配置](./guide/api.md#代理)。

## Bark

类名：`Bark`

官方 API 文档：[Bark](https://github.com/Finb/Bark)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Bark device key。 |
| `key.baseURL` | 否 | 自建服务端地址，默认为 `https://api.day.app/push`。 |

```js
const { Bark } = require('all-pusher-api/dist/Bark');

await new Bark({
  key: {
    token: '******',
    baseURL: 'https://api.day.app/push'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`，也可通过 `customOptions` 发送 Bark 支持的完整请求体。

默认请求体会生成 `{ title, body, device_key }`。`title` 未提供时取正文首行前 10 个字符。

## Chanify

类名：`Chanify`

官方 API 文档：[Chanify](https://github.com/chanify/chanify-ios)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Chanify token。 |
| `key.baseURL` | 否 | 自建服务端地址，默认为 `https://api.chanify.net/v1/sender/`。 |

```js
const { Chanify } = require('all-pusher-api/dist/Chanify');

await new Chanify({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`，也可通过 `customOptions` 发送平台自定义字段。

默认请求体会生成 `{ title, text }`，并以表单格式发送到 `baseURL + token`。

## DingTalk

类名：`DingTalk`

官方 API 文档：[钉钉群机器人](https://developers.dingtalk.com/document/app/custom-robot-access)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | 钉钉群机器人 `access_token`。 |
| `key.secret` | 否 | 开启加签时填写加签密钥。 |

```js
const { DingTalk } = require('all-pusher-api/dist/DingTalk');

await new DingTalk({
  key: {
    token: '******',
    secret: '******'
  }
}).send({
  message: '### 发布完成',
  type: 'markdown',
  extraOptions: {
    at: {
      isAtAll: true
    }
  }
});
```

支持类型：`text`、`markdown`、`other`。`other` 通过 `customOptions` 发送。

## Discord

类名：`Discord`

官方 API 文档：[Discord Webhook](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.webhook` | 是 | Discord Webhook URL。 |

```js
const { Discord } = require('all-pusher-api/dist/Discord');

await new Discord({
  key: {
    webhook: 'https://discord.com/api/webhooks/******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认请求体为 `{ content }`，如果传入 `title` 会拼接到正文前。

## FeiShu

类名：`FeiShu`

官方 API 文档：[飞书群机器人](https://www.feishu.cn/hc/zh-CN/articles/360024984973)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | 飞书群机器人 hook token。 |
| `key.secret` | 否 | 开启签名校验时填写密钥。 |

```js
const { FeiShu } = require('all-pusher-api/dist/FeiShu');

await new FeiShu({
  key: {
    token: '******',
    secret: '******'
  }
}).send({
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认请求体为飞书文本消息：`{ msg_type: 'text', content: { text } }`。

## GoCqhttp

类名：`GoCqhttp`

官方 API 文档：[QQ go-cqhttp](https://github.com/Mrs4s/go-cqhttp)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.baseUrl` | 是 | go-cqhttp HTTP API 地址，需包含 `http://` 或 `https://`。 |
| `key.token` | 否 | go-cqhttp access token。 |
| `key.user_id` | 否 | 目标 QQ 号，与 `group_id`、`channel_id` 三选一。 |
| `key.group_id` | 否 | 目标群号，与 `user_id`、`channel_id` 三选一。 |
| `key.channel_id` | 否 | 目标频道 ID，需与 `guild_id` 同时存在。 |
| `key.guild_id` | 否 | 目标子频道 ID，需与 `channel_id` 同时存在。 |

```js
const { GoCqhttp } = require('all-pusher-api/dist/GoCqhttp');

await new GoCqhttp({
  key: {
    baseUrl: 'http://127.0.0.1:5700',
    token: '******',
    user_id: 10000
  }
}).send({
  message: '测试文本'
});
```

支持类型：`text`、`other`。频道消息会发送到 `/send_guild_channel_msg`，其他消息发送到 `/send_msg`。

## GoogleChat

类名：`GoogleChat`

官方 API 文档：[Google Chat Webhook](https://developers.google.com/chat/how-tos/webhooks)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.webhook` | 是 | Google Chat Webhook URL。 |

```js
const { GoogleChat } = require('all-pusher-api/dist/GoogleChat');

await new GoogleChat({
  key: {
    webhook: 'https://chat.googleapis.com/v1/spaces/******'
  }
}).send({
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认请求体为 `{ text: message }`。

## IGot

类名：`IGot`

官方 API 文档：[iGot](http://hellyw.com/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | iGot 推送 key。 |

```js
const { IGot } = require('all-pusher-api/dist/IGot');

await new IGot({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认请求体包含标题和内容。

## Iyuu

类名：`Iyuu`

官方 API 文档：[爱语飞飞](https://iyuu.cn/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | IYUU 令牌。 |

```js
const { Iyuu } = require('all-pusher-api/dist/Iyuu');

await new Iyuu({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`。默认使用标题和正文发送。

## Mail

类名：`Mail`

官方 API 文档：[Nodemailer](https://nodemailer.com/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.host` | 是 | SMTP 服务器地址。 |
| `key.port` | 是 | SMTP 服务器端口。 |
| `key.secure` | 否 | 是否启用 TLS/SSL。 |
| `key.auth.user` | 是 | SMTP 用户名。 |
| `key.auth.pass` | 是 | SMTP 密码。 |
| `options.from` | 是 | 发件人邮箱。 |
| `options.to` | 否 | 收件人邮箱，也可通过 `extraOptions.to` 覆盖。 |

```js
const { Mail } = require('all-pusher-api/dist/Mail');

await new Mail({
  key: {
    host: 'smtp.example.com',
    port: 465,
    secure: true,
    auth: {
      user: 'sender@example.com',
      pass: 'password'
    }
  },
  options: {
    from: 'sender@example.com',
    to: 'receiver@example.com'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`markdown`、`html`。`markdown` 会转换为 HTML 发送。

## Ntfy

类名：`Ntfy`

官方 API 文档：[Ntfy Publish](https://docs.ntfy.sh/publish/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | ntfy topic。 |
| `key.baseURL` | 否 | 自建服务端地址，默认使用 ntfy 官方服务。 |

```js
const { Ntfy } = require('all-pusher-api/dist/Ntfy');

await new Ntfy({
  key: {
    token: 'mytopic',
    baseURL: 'https://ntfy.sh/'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认以正文作为消息内容，标题可通过 `title` 传入。

## Push

类名：`Push`

官方 API 文档：[Push](https://docs.push.techulus.com/api-documentation)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Push API key。 |
| `key.baseURL` | 否 | 自定义接口地址。 |

```js
const { Push } = require('all-pusher-api/dist/Push');

await new Push({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`other`。

## Pushback

类名：`Pushback`

官方 API 文档：[Pushback](https://pushback.io/docs/getting-started)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | `at_token`。 |
| `key.userId` | 是 | Pushback `User_id`。 |

```js
const { Pushback } = require('all-pusher-api/dist/Pushback');

await new Pushback({
  key: {
    token: 'at_******',
    userId: 'User_******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`。默认把 `title` 和 `message` 组合为 Pushback 请求。

## PushBullet

类名：`PushBullet`

官方 API 文档：[PushBullet](https://www.pushbullet.com/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | PushBullet access token。 |

```js
const { PushBullet } = require('all-pusher-api/dist/PushBullet');

await new PushBullet({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认发送 note 类型消息。

## PushDeer

类名：`PushDeer`

官方 API 文档：[PushDeer](https://www.pushdeer.com/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | PushDeer pushkey。 |
| `key.baseURL` | 否 | 自建服务端地址。 |

```js
const { PushDeer } = require('all-pusher-api/dist/PushDeer');

await new PushDeer({
  key: {
    token: '******'
  }
}).send({
  message: '### 测试文本',
  type: 'markdown'
});
```

支持类型：`text`、`markdown`、`other`。默认请求体包含 `pushkey`、`text`、`desp`、`type`。

## PushMe

类名：`PushMe`

官方 API 文档：[PushMe](https://push.i-i.me/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | PushMe push_key。 |
| `key.baseURL` | 否 | 自建服务端地址。 |

```js
const { PushMe } = require('all-pusher-api/dist/PushMe');

await new PushMe({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`markdown`、`html`。

## Pushover

类名：`Pushover`

官方 API 文档：[Pushover](https://pushover.net/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Pushover API token。 |
| `key.user` | 是 | Pushover user key。 |

```js
const { Pushover } = require('all-pusher-api/dist/Pushover');

await new Pushover({
  key: {
    token: '******',
    user: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`。传入 `markdown` 时会启用 Pushover 的 monospace/HTML 相关字段，复杂内容建议使用 `customOptions`。

## PushPlus

类名：`PushPlus`

官方 API 文档：[PushPlus](https://www.pushplus.plus/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | PushPlus token。 |

```js
const { PushPlus } = require('all-pusher-api/dist/PushPlus');

await new PushPlus({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '<h1>测试文本</h1>',
  type: 'html'
});
```

支持类型：`text`、`markdown`、`html`。默认请求体包含 `token`、`title`、`content`、`template`。

## QQBot

类名：`QQBot`

官方 API 文档：[QQ 官方机器人](https://bot.q.qq.com/wiki/develop/api-v2/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.appId` | 是 | QQ 官方机器人 AppID。 |
| `key.appSecret` | 是 | QQ 官方机器人 AppSecret。 |
| `key.userId` | 否 | 单聊目标用户 openid。 |
| `key.groupId` | 否 | 群聊目标群 openid。 |
| `key.channelId` | 否 | 频道子频道 ID。 |
| `key.baseUrl` | 否 | QQ Bot API 地址，通常无需修改。 |

```js
const { QQBot } = require('all-pusher-api/dist/QQBot');

await new QQBot({
  key: {
    appId: '******',
    appSecret: '******',
    userId: '******'
  }
}).send({
  message: '测试文本'
});
```

`userId`、`groupId`、`channelId` 至少提供一个，也可以在发送时通过 `extraOptions` 或 `customOptions` 指定。

支持类型：`text`、`markdown`、`other`。QQ 官方机器人主动推送能力受平台权限限制。

## RocketChat

类名：`RocketChat`

官方 API 文档：[RocketChat Incoming Webhook](https://docs.rocket.chat/guides/administration/admin-panel/integrations#incoming-webhook-script)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.webhook` | 是 | RocketChat Incoming Webhook URL。 |

```js
const { RocketChat } = require('all-pusher-api/dist/RocketChat');

await new RocketChat({
  key: {
    webhook: 'https://chat.example.com/hooks/******'
  }
}).send({
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认请求体为 `{ text: message }`。

## ServerChanTurbo

类名：`ServerChanTurbo`

别名：`ServerChan`

官方 API 文档：[Server 酱](https://sct.ftqq.com/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Server 酱 SendKey。 |

```js
const { ServerChanTurbo } = require('all-pusher-api/dist/ServerChanTurbo');

await new ServerChanTurbo({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`markdown`。默认请求体包含 `title` 和 `desp`。

## Showdoc

类名：`Showdoc`

官方 API 文档：[Showdoc Push](https://push.showdoc.com.cn/#/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Showdoc Push URL 中 `/server/api/push/` 后面的 token。 |

```js
const { Showdoc } = require('all-pusher-api/dist/Showdoc');

await new Showdoc({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`。默认请求体包含标题和内容。

## SimplePush

类名：`SimplePush`

官方 API 文档：[SimplePush](https://simplepush.io/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | SimplePush key。 |

```js
const { SimplePush } = require('all-pusher-api/dist/SimplePush');

await new SimplePush({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`。默认发送标题和正文。

## Slack

类名：`Slack`

官方 API 文档：[Slack Incoming Webhook](https://api.slack.com/messaging/webhooks)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.webhook` | 是 | Slack Incoming Webhook URL。 |

```js
const { Slack } = require('all-pusher-api/dist/Slack');

await new Slack({
  key: {
    webhook: 'https://hooks.slack.com/services/******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`other`。默认请求体为 `{ text }`，标题会拼接到正文前。

## TelegramBot

类名：`TelegramBot`

官方 API 文档：[Telegram Bot sendMessage](https://core.telegram.org/bots/api#sendmessage)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Telegram Bot token。 |
| `key.chat_id` | 是 | 目标 chat id。 |

```js
const { TelegramBot } = require('all-pusher-api/dist/TelegramBot');

await new TelegramBot({
  key: {
    token: '******',
    chat_id: '******'
  }
}).send({
  message: '<b>测试文本</b>',
  type: 'html'
});
```

支持类型：`text`、`markdown`、`html`。`markdown` 和 `html` 会映射为 Telegram `parse_mode`。

## WorkWeixin

类名：`WorkWeixin`

官方 API 文档：[企业微信](https://open.work.weixin.qq.com/api/doc/90000/90136/91770)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.corpid` | 是 | 企业 ID。 |
| `key.secret` | 是 | 企业应用 secret。 |
| `key.agentid` | 是 | 企业应用 agentid。 |
| `key.touser` | 否 | 接收成员，多个用 `|` 分隔，可使用 `@all`。 |

```js
const { WorkWeixin } = require('all-pusher-api/dist/WorkWeixin');

await new WorkWeixin({
  key: {
    corpid: '******',
    secret: '******',
    agentid: 1000002,
    touser: '@all'
  }
}).send({
  message: '测试文本'
});
```

支持类型：`text`、`markdown`、`other`。`touser` 也可在发送时通过 `extraOptions` 覆盖。

## WorkWeixinBot

类名：`WorkWeixinBot`

官方 API 文档：[企业微信群机器人](https://developer.work.weixin.qq.com/document/path/91770)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.webhook` | 是 | 企业微信群机器人 Webhook URL。 |

```js
const { WorkWeixinBot } = require('all-pusher-api/dist/WorkWeixinBot');

await new WorkWeixinBot({
  key: {
    webhook: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=******'
  }
}).send({
  message: '### 测试文本',
  type: 'markdown'
});
```

支持类型：`text`、`markdown`、`other`。

## WPush

类名：`WPush`

官方 API 文档：[WPush](https://wpush.cn/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | WPush API token。 |

```js
const { WPush } = require('all-pusher-api/dist/WPush');

await new WPush({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`markdown`。默认请求体包含 `apikey`、`title`、`content`。

## WxPusher

类名：`WxPusher`

官方 API 文档：[WxPusher](https://wxpusher.zjiecode.com/docs/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | WxPusher appToken。 |
| `key.uids` | 否 | 发送目标 UID 列表，也可发送时指定。 |
| `key.topicIds` | 否 | 发送目标 topicId 列表，也可发送时指定。 |

```js
const { WxPusher } = require('all-pusher-api/dist/WxPusher');

await new WxPusher({
  key: {
    token: '******',
    uids: ['UID_xxx']
  }
}).send({
  title: '标题',
  message: '# Markdown 内容',
  type: 'markdown'
});
```

支持类型：`text`、`markdown`、`html`。`markdown` 会转换为 HTML 后以 `contentType: 2` 发送。

## Xizhi

类名：`Xizhi`

官方 API 文档：[息知](https://xz.qqoq.net/#/index)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | 息知 key。 |

```js
const { Xizhi } = require('all-pusher-api/dist/Xizhi');

await new Xizhi({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`markdown`。默认请求体包含 `title` 和 `content`。

## YiFengChuanHua

类名：`YiFengChuanHua`

官方 API 文档：[一封传话](https://www.phprm.com/push/h5/)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | 一封传话通道 code。 |

```js
const { YiFengChuanHua } = require('all-pusher-api/dist/YiFengChuanHua');

await new YiFengChuanHua({
  key: {
    token: '******'
  }
}).send({
  title: '测试标题',
  message: '测试文本'
});
```

支持类型：`text`、`markdown`、`html`。默认请求体包含 `head` 和 `body`。

## Zulip

类名：`Zulip`

官方 API 文档：[Zulip send-message](https://zulip.com/api/send-message)

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `key.token` | 是 | Zulip bot API key。 |
| `key.email` | 是 | Zulip bot email。 |
| `key.site` | 否 | Zulip 站点地址，默认 `https://chat.zulip.org`。 |
| `key.to` | 否 | 发送对象。未配置时发送时必须提供。 |

```js
const { Zulip } = require('all-pusher-api/dist/Zulip');

await new Zulip({
  key: {
    site: 'https://your-zulip.example.com',
    token: '******',
    email: 'bot@example.com',
    to: ['user@example.com']
  }
}).send({
  message: '测试文本'
});
```

支持类型：`text`。默认 `type` 为 `direct`，可通过 `extraOptions.type` 改为 `stream` 等 Zulip 支持的类型。

## Custom

类名：`Custom`

`Custom` 不对应固定推送平台，用于把任意 HTTP 接口包装成推送服务。

官方 API 文档：自定义 HTTP 接口，无固定平台文档。

| 配置项 | 必填 | 说明 |
| --- | --- | --- |
| `url` | 是 | 请求地址。 |
| `method` | 否 | 请求方法，默认 `POST`。 |
| `contentType` | 否 | 请求内容类型，默认 `application/json`。 |
| `headers` | 否 | 自定义请求头。 |
| `success.key` | 是 | 判断成功的响应字段路径，例如 `responseData.errcode`。 |
| `success.value` | 是 | 判断成功的字段值。 |

```js
const { Custom } = require('all-pusher-api/dist/Custom');

await new Custom({
  url: 'https://example.com/push',
  success: {
    key: 'responseData.code',
    value: 0
  }
}).send({
  text: '测试文本'
});
```

`Custom.send()` 不使用统一 `sendOptions`，入参会直接作为请求体或查询参数发送。
